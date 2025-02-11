import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/module/user/user.service";
import { parse } from 'url'; // Import thư viện parse URL
require('dotenv').config();

const contextPath = '/zypaws/api';
const PUBLIC_ROUTES = [
    `${contextPath}/authenticate/login`,
    `${contextPath}/authenticate/register`,
    `${contextPath}/authenticate/login-google`,
    `${contextPath}/authenticate/google-callback`,
    `${contextPath}/donation/success`,
    `${contextPath}/donation/cancel`,
    `${contextPath}/pet/getall`,
];

@Injectable()
export class JwtMiddleware implements NestMiddleware {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async use(req: any, res: any, next: () => void) {

        const authHeader = req.headers.authorization;
        const currentPath = parse(req.originalUrl).pathname; // Loại bỏ query params

        // Nếu đường dẫn hiện tại thuộc danh sách PUBLIC_ROUTES, bỏ qua kiểm tra JWT
        if (PUBLIC_ROUTES.includes(currentPath)) {
            return next();
        }

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
                let user = await this.userService.findUserByEmail(payload.email);

                if (!user) {
                    throw new UnauthorizedException("Unauthorized");
                }

                // Gán thông tin người dùng vào request object
                req.current = payload;
                return next();

            } catch (error) {
                console.error("JWT verification failed:", error);
                if (error.message.includes("expired")) {
                    throw new UnauthorizedException("Token expired");
                }
                if (error.message.includes("malformed") || error.message.includes("invalid")) {
                    throw new UnauthorizedException("Invalid token");
                }
            }
        } else {
            throw new UnauthorizedException("Unauthorized");
        }
    }
}
