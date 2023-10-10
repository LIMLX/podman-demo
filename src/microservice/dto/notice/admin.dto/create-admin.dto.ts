import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateNoticeDto {
    adminId: string
    adminName: string
    noticeIssuerId: string


    @ApiProperty({
        required: true,
        description: '发布部门'
    })
    @IsNotEmpty()
    @IsString()
    noticeIssuer: string

    @ApiProperty({
        required: true,
        description: '通知标题'
    })
    @IsNotEmpty()
    @IsString()
    noticeTitle: string

    @ApiProperty({
        required: true,
        description: '通知内容---富文本'
    })
    @IsNotEmpty()
    @IsString()
    noticeContent: string

    @ApiProperty({
        required: true,
        description: '通知发布时间'
    })
    @IsNotEmpty()
    releaseTime: Date
    appointmentTime?: Date
    tag?: string[]

    addFile?: {
        fileName: string
        fileType: string
    }[]

    attachedFile?: {
        fileSite: string
        fileName: string
        fileType: string
    }[]

    delFile?: {
        fileName: string
        fileType: string
    }[]
}

export class CreateNoticeTagDto {
    @ApiProperty({
        required: true,
        description: '通知类型'
    })
    @IsNotEmpty()
    tag: {
        tagName: string
        title: string
    }[]
    adminId: string
    adminName: string
}