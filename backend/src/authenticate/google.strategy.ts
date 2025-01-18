import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthenticateService } from "./authenticate.service";
import { UserService } from "src/module/user/user.service";
import { Role } from "src/model/enum";
import { User } from "src/module/user/user.entity";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly authenticateService: AuthenticateService,
        private readonly userService: UserService,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID, // from Google Cloud Console
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // from Google Cloud Console
            callbackURL: 'https://localhost:8080/zypaws/api/authenticate/google-callback',
            scope: ['email', 'profile'],
            passReqToCallback: true,
        });
    }

    // _ is the refresh token which we don't need, so we ignore it by using _
    async validate(accessToken: string, _: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile;

        // Kiểm tra người dùng đã tồn tại trong cơ sở dữ liệu chưa
        let user = await this.userService.findUserByEmail(emails[0].value);

        // Nếu người dùng chưa tồn tại, tạo mới người dùng
        if (!user) {
            user = new User();
            user.email = emails[0].value;
            user.firstName = name.givenName;
            user.lastName = name.familyName;
            user.password = 'loginWithGoogle'; // set a default password
            user.avatar = photos[0].value; // set the avatar from Google
            user.role = Role.USER; // default role is USER

            const savedUser = await this.userService.createUser(user);
            user = savedUser; // update user with the saved user
        }

        // Tạo payload để cấp accessToken
        const userPayload = {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };

        // Tạo accessToken
        const token = await this.authenticateService.generateToken(userPayload);

        // Trả về thông tin người dùng và accessToken
        done(null, {
            user,
            accessToken: token,
        });
    }
}