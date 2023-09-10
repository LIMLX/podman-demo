import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class LoginDto {
    @ApiProperty({
        required: true,
        description: '用户id'
    })

    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    account: string


    @ApiProperty({
        required: true,
        description: '用户密码'
    })

    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    password: string
}