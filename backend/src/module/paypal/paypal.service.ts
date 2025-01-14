import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
require('dotenv').config();

@Injectable()
export class PaypalService {
    private PAYPAL_CLIENT_ID: string;
    private PAYPAL_CLIENT_SECRET: string;
    private PAYPAL_API: string;

    // initialize the PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, and PAYPAL_API from the .env 
    constructor(private readonly configService: ConfigService) {
        this.PAYPAL_CLIENT_ID = this.configService.get('PAYPAL_CLIENT_ID');
        this.PAYPAL_CLIENT_SECRET = this.configService.get('PAYPAL_CLIENT_SECRET');
        this.PAYPAL_API = this.configService.get('PAYPAL_API');
    }

    // getAccessToken method to retrieve the PayPal access token
    async getPayPalAccessToken(): Promise<string> {
        const auth = Buffer.from(`${this.PAYPAL_CLIENT_ID}:${this.PAYPAL_CLIENT_SECRET}`).toString('base64');

        try {
            const response = await axios.post(`${this.PAYPAL_API}/v1/oauth2/token`, 'grant_type=client_credentials', {
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
            );
            return response.data.access_token;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(
                'Failed to retrieve PayPal access token',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
