import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class LoginStudentDto{

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
    @Length(5,20,{
        message:'长度为5-20'
    })
    studentNum : string

    @ApiProperty({
        required: true,
        description:'密码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    @Length(5,20,{
        message:'长度为5-20'
    })
    studentPsw: string
}