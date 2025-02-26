import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';

@Controller('pet')
@ApiBearerAuth()
export class PetController {
    constructor(private readonly petService: PetService) { }

    @Get('getall')
    async getAllPets() {
        try {
            return await this.petService.getAllPets();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('getavailable')
    async getAvailablePets() {
        try {
            return await this.petService.getAvailablePets();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('create')
    @HttpCode(201)
    async createPet(@Body(new ValidationPipe()) pet: Pet) {
        try {
            return await this.petService.createPet(pet);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':id')
    async getPetById(@Param('id') id: number) {
        try {
            return await this.petService.getPetById(Number(id)); // Chuyển đổi thành số
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
