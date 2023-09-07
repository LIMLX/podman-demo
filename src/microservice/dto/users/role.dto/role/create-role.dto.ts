import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateRoleDto {
    @ApiProperty({
        required: true,
        description: '角色代码'
    })

    @IsNotEmpty()
    @IsString()
    roleNum: string


    @ApiProperty({
        required: true,
        description: '角色名称'
    })

    @IsNotEmpty()
    @IsString()
    roleName: string


    @ApiProperty({
        required: true,
        description: '角色身份(0为职工,1为学生)'
    })

    @IsNotEmpty()
    @IsInt()
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

    @IsNotEmpty()
    @IsString()
    roleId: string


    @ApiProperty({
        required: true,
        description: '职工id'
    })

    @IsNotEmpty()
    @IsString()
    employeeId: string
}

export class AuthStudentRoleDto {
    @ApiProperty({
        required: true,
        description: '角色id'
    })

    @IsNotEmpty()
    @IsString()
    roleId: string


    @ApiProperty({
        required: true,
        description: '学生id'
    })

    @IsNotEmpty()
    @IsString()
    studentId: string
}
