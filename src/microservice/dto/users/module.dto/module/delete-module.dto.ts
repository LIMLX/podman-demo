import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteModuleDto {
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
}

export class DeleteAuthEmployeeRoleDto {
    @ApiProperty({
        required: true,
        description:'职工角色授权id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    authId: string
}

export class DeleteAuthEmployeePrivateDto {
    @ApiProperty({
        required: true,
        description:'职工私有模块id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    authId: string
}

export class DeleteAuthStudentRoleDto {
    @ApiProperty({
        required: true,
        description:'学生角色授权id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    authId: string
}

export class DeleteAuthStudentPrivateDto {
    @ApiProperty({
        required: true,
        description:'学生私有权限id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    authId: string
}