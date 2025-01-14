import { BadRequestException, Body, Controller, Get, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiProperty } from '@nestjs/swagger';
import { AdoptionService } from './adoption.service';
import { CurrentUser } from 'src/decorator/customDecorator';
import { User } from '../user/user.entity';
import { CreateAdoptionDTO } from 'src/model/createAdoptionDTO';

@Controller('adoption')
@ApiBearerAuth()
export class AdoptionController {
    constructor(private readonly adoptionService: AdoptionService) { }

    @Get('getall')
    async getAllAdoptions() {
        try {
            return await this.adoptionService.getAllAdoptions();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('create')
    @HttpCode(201)
    async createAdoption(@CurrentUser() user: User, @Body() createAdoptionDTO: CreateAdoptionDTO) {
        try {
            return await this.adoptionService.createAdoption(user, createAdoptionDTO);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
