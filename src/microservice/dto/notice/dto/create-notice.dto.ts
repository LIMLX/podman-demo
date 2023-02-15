import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateNoticeDto {
    @ApiProperty({
        required: true,
        description:'通知标题'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    notice_title: string


    @ApiProperty({
        required: true,
        description:'通知内容'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    notice_content: string


    @ApiProperty({
        required: true,
        description:'通知标签'
    })
    tag : {
        tag_id: string,
        notice_uuid: string
    }[]


    @ApiProperty({
        required: true,
        description:'通知文件'
    })
    file: {
        notice_uuid: string,
        file_name: string,
        file_type: string
    }[]

    @ApiProperty({
        required: true,
        description:'通知删除文件'
    })
    fileDel: {
        file_name: string
    }[]
}