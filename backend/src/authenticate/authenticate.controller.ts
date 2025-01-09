import { BadRequestException, Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { LoginRequest } from 'src/model/loginRequest';
import { RegisterRequest } from 'src/model/registerRequest';

@Controller('authenticate')
export class AuthenticateController {
    constructor(private readonly authenticateService: AuthenticateService) { }

    @Post('login')
    async login(@Body() loginRequest: LoginRequest) {
        try {
            return await this.authenticateService.login(loginRequest);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('register')
    async register(@Body(new ValidationPipe()) registerRequest: RegisterRequest) {
        try {
            return await this.authenticateService.register(registerRequest);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
