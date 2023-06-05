import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class AuthAdminDto {
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
    userId: string


    @ApiProperty({
        required: true,
        description: '模块num'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    moduleNum: string


    @ApiProperty({
        required: true,
        description: '模块等级'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt()
    authLevel: number
}

export class DelAuthAdminDto {
    @ApiProperty({
        required: true,
        description: '账号'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    userId: string


    @ApiProperty({
        required: true,
        description: '模块num'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    moduleNum: string
}

export class FindUserAuthDto {
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
    userId: string


    @ApiProperty({
        required: true,
        description: '模块num'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    moduleNum: string
}