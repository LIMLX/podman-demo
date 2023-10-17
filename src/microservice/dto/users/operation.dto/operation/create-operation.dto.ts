import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOperationDto {
    @ApiProperty({
        required: true,
        description: '操作标题'
    })

    @IsNotEmpty()
    @IsString()
    operationTitle: string

    @ApiProperty({
        required: true,
        description: '操作权限名'
    })

    @IsNotEmpty()
    @IsString()
    operationName: string

    @ApiProperty({
        required: true,
        description: '操作权限等级'
    })

    @IsNotEmpty()
    @IsNumber()
    operationLevel: number
}
