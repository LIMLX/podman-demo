import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DelNotcieDto {
    @ApiProperty({
        required: true,
        description: '删除通知id'
    })
    @IsNotEmpty()
    noticeId: string[]
    adminId: string
    adminName: string
}

export class UpdateNoticeDto {
    adminId: string
    adminName: string

    @ApiProperty({
        required: true,
        description: '通知id'
    })
    @IsNotEmpty()
    @IsString()
    noticeId: string

    @ApiProperty({
        required: true,
        description: '通知原文件路径'
    })
    @IsNotEmpty()
    @IsString()
    contentPath: string

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

export class PublishNoticeDto {
    @ApiProperty({
        required: true,
        description: '发布通知id'
    })
    @IsNotEmpty()
    noticeId: string[]
    adminId: string
    adminName: string
}

export class UpdateNoticeTagDto {
    @ApiProperty({
        required: true,
        description: '通知id'
    })
    @IsNotEmpty()
    @IsString()
    tagId: string

    @ApiProperty({
        required: true,
        description: '通知名称'
    })
    @IsNotEmpty()
    @IsString()
    tagName: string

    @ApiProperty({
        required: true,
        description: '通知标题'
    })
    @IsNotEmpty()
    @IsString()
    title: string
    adminId: string
    adminName: string
}

export class DelNoticeTagDto {
    @ApiProperty({
        required: true,
        description: '通知id'
    })
    @IsNotEmpty()
    @IsString()
    tagId: string
    adminId: string
    adminName: string
}