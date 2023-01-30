import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class RoleCreateDTO {
    role_id : string

    @ApiProperty({
        required: true,
        description:'角色名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    role_name : string

    @ApiProperty({
        required: true,
        description:'角色代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    role_num : string
    role_creation_time : string
    role_update_time : string
}