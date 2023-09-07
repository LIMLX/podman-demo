import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateOperationDto {
    @ApiProperty({
        required: true,
        description: '操作权限代号'
    })

    @IsNotEmpty()
    @IsString()
    operationNum: string


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
    @IsInt()
    operationLevel: number
}
