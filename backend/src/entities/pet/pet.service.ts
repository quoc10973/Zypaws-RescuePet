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
            console.log(error.message);
            throw new Error("Failed to create pet");
        }
    }

    async getAllPets() {
        try {
            const pets = await this.petRepository.find();
            return pets;
        } catch (error) {
            console.log(error.message);
            throw new Error("Failed to get pets");
        }
    }

    async getPetById(id: number) {
        const pet = await this.petRepository.findOne({ where: { id: id } });
        if (!pet) {
            throw new Error("Pet not found");
        }
        return pet;
    }
}
