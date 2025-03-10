import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateAdoptionDTO {

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('VN')
    phone: string;

    @ApiProperty()
    emailUpdates: boolean;

    @ApiProperty()
    enquireForSomeoneElse: boolean;

    @ApiProperty()
    message: string;

    @ApiProperty()
    petId: number;
}