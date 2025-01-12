import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetService {
    constructor(@InjectRepository(Pet) private readonly petRepository: Repository<Pet>) { }

    async createPet(pet: Pet) {
        try {
            const newPet = await this.petRepository.save(pet);
            return newPet;
        } catch (error) {
            throw new Error("Failed to create pet");
        }
    }

    async getAllPets() {
        try {
            const pets = await this.petRepository.find();
            return pets;
        } catch (error) {
            throw new Error("Failed to get pets");
        }
    }
}
