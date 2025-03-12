import { BadRequestException, Body, Controller, Get, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiProperty } from '@nestjs/swagger';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDTO } from 'src/model/createAdoptionDTO';
import { CurrentUser } from 'src/decorator/customDecorator';
import { User } from '../user/user.entity';

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
    //@CurrentUser() decorator is used to get the current user from the request
    async createAdoption(@CurrentUser() user: User, @Body(new ValidationPipe()) createAdoptionDTO: CreateAdoptionDTO) {
        try {
            return await this.adoptionService.createAdoption(user, createAdoptionDTO);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('get-user-adoptions')
    @HttpCode(200)
    async getAdoptionByUserId(@CurrentUser() currentUser: User) {
        try {
            return await this.adoptionService.getAdoptionByUserId(currentUser);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
