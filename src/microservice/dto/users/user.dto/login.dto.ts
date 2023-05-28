import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class LoginDto {
    @ApiProperty({
        required: true,
        description: '用户id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    @Length(5, 20, {
        message: '长度为5-20'
    })
    userName: string


    @ApiProperty({
        required: true,
        description: '用户密码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    @Length(5, 20, {
        message: '长度为5-20'
    })
    passWord: string
}