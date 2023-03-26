import { ApiProperty } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateStudentDto extends CreateStudentDto {
    studentId: string
}

export class UpdateStudentPswDto {
    @ApiProperty({
        required: true,
        description:'学生id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    studentId: string

    
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
    studentPassword: string
}