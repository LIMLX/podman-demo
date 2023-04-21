import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateTypeDto {
    @ApiProperty({
        required: true,
        description: '类型代码'
    })

    @IsNotEmpty({
        message: "类型代码不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeNum: string


    @ApiProperty({
        required: true,
        description: '类型名称'
    })

    @IsNotEmpty({
        message: "类型名不能为空"
    })
    @IsString({
        message: "类型名应为字符串"
    })
    typeName: string


    @ApiProperty({
        required: true,
        description: '类型等级'
    })

    @IsNotEmpty({
        message: "类型等级不能为空"
    })
    @IsInt({
        message: "应为数字"
    })
    typeLeave: number
}
