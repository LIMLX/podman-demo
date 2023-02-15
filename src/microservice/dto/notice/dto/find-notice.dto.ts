import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class FindNoticeDto {
    @ApiProperty({
        required: true,
        description:'通知id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为整型"
    })
    notice_id: number


    @ApiProperty({
        required: true,
        description:'通知uuid'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    notice_uuid: string
}