import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateClockDto {
    userId: string

    @ApiProperty({
        required: true,
        description: '温度'
    })
    @IsNotEmpty()
    @IsNumber()
    tp: number

    @ApiProperty({
        required: true,
        description: '类型'
    })
    @IsNotEmpty()
    typeVal: string[]
}

export class CreateReportDto {
    userId: string
    userName: string
    userLevel: number

    @ApiProperty({
        required: true,
        description: '报备类型'
    })
    @IsNotEmpty()
    @IsString()
    typeNum: string

    @ApiProperty({
        required: true,
        description: '开始时间'
    })
    @IsNotEmpty()
    startTime: string

    @ApiProperty({
        required: true,
        description: '结束时间'
    })
    @IsNotEmpty()
    endTime: string

    @ApiProperty({
        required: true,
        description: '电话号码'
    })
    @IsNotEmpty()
    @IsString()
    phone: string

    @ApiProperty({
        required: true,
        description: '范围省份'
    })
    @IsNotEmpty()
    @IsString()
    province: string

    @ApiProperty({
        required: true,
        description: '范围县'
    })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({
        required: true,
        description: '外出地点'
    })
    @IsNotEmpty()
    @IsString()
    destination: string

    @ApiProperty({
        required: true,
        description: '外出理由'
    })
    @IsNotEmpty()
    @IsString()
    reason: string

    @ApiProperty({
        required: true,
        description: '文件'
    })
    file: {
        fileSite: string
    }[]
}