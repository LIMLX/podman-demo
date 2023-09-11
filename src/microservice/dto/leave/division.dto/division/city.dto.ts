import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CityDto {
    @ApiProperty({
        required: true,
        description: '省级id'
    })

    @IsNotEmpty()
    @IsString()
    provinceId: string
}