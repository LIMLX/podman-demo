import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class CampusDTO_Create {
    campus_id : string

    @ApiProperty({
        required: true,
        description:'校区名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    campus_name : string

    @ApiProperty({
        required: true,
        description:'校区代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    campus_num : string
    campus_school_id : string
}