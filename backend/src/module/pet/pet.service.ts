import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { Repository } from 'typeorm';
import { PetStatus } from 'src/model/enum';

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

    async getAvailablePets() {
        try {
            const pets = await this.petRepository.find({
                where: { status: PetStatus.AVAILABLE },
                take: 10,
            });
            return pets;
        } catch (error) {
            console.log(error.message);
            throw new Error("Failed to get available pets");
        }
    }

    async getAllAvailablePets() {
        try {
            const pets = await this.petRepository.find({
                where: { status: PetStatus.AVAILABLE },
            });
            return pets;
        } catch (error) {
            console.log(error.message);
            throw new Error("Failed to get available pets");
        }
    }

    async deletePet(id: number) {
        try {
            const pet = await this.getPetById(id);
            await this.petRepository.remove(pet);
        } catch (error) {
            throw new Error("Failed to delete pet");
        }
    }

    async updatePet(id: number, partialPet: Partial<Pet>) {
        try {
            await this.petRepository.update(id, partialPet);
            return await this.getPetById(id);
        } catch (error) {
            throw new Error("Failed to update pet");
        }
    }
}
