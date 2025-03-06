import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CurrentUser } from 'src/decorator/customDecorator';
import { User } from '../user/user.entity';
import { CreateDonationDTO } from 'src/model/createDonationDTO';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TokenDTO } from 'src/model/tokenDTO';

@Controller('donation')
@ApiBearerAuth()
export class DonationController {
    constructor(private readonly donationService: DonationService) { }

    @Post('create')
    async createDonation(@CurrentUser() user: User, @Body() createDonationDTO: CreateDonationDTO) {
        try {
            return this.donationService.createDonation(user, createDonationDTO);
        } catch (error) {
            console.log(error.message);
            throw new BadRequestException(error.message);
        }
    }

    @Post('success')
    async handleSuccess(@Body() tokenDTO: TokenDTO) {

        // Check if tokenDTO is empty
        if (!tokenDTO) {
            throw new HttpException('Missing PayPal token', HttpStatus.BAD_REQUEST);
        }

        try {
            const result = await this.donationService.captureDonation(tokenDTO.token);
            return {
                message: 'Donation successful',
                transaction: result,
            };
        } catch (error) {
            console.error('Error in success endpoint:', error.message);
            throw new HttpException('Failed to process success callback', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('cancel')
    async handleCancel(@Query('token') token: string) {
        try {
            await this.donationService.cancelDonation(token);
            return {
                message: 'Donation cancelled',
            };
        } catch (error) {
            console.error('Error in cancel endpoint:', error.message);
            throw new HttpException('Failed to process cancel callback', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
