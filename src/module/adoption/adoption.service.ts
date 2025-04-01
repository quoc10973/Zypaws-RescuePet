import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adoption } from './adoption.entity';
import { Repository } from 'typeorm';
import { PetService } from '../pet/pet.service';
import { AdoptionStatus, PetStatus } from 'src/model/enum';
import { CreateAdoptionDTO } from 'src/model/createAdoptionDTO';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateAdoptionStatusDTO } from 'src/model/updateStatusAdoptionDTO';

@Injectable()
export class AdoptionService {
    constructor(
        @InjectRepository(Adoption) private readonly adoptionRepository: Repository<Adoption>,
        private readonly petService: PetService,
        private readonly userService: UserService,
    ) { }

    async createAdoption(user: User, createAdoptionDTO: CreateAdoptionDTO) {
        try {

            const pet = await this.petService.getPetById(createAdoptionDTO.petId);
            const adopter = await this.userService.findUserByEmail(user.email);

            //Check if user already submitted an adoption request for this pet
            const existingAdoption = await this.adoptionRepository.findOne({
                where: {
                    pet: { id: pet.id }, // only check id for foreign key
                    user: { id: adopter.id }, // only check id for foreign key
                },
            });

            if (existingAdoption) {
                throw new Error("You have already submitted an adoption request for this pet.");
            }

            const newAdoption = new Adoption();
            newAdoption.pet = pet;
            newAdoption.user = adopter;
            newAdoption.name = createAdoptionDTO.name;
            newAdoption.email = createAdoptionDTO.email;
            newAdoption.phoneNumber = createAdoptionDTO.phone;
            newAdoption.message = createAdoptionDTO.message;
            newAdoption.enquireForSomeoneElse = createAdoptionDTO.enquireForSomeoneElse;
            newAdoption.emailUpdates = createAdoptionDTO.emailUpdates;
            newAdoption.status = AdoptionStatus.PENDING;
            newAdoption.replyMessage = "";
            await this.adoptionRepository.save(newAdoption);
            return plainToInstance(Adoption, newAdoption, { excludeExtraneousValues: true })
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

    async getAllPendingAdoptions() {
        try {
            const pendingAdoptions = await this.adoptionRepository.find(
                {
                    where: { status: AdoptionStatus.PENDING },
                    relations: ['pet', 'user'],
                    select: {
                        user: { id: true, email: true },
                        pet: { id: true, name: true, species: true, status: true },
                    }
                }
            );
            return pendingAdoptions;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllApprovedAdoptions() {
        try {
            const pendingAdoptions = await this.adoptionRepository.find(
                {
                    where: { status: AdoptionStatus.APPROVED },
                    relations: ['pet', 'user'],
                    select: {
                        user: { id: true, email: true },
                        pet: { id: true, name: true, species: true, status: true },
                    }
                }
            );
            return pendingAdoptions;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllRejectedAdoptions() {
        try {
            const pendingAdoptions = await this.adoptionRepository.find(
                {
                    where: { status: AdoptionStatus.REJECTED },
                    relations: ['pet', 'user'],
                    select: {
                        user: { id: true, email: true },
                        pet: { id: true, name: true, species: true, status: true },
                    }
                }
            );
            return pendingAdoptions;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAdoptionByUserId(currentUser: User) {
        try {
            const user = await this.userService.getUserByEmail(currentUser.email);
            const adoptions = await this.adoptionRepository.find(
                {
                    where: { user: { id: user.id } },
                    relations: ['pet'],
                    select: {
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

    async aprroveAdoption(adoptionId: number, updateStatusMessage: UpdateAdoptionStatusDTO) {
        try {
            const adoption = await this.adoptionRepository.findOne(
                {
                    where: { id: adoptionId },
                    relations: ['pet', 'user'],
                }
            );
            if (!adoption) {
                throw new Error("Adoption request not found");
            }
            adoption.status = AdoptionStatus.APPROVED;
            adoption.replyMessage = updateStatusMessage.replyMessage;
            const pet = await this.petService.getPetById(adoption.pet.id);
            pet.status = PetStatus.ADOPTED;
            await this.petService.updatePet(pet.id, pet);
            await this.adoptionRepository.save(adoption);
            return plainToInstance(Adoption, adoption, { excludeExtraneousValues: true });
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async rejectAdoption(adoptionId: number, updateStatusMessage: UpdateAdoptionStatusDTO) {
        try {
            const adoption = await this.adoptionRepository.findOne(
                {
                    where: { id: adoptionId },
                    relations: ['pet', 'user'],
                }
            );
            if (!adoption) {
                throw new Error("Adoption request not found");
            }
            adoption.status = AdoptionStatus.REJECTED;
            adoption.replyMessage = updateStatusMessage.replyMessage;
            await this.adoptionRepository.save(adoption);
            return plainToInstance(Adoption, adoption, { excludeExtraneousValues: true });
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

}
