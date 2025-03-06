import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './donation.entity';
import { Repository } from 'typeorm';
import { PaypalService } from '../paypal/paypal.service';
import axios from 'axios';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { CreateDonationDTO } from 'src/model/createDonationDTO';

@Injectable()
export class DonationService {
    private FRONTEND_URL: string;
    constructor(
        @InjectRepository(Donation) private readonly donationRepository: Repository<Donation>,
        private readonly paypalService: PaypalService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
        this.FRONTEND_URL = this.configService.get('FRONTEND_URL');
    }

    async createDonation(user: User, createDonationDTO: CreateDonationDTO) {
        const accessPaypalToken = await this.paypalService.getPayPalAccessToken();
        try {
            const response = await axios.post(
                `${process.env.PAYPAL_API}/v2/checkout/orders`,
                {
                    intent: 'CAPTURE',
                    application_context: {
                        return_url: `${this.FRONTEND_URL}/donation/success`,
                        cancel_url: `${this.FRONTEND_URL}/donation/cancel`,
                    },
                    purchase_units: [
                        {
                            amount: {
                                currency_code: 'USD',
                                value: createDonationDTO.amount.toString(),
                            },
                            custom_id: createDonationDTO.message, // Save message to custom_id
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessPaypalToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            )
            return {
                orderId: response.data.id,
                approvalLink: response.data.links.find(link => link.rel === 'approve').href,
            }
        } catch (error) {
            console.log(error.message);
            throw new HttpException(
                error.response?.message || 'Failed to create donation on PayPal',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async captureDonation(orderId: string) {
        const accessPaypalToken = await this.paypalService.getPayPalAccessToken();

        try {
            // get order details
            const orderDetails = await axios.get(
                `${process.env.PAYPAL_API}/v2/checkout/orders/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessPaypalToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // If order has already been captured, throw an error
            if (orderDetails.data.status === 'COMPLETED') {
                throw new HttpException('Order has already been captured.', HttpStatus.BAD_REQUEST);
            }

            // Start capturing the order
            const response = await axios.post(
                `${process.env.PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessPaypalToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            const captureDetails = response.data?.status;
            if (captureDetails !== 'COMPLETED') {
                throw new HttpException(
                    `Transaction not completed. Status: ${captureDetails || 'Unknown'}`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // Check if the transaction has already been recorded in the database
            const transactionId = response.data.purchase_units[0].payments.captures[0].id;

            const existingDonation = await this.donationRepository.findOne({
                where: { transactionId }, // by transactionId
            });

            if (existingDonation) {
                throw new HttpException('Donation has already been recorded.', HttpStatus.BAD_REQUEST);
            }

            const donation = new Donation();
            const donatorEmail = response.data.payment_source.paypal.email_address;
            donation.transactionId = transactionId;  // Save transactionId for checking duplicate
            donation.donator = donatorEmail;
            donation.amount = response.data.purchase_units[0].payments.captures[0].amount.value;
            donation.message = response.data.purchase_units[0]?.payments?.captures[0]?.custom_id || 'No message';
            await this.donationRepository.save(donation);

            return donation;
        } catch (error) {
            console.error('Error capturing order:', error.response?.data || error.message);
            throw new HttpException('Failed to capture donation', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async cancelDonation(orderId: string) {
        try {
            return { message: 'Donation canceled' };
        } catch (error) {
            console.error('Error canceling donation:', error.message);
            throw new HttpException('Failed to cancel donation', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
