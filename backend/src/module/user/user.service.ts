import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/model/userDTO';
import { PetService } from '../pet/pet.service';
import { AddPetFavoriteDTO } from 'src/model/addPetFavoriteDTO';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly petService: PetService) { }

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
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async addPetFavorite(currentUser: User, addPetFavoriteDTO: AddPetFavoriteDTO) {
        try {
            const pet = await this.petService.getPetById(addPetFavoriteDTO.petId);
            const user = await this.findUserByEmail(currentUser.email);
            if (!user.pets) {
                user.pets = []; // initialize the pets array if user has no pets yet
            }
            user.pets.push(pet);
            await this.userRepository.save(user);
            return {
                message: `Pet ${pet.name} added to favorites`,
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
