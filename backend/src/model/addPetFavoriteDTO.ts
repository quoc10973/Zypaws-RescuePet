import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddPetFavoriteDTO {
    @ApiProperty()
    @IsNumber()
    petId: number;
}