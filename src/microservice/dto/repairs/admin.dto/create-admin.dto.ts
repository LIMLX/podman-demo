import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateAdminDto {
    @ApiProperty({
        required: true,
        description: '创建的管理员名称'
    })

    @IsNotEmpty({
        message: "名称为空"
    })
    @IsString({
        message: "名称不符合格式"
    })
    adminName: string


    @ApiProperty({
        required: true,
        description: '管理员账号'
    })

    @IsNotEmpty({
        message: "账号为空"
    })
    @IsString({
        message: "账号格式错误"
    })
    adminNum: string


    @ApiProperty({
        required: true,
        description: '管理员密码'
    })

    @IsNotEmpty({
        message: "密码为空"
    })
    @IsString({
        message: "密码格式错误"
    })
    adminPsw: string
}
