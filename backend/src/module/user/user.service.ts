import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/model/userDTO';
import { PetService } from '../pet/pet.service';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly petService: PetService) { }

    async createUser(user: User) {
        try {
            const newUser = await this.userRepository.save(user);
            return newUser;
        } catch (error) {
            throw new Error(error.message);
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

    async addPetFavorite(currentUser: User, petId: number) {
        try {
            const pet = await this.petService.getPetById(petId);
            const user = await this.userRepository.findOne(
                {
                    where: { email: currentUser.email },
                    relations: ['pets'] // eager load the pets array
                }
            );
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

    async getFavorites(currentUser: User) {
        try {
            const user = await this.userRepository.findOne(
                {
                    where: { email: currentUser.email },
                    relations: ['pets'] // eager load the pets array
                }
            );
            if (!user.pets) {
                return [];
            }
            return user.pets;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async removePetFavorite(currentUser: User, petId: number) {
        try {
            const pet = await this.petService.getPetById(petId);
            const user = await this.userRepository.findOne(
                {
                    where: { email: currentUser.email },
                    relations: ['pets'] // eager load the pets array
                }
            )
            if (!user.pets) {
                throw new Error("User has no pets to remove");
            }
            const petIndex = user.pets.findIndex(p => p.id === pet.id);
            if (petIndex !== -1) {
                user.pets.splice(petIndex, 1);
            }
            await this.userRepository.save(user);
            return {
                message: `Pet ${pet.name} removed from favorites`,
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email: email },
            relations: ['pets', 'adoptions'] // eager load the pets array
        });
        if (!user) {
            return null;
        }
        return user;
    }
}
