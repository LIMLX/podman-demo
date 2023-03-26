import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateEmployeeDto {
    @ApiProperty({
        required: true,
        description:'职工名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    employeeName : string


    @ApiProperty({
        required: true,
        description:'职工性别'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为数字"
    })
    employeeSex : number


    @ApiProperty({
        required: true,
        description:'职工工号'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    employeeNum : string
}
export class LoginEmloyeeDto{
    @ApiProperty({
        required: true,
        description:'职工工号'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    employeeNum : string


    @ApiProperty({
        required: true,
        description:'职工密码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    employeePsw: string
}