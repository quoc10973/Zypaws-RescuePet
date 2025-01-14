import { AdoptionStatus } from "src/model/enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Pet } from "../pet/pet.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Adoption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'enum',
        enum: AdoptionStatus
    })
    status: AdoptionStatus;

    @ManyToOne(() => User, user => user.adoptions)
    @ApiProperty()
    user: User;

    @ManyToOne(() => Pet, pet => pet.adoptions)
    @ApiProperty()
    pet: Pet;

}