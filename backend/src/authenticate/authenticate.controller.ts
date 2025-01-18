import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { LoginRequest } from 'src/model/loginRequest';
import { RegisterRequest } from 'src/model/registerRequest';
import { AuthGuard } from '@nestjs/passport';

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

    @Get('login-google')
    @UseGuards(AuthGuard('google'))
    async googleLogin(): Promise<void> {
        // Redirect to Google login
    }

    @Get('google-callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginRedirect(@Req() req): Promise<any> {
        // Return user information and accessToken from Google
        const { user, accessToken } = req.user;

        return {
            message: 'User information from Google',
            user,
            accessToken,
        };
    }
}
