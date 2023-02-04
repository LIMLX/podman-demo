import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class SchoolCreateDTO {
    school_id   : string

    @ApiProperty({
        required: true,
        description:'学校名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    school_name : string

    @ApiProperty({
        required: true,
        description:'学校代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    school_num  : string
    delete_time : Date

}