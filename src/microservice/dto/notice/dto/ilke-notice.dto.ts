import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class LikeNoticeDto {

    @ApiProperty({
        required: true,
        description:'用户id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    userId: string


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
    noticeUUID: string


    @ApiProperty({
        required: true,
        description:'点赞状态'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为整型"
    })
    status : number
}