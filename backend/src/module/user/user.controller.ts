import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, SetMetadata, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator/customDecorator';
import { AuthorizationGuard } from 'src/guard/authorization.guard';

@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('getall')
    @SetMetadata('roles', ['ADMIN'])
    @UseGuards(AuthorizationGuard)
    async getUsers() {
        try {
            return await this.userService.getUsers();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('create')
    @HttpCode(201)
    async createUser(@Body(new ValidationPipe()) user: User) {
        try {
            const createdUser = await this.userService.createUser(user);
            return createdUser;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('getcurrent')
    async getCurrentUser(@CurrentUser() user: User) {
        try {
            return user;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('add-favorites/:petId') // use param decorator to get the petId from the request
    @HttpCode(201)
    async addFavorite(@CurrentUser() user: User, @Param('petId', ParseIntPipe) petId: number) {
        try {
            return await this.userService.addPetFavorite(user, petId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete('remove-favorites/:petId') // use param decorator to get the petId from the request
    @HttpCode(204)
    async removeFavorite(@CurrentUser() user: User, @Param('petId', ParseIntPipe) petId: number) {
        try {
            return await this.userService.removePetFavorite(user, petId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


    @Get('get-favorites')
    async getFavorites(@CurrentUser() user: User) {
        try {
            return await this.userService.getFavorites(user);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: string, @Body(new ValidationPipe()) user: Partial<User>) {
        try {
            return await this.userService.updateUser(id, user);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete('delete/:id')
    @SetMetadata('roles', ['ADMIN'])
    @UseGuards(AuthorizationGuard)
    async deleteUser(@Param('id') id: string) {
        try {
            return await this.userService.deleteUser(id);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
