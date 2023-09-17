import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class MaintainerLoginDto {
    @ApiProperty({
        required: true,
        description: '账号/工号'
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

export class FindRepairsDto {
    mtrId: string
    typeNum: string
    time: number
    status: number
    page: number
}