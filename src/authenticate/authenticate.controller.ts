import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { LoginRequest } from 'src/model/loginRequest';
import { RegisterRequest } from 'src/model/registerRequest';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
require('dotenv').config();

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
    async googleLoginRedirect(@Req() req, @Res() res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Google authentication failed' });
            }

            const { accessToken } = req.user;
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

            // Redirect to frontend with access token
            res.redirect(`${frontendUrl}/?accessToken=${accessToken}`);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
