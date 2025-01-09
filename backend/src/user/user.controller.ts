import { BadRequestException, Body, Controller, Get, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('getall')
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
}
