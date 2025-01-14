import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Gender, PetStatus, Species } from "src/model/enum";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Adoption } from "../adoption/adoption.entity";

@Entity()
export class Pet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Name is required' })
    @ApiProperty()
    name: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: Species
    })
    @IsNotEmpty({ message: 'Species is required' })
    @ApiProperty()
    species: Species;

    @Column()
    @IsOptional()
    @ApiProperty()
    age: number;

    @Column()
    @IsNumber({}, { message: 'Weight must be a number' })
    @ApiProperty()
    weight: number;

    @Column({
        nullable: false,
        type: 'enum',
        enum: Gender
    })
    @ApiProperty()
    gender: Gender;

    @Column({ nullable: true })
    @ApiProperty()
    image: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: PetStatus
    })
    @ApiProperty()
    status: PetStatus;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Adoption, adoption => adoption.pet)
    adoptions: Adoption[]

}