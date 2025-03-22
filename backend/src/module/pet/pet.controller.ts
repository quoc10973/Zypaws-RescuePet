import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, SetMetadata, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';
import { AuthorizationGuard } from 'src/guard/authorization.guard';

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
    @SetMetadata('roles', ['ADMIN'])
    @UseGuards(AuthorizationGuard)
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

    @Delete('delete/:id')
    @SetMetadata('roles', ['ADMIN'])
    @UseGuards(AuthorizationGuard)
    @HttpCode(204)
    async deletePet(@Param('id') id: number) {
        try {
            await this.petService.deletePet(Number(id));
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put('update/:id')
    @SetMetadata('roles', ['ADMIN'])
    @UseGuards(AuthorizationGuard)
    async updateUser(@Param('id') id: number, @Body(new ValidationPipe()) pet: Partial<Pet>) {
        try {
            return await this.petService.updatePet(id, pet);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
