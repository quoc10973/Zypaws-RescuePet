import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './donation.entity';
import { Repository } from 'typeorm';
import { PaypalService } from '../paypal/paypal.service';
import axios from 'axios';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

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

            // Save donation in database
            const newDonation = new Donation();
            const donator = await this.userService.findUserByEmail(user.email);
            if (!donator) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            newDonation.user = donator;
            newDonation.amount = createDonationDTO.amount;
            newDonation.message = createDonationDTO.message;
            await this.donationRepository.save(newDonation);
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

}
