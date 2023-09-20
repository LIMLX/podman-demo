import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateEmployeeDto {
    @ApiProperty({
        required: true,
        description: '职工名称'
    })
    @IsNotEmpty()
    @IsString()
    employeeName: string

    @ApiProperty({
        required: true,
        description: '职工性别'
    })
    @IsNotEmpty()
    @IsInt()
    employeeSex: number


    @ApiProperty({
        required: true,
        description: '职工工号'
    })
    @IsNotEmpty()
    @IsString()
    employeeNum: string


    @ApiProperty({
        required: true,
        description: '部门id'
    })
    @IsNotEmpty()
    @IsString()
    departmentId: string

    @ApiProperty({
        required: false,
        description: '角色id'
    })
    role: string[]
    phone: string
    identification: string
}

export class UpdateClassTeacherDto {
    @ApiProperty({
        required: true,
        description: '班级id'
    })

    @IsNotEmpty()
    @IsString()
    classId: string


    @ApiProperty({
        required: true,
        description: '班主任id'
    })

    @IsNotEmpty()
    @IsString()
    teacherId: string
}

export class UpdateClassAssistantDto {
    @ApiProperty({
        required: true,
        description: '班级id'
    })

    @IsNotEmpty()
    @IsString()
    classId: string


    @ApiProperty({
        required: true,
        description: '辅导员id'
    })

    @IsNotEmpty()
    @IsString()
    assistanId: string
}