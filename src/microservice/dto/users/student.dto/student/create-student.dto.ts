import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateStudentDto {
    @ApiProperty({
        required: true,
        description: '学号id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    @Length(5, 20, {
        message: '长度为5-20'
    })
    studentNum: string

    @ApiProperty({
        required: true,
        description: '学生姓名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    @Length(1, 10, {
        message: '长度为1-10'
    })
    studentName: string

    @ApiProperty({
        required: true,
        description: '学生性别'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为枚举型数字"
    })
    studentSex: number


    @ApiProperty({
        required: true,
        description: '学生电话'
    })
    studentPhone: string


    @ApiProperty({
        required: true,
        description: '学生班级id'
    })
    studentClassId: string

    @IsNotEmpty()
    @IsString()
    graduateTime: Date
}
