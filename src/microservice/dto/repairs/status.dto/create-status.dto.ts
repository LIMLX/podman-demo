import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateStatusDto {
    @ApiProperty({
        required: true,
        description: '状态代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    statusNum: string


    @ApiProperty({
        required: true,
        description: '状态id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    statusName: string


    @ApiProperty({
        required: true,
        description: '状态等级'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为数字"
    })
    statusLevel: number
}
