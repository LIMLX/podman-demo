import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

// student表 字段
export class UserDTO {

    @ApiProperty({
        required: true,
        description:'学号id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    @Length(5,10,{
        message:'长度为5-10'
    })
    student_num : string

    // 学生姓名
    student_name: string

    // 学生性别
    student_sex : number

    // 学生入学年
    student_enrollment_time : Date

    // 学生电话号码
    student_phone : string

    // 所属班级id
    student_classes_id : string

    // 删除时间
    student_delete_time : Date
}