import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './donation.entity';
import { Repository } from 'typeorm';
import { PaypalService } from '../paypal/paypal.service';
import axios from 'axios';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { application } from 'express';

@Injectable()
export class DonationService {

    constructor(
        @InjectRepository(Donation) private readonly donationRepository: Repository<Donation>,
        private readonly paypalService: PaypalService,
        private readonly userService: UserService,
    ) { }

    async createDonation(user: User, createDonationDTO) {
        const accessPaypalToken = await this.paypalService.getPayPalAccessToken();
        try {
            const response = await axios.post(
                `${process.env.PAYPAL_API}/v2/checkout/orders`,
                {
                    intent: 'CAPTURE',
                    application_context: {
                        return_url: 'http://localhost:8080/zypaws/api/donation/success',
                        cancel_url: 'http://localhost:8080/zypaws/api/donation/cancel',
                    },
                    purchase_units: [
                        {
                            amount: {
                                currency_code: 'USD',
                                value: createDonationDTO.amount.toString(),
                            },
                            description: createDonationDTO.message,
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
            const response = await axios.post(
                `${process.env.PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
                {}, // Empty body
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
                    `Transaction not completed. Status: ${captureDetails?.status || 'Unknown'}`,
                    HttpStatus.BAD_REQUEST,
                );
            }


            // Save donation to database
            const donation = new Donation();
            const donatorEmail = response.data.payment_source.paypal.email_address;
            donation.donator = donatorEmail;
            donation.amount = response.data.purchase_units[0].payments.captures[0].amount.value;
            donation.message = response.data.purchase_units[0].reference_id;
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
