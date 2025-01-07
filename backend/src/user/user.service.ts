import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/model/userDTO';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async createUser(user: User) {
        try {
            const newUser = await this.userRepository.save(user);
            return newUser;
        } catch (error) {
            throw new Error("The email is already in use, please try another one!");
        }
    }

    async getUsers() {
        try {
            const users = await this.userRepository.find();
            return users.map(user => plainToInstance(UserDTO, user, { excludeExtraneousValues: true }));
        } catch (error) {
            throw new Error("Failed to get users");
        }
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        return user;
    }
}
