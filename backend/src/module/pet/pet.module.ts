import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  providers: [PetService],
  controllers: [PetController],
  exports: [PetService]
})
export class PetModule { }
