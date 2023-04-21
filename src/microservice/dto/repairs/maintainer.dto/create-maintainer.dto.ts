import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateMaintainerDto {
    @ApiProperty({
        required: true,
        description: '维修工名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    maintainerName: string


    @ApiProperty({
        required: true,
        description: '维修工工号'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    maintainerNum: string

    @ApiProperty({
        required: false,
        description: '维修工密码'
    })
    maintainerPsw: string

    @ApiProperty({
        required: true,
        description: '维修工电话号码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    maintainerPhone: string
}