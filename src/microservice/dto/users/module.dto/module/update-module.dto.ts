import { ApiProperty } from '@nestjs/swagger';
import { AuthEmployeeDto, AuthStudentDto, CreateModuleDto, PrivateEmployeeAuthDto, PrivateStudentAuthDto } from './create-module.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateModuleDto extends CreateModuleDto {
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

export class UpdateEmployeeAuthDto {
    @ApiProperty({
        required: true,
        description:'授权id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    authId: string


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

export class UpdateStudentAuthDto {
    @ApiProperty({
        required: true,
        description:'授权id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    authId: string


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

export class UpdateEmployeePrivateDto {
    @ApiProperty({
        required: true,
        description:'授权id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    authId: string


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

export class UpdateStudentPrivateDto {
    @ApiProperty({
        required: true,
        description:'授权id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    authId: string


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