import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"

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

    @ApiProperty({
        required: true,
        description: 'time天前的数据'
    })
    time: number

    @ApiProperty({
        required: true,
        description: '状态'
    })
    @IsIn([-1, 1, 2, 3, "-1", "1", "2", "3", undefined])
    status: any
    page: number
}

export class FindAppRepairsDto {
    mtrId: string
    updateTime: Date
}