import { ApiProperty } from "@nestjs/swagger";

export class CreateAdoptionDTO {
    @ApiProperty()
    petId: number;
}