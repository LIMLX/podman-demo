import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateClockTypeDto {
    @ApiProperty({
        required: true,
        description: '状态名'
    })

    @IsNotEmpty()
    @IsString()
    typeName: string


    @ApiProperty({
        required: true,
        description: '状态类型(分异常)'
    })
    @IsNotEmpty()
    @IsNumber()
    @IsIn([0, 1])
    typeStatus: number

    @ApiProperty({
        required: true,
        description: '类型备注'
    })
    typeTitle: string
}
