import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumberString, IsString } from "class-validator"

export class CreateHistoryDto {
    @ApiProperty({
        required: true,
        description: '文章标题'
    })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({
        required: true,
        description: '文章类型'
    })
    @IsNotEmpty()
    @IsNumberString()
    type: number

    @ApiProperty({
        required: true,
        description: '文章内容'
    })
    @IsNotEmpty()
    @IsString()
    content: string

    @ApiProperty({
        required: true,
        description: '文章发布人'
    })
    @IsNotEmpty()
    @IsString()
    issuer: string

    @ApiProperty({
        required: true,
        description: '文章发布时间'
    })
    @IsNotEmpty()
    @IsDateString()
    releaseTime: Date
    appointmentTime?: any

    addFile?: any
    delFile?: string[]
}

export class CreatePersonagDto {
    @ApiProperty({
        required: true,
        description: '人物姓名'
    })
    @IsNotEmpty()
    @IsString()
    name: string


    @ApiProperty({
        required: true,
        description: '人物姓名'
    })
    @IsNotEmpty()
    @IsNumberString()
    gender: number


    @ApiProperty({
        required: true,
        description: '发布者姓名'
    })
    @IsNotEmpty()
    @IsString()
    issuer: string


    @ApiProperty({
        required: true,
        description: '民族id'
    })
    @IsNotEmpty()
    @IsString()
    nationId: string


    @ApiProperty({
        required: true,
        description: '身份信息'
    })
    @IsNotEmpty()
    @IsString()
    identity: string


    @ApiProperty({
        required: true,
        description: '人物生日'
    })
    @IsNotEmpty()
    @IsDateString()
    birthday: Date


    @ApiProperty({
        required: true,
        description: '是否死亡'
    })
    @IsNotEmpty()
    @IsNumberString()
    die: number
    dieTime: Date


    @ApiProperty({
        required: true,
        description: '人物内容'
    })
    @IsNotEmpty()
    @IsString()
    content: string
    appointmentTime: any

    tag?: any
    addFile?: any

    delFile?: string[]
}

export class CreateSiteDto {
    @ApiProperty({
        required: true,
        description: '地点标题'
    })
    @IsNotEmpty()
    @IsString()
    title: string


    @ApiProperty({
        required: true,
        description: '地点名称'
    })
    @IsNotEmpty()
    @IsString()
    name: string


    @ApiProperty({
        required: true,
        description: '地点所在省份'
    })
    @IsNotEmpty()
    @IsString()
    province: string


    @ApiProperty({
        required: true,
        description: '地点所在市'
    })
    @IsNotEmpty()
    @IsString()
    city: string


    @ApiProperty({
        required: true,
        description: '地点所县/区'
    })
    country: string


    @ApiProperty({
        required: true,
        description: '地点内容HTML'
    })
    @IsNotEmpty()
    @IsString()
    content: string


    @ApiProperty({
        required: true,
        description: '发布人名称'
    })
    @IsNotEmpty()
    @IsString()
    issuer: string


    @ApiProperty({
        required: true,
        description: '发布时间'
    })
    @IsNotEmpty()
    @IsDateString()
    releaseTime: Date
    appointmentTime?: any

    addFile?: {
        fileName: string
        fileType: string
    }[]
}