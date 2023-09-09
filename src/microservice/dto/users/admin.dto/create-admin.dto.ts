import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateAdminDto {
    @ApiProperty({
        required: true,
        description: '账号'
    })

    @IsNotEmpty()
    @IsString()
    account: string

    @ApiProperty({
        required: true,
        description: '密码'
    })

    @IsNotEmpty()
    @IsString()
    password: string
}
