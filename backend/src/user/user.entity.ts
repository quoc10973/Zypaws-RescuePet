import { IsEmail, IsOptional, IsPhoneNumber, Length } from "class-validator";
import { Role } from "src/model/enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @Column({ nullable: false })
    @Length(6, 25, { message: 'Password must be at least 6 characters and 20 characters' })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @IsPhoneNumber('VN')
    phone: string;

    @Column({ nullable: true })
    @IsOptional()
    age: number

    @Column()
    role: Role

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

}