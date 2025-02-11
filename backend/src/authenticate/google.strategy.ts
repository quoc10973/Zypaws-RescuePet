import { Injectable } from "@nestjs/common";
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
            clientID: process.env.GOOGLE_CLIENT_ID, // from Google Cloud Console
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // from Google Cloud Console
            callbackURL: 'http://localhost:8080/zypaws/api/authenticate/google-callback',
            scope: ['openid', 'profile', 'email'],
            passReqToCallback: true,
        });
    }

    // _ is the refresh token which we don't need, so we ignore it by using _
    async validate(accessToken: string, _: string, profile: any): Promise<any> {
        console.log("Google Profile:", profile);

        if (!profile) {
            throw new Error("Google profile is undefined");
        }

        const email = profile.emails?.[0]?.value;
        const firstName = profile.name?.givenName || profile.displayName?.split(" ")[0] || "Unknown";
        const lastName = profile.name?.familyName || profile.displayName?.split(" ").slice(1).join(" ") || "";
        const avatar = profile.photos?.[0]?.value || "";

        if (!email) {
            throw new Error("Google did not return an email");
        }

        let user = await this.userService.findUserByEmail(email);

        if (!user) {
            user = new User();
            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;
            user.password = 'loginWithGoogle';
            user.avatar = avatar;
            user.role = Role.USER;

            user = await this.userService.createUser(user);
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