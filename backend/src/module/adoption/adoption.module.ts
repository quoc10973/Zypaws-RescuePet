import { Module } from '@nestjs/common';
import { AdoptionController } from './adoption.controller';
import { AdoptionService } from './adoption.service';
import { PetModule } from '../pet/pet.module';
import { Adoption } from './adoption.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Adoption]),
    PetModule,
    UserModule
  ],
  controllers: [AdoptionController],
  providers: [AdoptionService]
})
export class AdoptionModule { }
