import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class ApplicationAutCreatehDTO {
    auth_id : string

    @ApiProperty({
        required: true,
        description:'角色id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    role_id : string

    @ApiProperty({
        required: true,
        description:'应用id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    app_id : string
    auth_creation_time : Date
}