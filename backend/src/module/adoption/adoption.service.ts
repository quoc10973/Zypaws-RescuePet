import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adoption } from './adoption.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { PetService } from '../pet/pet.service';
import { AdoptionStatus } from 'src/model/enum';
import { CreateAdoptionDTO } from 'src/model/createAdoptionDTO';
import { UserService } from '../user/user.service';

@Injectable()
export class AdoptionService {
    constructor(
        @InjectRepository(Adoption) private readonly adoptionRepository: Repository<Adoption>,
        private readonly petService: PetService,
        private readonly userService: UserService,
    ) { }

    async createAdoption(user: User, createAdoptionDTO: CreateAdoptionDTO) {
        try {
            const newAdoption = new Adoption();
            const pet = await this.petService.getPetById(createAdoptionDTO.petId);
            const adopter = await this.userService.findUserByEmail(user.email);
            newAdoption.pet = pet;
            newAdoption.user = adopter;
            newAdoption.status = AdoptionStatus.PENDING;
            await this.adoptionRepository.save(newAdoption);
            return newAdoption;
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async getAllAdoptions() {
        try {
            const adoptions = await this.adoptionRepository.find(
                {
                    relations: ['pet', 'user'],
                    select: {
                        user: { id: true, email: true },
                        pet: { id: true, name: true, species: true, status: true },
                    }
                }
            );
            return adoptions;
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
}
