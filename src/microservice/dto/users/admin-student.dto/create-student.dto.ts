import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString, Length, max, min } from "class-validator"

export class CreateStudentDto {
    @ApiProperty({
        required: true,
        description: '学号'
    })
    @IsNotEmpty()
    @IsString()
    studentNum: string


    @ApiProperty({
        required: true,
        description: '姓名'
    })
    @IsNotEmpty()
    @IsString()
    studentName: string


    @ApiProperty({
        required: true,
        description: '性别'
    })
    @IsNotEmpty()
    @IsInt()
    @Length(0, 1)
    studentSex: number

    @ApiProperty({
        required: true,
        description: '身份证'
    })
    @IsNotEmpty()
    @IsString()
    @Length(0, 18)
    identification: string


    @ApiProperty({
        required: false,
        description: '电话'
    })
    studentPhone: string


    @ApiProperty({
        required: true,
        description: '班级'
    })
    @IsNotEmpty()
    @IsString()
    studentClassId: string


    @ApiProperty({
        required: true,
        description: '入学时间'
    })
    @IsNotEmpty()
    @IsString()
    enrollmentTime: string


    @ApiProperty({
        required: true,
        description: '生源地'
    })
    @IsNotEmpty()
    @IsString()
    source: string


    @ApiProperty({
        required: true,
        description: '学年制'
    })
    @IsNotEmpty()
    @IsInt()
    schoolYear: number
}

export class AuthStudentRoleDto {
    roleId: string
    studentId: string
}