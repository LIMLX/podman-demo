import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateRoleDto {
    @ApiProperty({
        required: true,
        description: '角色代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    roleNum: string


    @ApiProperty({
        required: true,
        description: '角色名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    roleName: string


    @ApiProperty({
        required: true,
        description: '角色身份(0为职工,1为学生)'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为数字"
    })
    roleIdentity: number


    @ApiProperty({
        required: false,
        description: '部门id'
    })
    roleDepartmentId?: string
}

export class AuthEmployeeRoleDto {
    @ApiProperty({
        required: true,
        description: '角色id'
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
        description: '职工id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    employeeId: string
}

export class AuthStudentRoleDto {
    @ApiProperty({
        required: true,
        description: '角色id'
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
        description: '学生id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    studentId: string
}
