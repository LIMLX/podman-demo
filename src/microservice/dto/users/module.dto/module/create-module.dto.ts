import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateModuleDto {
    @ApiProperty({
        required: true,
        description:'模块代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    moduleNum: string


    @ApiProperty({
        required: true,
        description:'模块名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    moduleName: string
}

export class AuthEmployeeDto {
    @ApiProperty({
        required: true,
        description:'模块id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    moduleId: string


    @ApiProperty({
        required: true,
        description:'授权模块 --- 职工角色id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    roleId: string

    @ApiProperty({
        required: true,
        description:'操作权限id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    operationId: string
}

export class AuthStudentDto {
    @ApiProperty({
        required: true,
        description:'模块id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    moduleId: string


    @ApiProperty({
        required: true,
        description:'授权模块 --- 学生角色id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    roleId: string


    @ApiProperty({
        required: true,
        description:'操作权限id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    operationId: string
}

export class PrivateEmployeeAuthDto {
    @ApiProperty({
        required: true,
        description:'模块id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    moduleId: string


    @ApiProperty({
        required: true,
        description:'私有授权模块 --- 职工角色id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    employeeId: string


    @ApiProperty({
        required: true,
        description:'操作权限id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    operationId: string
}

export class PrivateStudentAuthDto {
    @ApiProperty({
        required: true,
        description:'模块id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    moduleId: string


    @ApiProperty({
        required: true,
        description:'私有授权模块 --- 学生角色id'
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
        description:'操作权限id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    operationId: string
}