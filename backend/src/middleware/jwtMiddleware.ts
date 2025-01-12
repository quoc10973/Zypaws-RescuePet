import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/entities/user/user.service";
require('dotenv').config();

const contextPath = '/zypaws/api';
const PUBLIC_ROUTES = [
    `${contextPath}/authenticate/login`,
    `${contextPath}/authenticate/register`,
];

@Injectable()
export class JwtMiddleware implements NestMiddleware {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async use(req: any, res: any, next: () => void) {

        const authHeader = req.headers.authorization;
        const currentPath = req.originalUrl // Get the current path req.path is from express 

        // If the current path is a public route, skip the middleware
        if (PUBLIC_ROUTES.includes(currentPath)) {
            next();
            return;
        }

        // If the Authorization header is not present, throw an error, otherwise, verify the token
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
                let user = await this.userService.findUserByEmail(payload.email);

                if (!user) {
                    throw new UnauthorizedException("Unauthorized");
                }

                // Attach the user to the request object
                req.current = payload;

                next();

            } catch (error) {
                console.error("JWT verification failed:", error);
                if (error.message.includes("expired")) {
                    throw new UnauthorizedException("Token expired");
                }
                if (error.message.includes("malformed") || error.message.includes("invalid")) {
                    throw new UnauthorizedException("Invalid token");
                }
            }
        }
        else {
            throw new UnauthorizedException("Unauthorized");
        }
    }
}