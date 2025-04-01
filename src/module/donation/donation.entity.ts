import { IsNumber } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    donator: string;

    @Column({ unique: true })
    transactionId: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;


}