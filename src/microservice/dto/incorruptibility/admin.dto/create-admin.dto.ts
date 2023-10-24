import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateAdminDto { }

export class CreateSloganDto {
    adminId: string
    adminName: string

    @ApiProperty({
        required: true,
        description: '标语标题'
    })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({
        required: true,
        description: '标语内容'
    })
    @IsNotEmpty()
    @IsString()
    content: string

    @ApiProperty({
        required: true,
        description: '标语发布时间'
    })
    @IsNotEmpty()
    @IsString()
    releaseTime: Date

    @ApiProperty({
        required: true,
        description: '标语定时时间'
    })
    appointmentTime: Date

    addFile?: {
        fileName: string
        fileType: string
    }[]

    delFile?: {
        fileName: string
        fileType: string
    }[]
}