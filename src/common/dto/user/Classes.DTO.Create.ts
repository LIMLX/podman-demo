import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class ClassDTO_Create {
    classes_id   : string

    @ApiProperty({
        required: true,
        description:'班级名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    classes_name : string      
    classes_school_time_start : Date
    classes_school_time_end   : Date
    classes_in_school_status  : number
    classes_campus_id   : string
}