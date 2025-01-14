import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CurrentUser } from 'src/decorator/customDecorator';
import { User } from '../user/user.entity';
import { CreateDonationDTO } from 'src/model/createDonationDTO';
import { ApiBearerAuth } from '@nestjs/swagger';

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
}
