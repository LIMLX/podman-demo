import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateClassDto {
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
    className: string


    @ApiProperty({
        required: true,
        description:'班级开始时间'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    classStartTime: Date


    @ApiProperty({
        required: true,
        description:'班级结束时间'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    classEndTime: Date
}

export class CreateCampusDto {
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
    campusName: string


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
    campusNum: string


    @ApiProperty({
        required: true,
        description:'学校绑定id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    schoolId: string
}

export class CreateDepartmentDto {

    @ApiProperty({
        required: true,
        description:'部门名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    departmentName: string


    @ApiProperty({
        required: true,
        description:'部门等级'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为数字"
    })
    departmentLevel: number

    @ApiProperty({
        required: false,
        description:'学院id'
    })
    capmpusId?: string
}

export class CreateSchoolDto {

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
    schoolName: string

    
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
    schoolNum: string
}