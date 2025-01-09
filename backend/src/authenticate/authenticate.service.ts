import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from 'src/model/loginRequest';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/user/user.entity';
import { UserResponse } from 'src/model/userResponse';
import { RegisterRequest } from 'src/model/registerRequest';
import { Role } from 'src/model/enum';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/model/userDTO';

@Injectable()
export class AuthenticateService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(loginRequest: LoginRequest) {
        try {
            const user = await this.userService.findUserByEmail(loginRequest.email);
            const isMatch = bcryptjs.compareSync(loginRequest.password, user.password);
            if (!isMatch) {
                throw new Error("Invalid email or password");
            }
            const payload = {
                userId: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
            const accessToken = await this.generateToken(payload);
            let userResponse = new UserResponse();
            userResponse.id = user.id;
            userResponse.email = user.email;
            userResponse.firstName = user.firstName;
            userResponse.lastName = user.lastName;
            userResponse.role = user.role;
            userResponse.accessToken = accessToken;
            return userResponse;
        } catch (error) {
            throw new Error("Invalid email or password");
        }
    }

    async register(user: RegisterRequest) {
        try {
            const userExist = await this.userService.findUserByEmail(user.email);
            if (userExist) {
                throw new Error(`This user ${user.email} already exists`);
            }
            if (!userExist) {
                const salt = bcryptjs.genSaltSync(10);
                const hashedPassword = bcryptjs.hashSync(user.password, salt);
                const newUser = new User();
                newUser.email = user.email;
                newUser.firstName = user.firstName;
                newUser.lastName = user.lastName;
                newUser.password = hashedPassword;
                newUser.phone = user.phone;
                newUser.age = user.age;
                newUser.address = user.address;
                newUser.role = Role.USER;
                const savedUser = await this.userService.createUser(newUser);
                return plainToInstance(UserDTO, savedUser, { excludeExtraneousValues: true });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async generateToken(user: any) {
        const payload = {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        };
        return this.jwtService.sign(payload);
    }
}
