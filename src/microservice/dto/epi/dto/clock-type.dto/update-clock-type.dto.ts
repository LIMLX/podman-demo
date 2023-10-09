import { IsNotEmpty, IsString } from "class-validator"
import { CreateClockTypeDto } from "./create-clock-type.dto"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateClockTypeDto extends CreateClockTypeDto {
    @ApiProperty({
        required: true,
        description: '状态id'
    })

    @IsNotEmpty()
    @IsString()
    typeId: string
}
