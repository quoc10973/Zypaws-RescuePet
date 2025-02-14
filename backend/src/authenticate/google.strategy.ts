import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthenticateService } from "./authenticate.service";
import { UserService } from "src/module/user/user.service";
import { Role } from "src/model/enum";
import { User } from "src/module/user/user.entity";
import { ConfigService } from '@nestjs/config';
require('dotenv').config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly authenticateService: AuthenticateService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || 'http://localhost:8080/zypaws/api/authenticate/google-callback',
            scope: ['openid', 'profile', 'email'],
            passReqToCallback: true,
        });
    }


    // _ is the refresh token which we don't need, so we ignore it by using _
    async validate(req: any, accessToken: string, _: string, profile: any): Promise<any> {
        if (!profile) {
            throw new BadRequestException("Google profile is undefined");
        }

        const email = profile.emails?.[0]?.value;
        const firstName = profile.name?.givenName || profile.displayName?.split(" ")[0] || "Unknown";
        const lastName = profile.name?.familyName || profile.displayName?.split(" ").slice(1).join(" ") || "";
        const avatar = profile.photos?.[0]?.value || "";

        if (!email) {
            throw new BadRequestException("Google did not return an email");
        }

        let user: User | null = null;

        user = await this.userService.getUserByEmail(email);

        // Nếu không tìm thấy user, tạo mới
        if (!user) {
            try {
                user = new User();
                user.email = email;
                user.firstName = firstName;
                user.lastName = lastName;
                user.password = 'loginWithGoogle';
                user.avatar = avatar;
                user.role = Role.USER;

                user = await this.userService.createUser(user);
            } catch (error) {
                console.error("Error creating user:", error.message);
                throw new BadRequestException("Failed to create user");
            }
        }

        const userPayload = {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };

        const token = await this.authenticateService.generateToken(userPayload);
        return { user, accessToken: token };
    }



}