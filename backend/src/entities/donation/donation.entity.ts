import { IsNumber } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Donation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNumber()
    amount: number;

    @Column({ type: 'text' })
    message: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.donations)
    user: User;

}