import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginMaintainerDto {
    @ApiProperty({
        required: true,
        description: '用于登录的工号'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    maintainerNum: string



    @ApiProperty({
        required: true,
        description: '登录密码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    maintainerPsw: string
}