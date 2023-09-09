import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateClassDto {
    @ApiProperty({
        required: true,
        description: '班级名称'
    })

    @IsNotEmpty()
    @IsString()
    className: string

    @ApiProperty({
        required: true,
        description: '班级开始时间'
    })
    @IsNotEmpty()
    classStartTime: Date


    @ApiProperty({
        required: true,
        description: '班级结束时间'
    })
    @IsNotEmpty()
    classEndTime: Date

    @ApiProperty({
        required: true,
        description: '学院id'
    })

    @IsNotEmpty()
    @IsString()
    campusId: string
}

export class CreateCampusDto {
    @ApiProperty({
        required: true,
        description: '校区名称'
    })

    @IsNotEmpty()
    @IsString()
    campusName: string

    @ApiProperty({
        required: true,
        description: '校区标题'
    })

    @IsNotEmpty()
    @IsString()
    campusTitle: string


    @ApiProperty({
        required: true,
        description: '校区代码'
    })

    @IsNotEmpty()
    @IsString()
    campusNum: string


    @ApiProperty({
        required: true,
        description: '学校绑定id'
    })

    @IsNotEmpty()
    @IsString()
    schoolId: string
}

export class CreateDepartmentDto {

    @ApiProperty({
        required: true,
        description: '部门名称'
    })

    @IsNotEmpty()
    @IsString()
    departmentName: string


    @ApiProperty({
        required: true,
        description: '部门标题(简介)'
    })

    @IsNotEmpty()
    @IsString()
    departmentTitle: string
}

export class CreateSchoolDto {

    @ApiProperty({
        required: true,
        description: '学校名称'
    })
    @IsNotEmpty()
    @IsString()
    schoolName: string


    @ApiProperty({
        required: true,
        description: '学校代码'
    })
    @IsNotEmpty()
    @IsString()
    schoolNum: string
}