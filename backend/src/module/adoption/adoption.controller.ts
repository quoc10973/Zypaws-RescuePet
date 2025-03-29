import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiProperty } from '@nestjs/swagger';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDTO } from 'src/model/createAdoptionDTO';
import { CurrentUser } from 'src/decorator/customDecorator';
import { User } from '../user/user.entity';
import { UpdateAdoptionStatusDTO } from 'src/model/updateStatusAdoptionDTO';

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

    @Get('get-pending')
    @HttpCode(200)
    async getAllPendingAdoptions() {
        try {
            return await this.adoptionService.getAllPendingAdoptions();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('get-approved')
    @HttpCode(200)
    async getAllApprovedAdoptions() {
        try {
            return await this.adoptionService.getAllApprovedAdoptions();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('get-rejected')
    @HttpCode(200)
    async getAllRejectedAdoptions() {
        try {
            return await this.adoptionService.getAllRejectedAdoptions();
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

    @Put('approve/:id')
    async approveAdoptionStatus(@Param('id') id: number, @Body(new ValidationPipe()) updateStatusMessage: UpdateAdoptionStatusDTO) {
        try {
            return await this.adoptionService.aprroveAdoption(id, updateStatusMessage);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put('reject/:id')
    async rejectAdoptionStatus(@Param('id') id: number, @Body(new ValidationPipe()) updateStatusMessage: UpdateAdoptionStatusDTO) {
        try {
            return await this.adoptionService.rejectAdoption(id, updateStatusMessage);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

}
