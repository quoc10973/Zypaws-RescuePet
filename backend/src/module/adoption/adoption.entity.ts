import { AdoptionStatus } from "src/model/enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Pet } from "../pet/pet.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Adoption {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({
        nullable: false,
        type: 'enum',
        enum: AdoptionStatus
    })
    status: AdoptionStatus;

    @Expose()
    @Column({
        nullable: false,
    })
    name: string;

    @Expose()
    @Column({
        nullable: true,
        type: 'text'
    })
    message: string;

    @Expose()
    @Column({
        nullable: false,
    })
    @IsPhoneNumber('VN')
    phoneNumber: string;

    @Expose()
    @Column({
        nullable: false,
    })

    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @Column()
    emailUpdates: boolean;

    @Expose()
    @Column()
    enquireForSomeoneElse: boolean;

    @ManyToOne(() => User, user => user.adoptions)
    @ApiProperty()
    @Exclude()
    user: User;

    @ManyToOne(() => Pet, pet => pet.adoptions)
    @ApiProperty()
    @Exclude()
    pet: Pet;

}