import { Expose } from "class-transformer";

export class UserDTO {
    @Expose()
    id: string;
    @Expose()
    email: string;
    @Expose()
    firstName: string;
    @Expose()
    lastName: string;
    @Expose()
    phone: string;
    @Expose()
    age: number;
    @Expose()
    role: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}