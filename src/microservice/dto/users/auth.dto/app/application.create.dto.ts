import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class ApplicationCreateDTO {
    app_id : string

    @ApiProperty({
        required: true,
        description:'应用名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    app_name : string

    @ApiProperty({
        required: true,
        description:'应用代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    app_num : string
    app_creation_time : string
    role_update_time : string
}