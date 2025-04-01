import { ApiProperty } from "@nestjs/swagger";
import { Role } from "./enum";
import { Exclude } from "class-transformer";
import { IsEmail, IsPhoneNumber, Length } from "class-validator";

export class RegisterRequest {
    @IsEmail({}, { message: 'Invalid email' })
    @ApiProperty()
    email: string;

    @ApiProperty()
    @Length(6, 25, { message: 'Password must be at least 6 characters and 20 characters' })
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    @IsPhoneNumber('VN')
    phone: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    address: string;

    @Exclude()
    role: Role;
}