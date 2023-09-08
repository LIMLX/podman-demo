import { ApiProperty } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateStudentDto extends CreateStudentDto {
    studentId: string
}

export class UpdateStudentPswDto {
    @ApiProperty({
        required: true,
        description: '学生id'
    })
    studentId: string

    @ApiProperty({
        required: true,
        description: '密码'
    })

    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    password: string
}