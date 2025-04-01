import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, Length } from "class-validator";
import { Role } from "src/model/enum";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Adoption } from "../adoption/adoption.entity";
import { Pet } from "../pet/pet.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    @IsEmail({}, { message: 'Invalid email' })
    @ApiProperty()
    email: string;

    @Column({ nullable: false })
    @Length(6, 25, { message: 'Password must be at least 6 characters and 20 characters' })
    @ApiProperty()
    password: string;

    @Column()
    @ApiProperty()
    firstName: string;

    @Column()
    @ApiProperty()
    lastName: string;

    @Column({ nullable: true })
    @IsPhoneNumber('VN')
    @ApiProperty()
    phone: string;

    @Column({ nullable: true })
    @IsOptional()
    @ApiProperty()
    age: number

    @Column({ nullable: true })
    @IsOptional()
    @ApiProperty()
    address: string

    @Column({ nullable: true }) // nullable: true means that this field can be null
    @ApiProperty()
    avatar: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: Role,
    })
    @ApiProperty()
    role: Role

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Adoption, adoption => adoption.user)
    adoptions: Adoption[]

    @ManyToMany(() => Pet, pet => pet.user)
    @JoinTable({ name: 'favorite' })
    pets: Pet[]

}