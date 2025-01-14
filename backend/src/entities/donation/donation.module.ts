import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './donation.entity';
import { PaypalModule } from '../paypal/paypal.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Donation]),
    PaypalModule,
    UserModule,
  ],
  controllers: [DonationController],
  providers: [DonationService]
})
export class DonationModule { }
