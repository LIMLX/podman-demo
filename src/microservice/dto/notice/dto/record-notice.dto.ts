import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class RecordNotice {
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
    userId : string

    
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
}