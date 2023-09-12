import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateStatusDto {
    @ApiProperty({
        required: true,
        description: '状态num'
    })

    @IsNotEmpty()
    @IsString()
    statusNum: string

    @ApiProperty({
        required: true,
        description: '状态名称'
    })

    @IsNotEmpty()
    @IsString()
    statusName: string

    @ApiProperty({
        required: true,
        description: '状态等级'
    })

    @IsNotEmpty()
    @IsInt()
    statusLeavel: number
}

export class CreateSchoolTypeDto {
    @ApiProperty({
        required: true,
        description: '类型num'
    })

    @IsNotEmpty()
    @IsString()
    typeNum: string

    @ApiProperty({
        required: true,
        description: '类型名称'
    })

    @IsNotEmpty()
    @IsString()
    typeName: string
}

export class CreateTransportationDto {
    @ApiProperty({
        required: true,
        description: '交通方式num'
    })

    @IsNotEmpty()
    @IsString()
    transportationNum: string

    @ApiProperty({
        required: true,
        description: '交通方式名称'
    })

    @IsNotEmpty()
    @IsString()
    transportationName: string
}