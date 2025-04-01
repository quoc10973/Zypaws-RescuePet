import { ApiProperty } from "@nestjs/swagger";

export class CreateDonationDTO {
    @ApiProperty()
    amount: number;
    @ApiProperty()
    message: string;
}