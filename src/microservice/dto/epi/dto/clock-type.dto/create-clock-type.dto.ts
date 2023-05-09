import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateClockTypeDto {
    @ApiProperty({
        required: true,
        description: '状态名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString()
    typeName: string


    @ApiProperty({
        required: true,
        description: '当前状态类型名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsNumber()
    val: number


    @ApiProperty({
        required: true,
        description: '状态类型(分异常)'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsNumber()
    typeStatus: number
}
