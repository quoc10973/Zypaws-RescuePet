import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/module/user/user.service";
import { parse } from 'url'; // Dùng để loại bỏ query params
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
    `${contextPath}/pet/:id`,
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

        // Hàm chuẩn hóa route để so sánh chính xác
        const isPublicRoute = PUBLIC_ROUTES.some(route => {
            const normalizedRoute = route
                .replace(/:\w+/g, '[^/]+') // Thay thế route params (:id, :slug) bằng regex
                .replace(/\//g, '\\/'); // Chuyển dấu '/' thành '\\/' để tạo regex
            const regex = new RegExp(`^${normalizedRoute}$`);
            return regex.test(currentPath);
        });

        // Bỏ qua kiểm tra nếu route là public
        if (isPublicRoute) {
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

                req.current = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    accessToken: token
                };
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
