import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateRoleDto {
    @ApiProperty({
        required: true,
        description: '角色简介标题'
    })

    @IsNotEmpty()
    @IsString()
    roleTitle: string

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

export class CreateAdminUserDto {
    @ApiProperty({
        required: true,
        description: '模块id'
    })

    @IsNotEmpty()
    @IsString()
    moduleId: string

    @ApiProperty({
        required: true,
        description: '授权等级'
    })

    @IsNotEmpty()
    @IsInt()
    moduleLevel: number

    @ApiProperty({
        required: true,
        description: '用户id'
    })

    @IsNotEmpty()
    @IsString()
    userId: string

    @ApiProperty({
        required: true,
        description: '用户等级'
    })

    @IsNotEmpty()
    @IsIn([0, 1])
    userLevel: number
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
