import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateTypeDto {
    @ApiProperty({
        required: true,
        description:'请假单类型代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeNum : string


    @ApiProperty({
        required: true,
        description:'请假单类型名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeName: string
}

export class CreateSchoolTypeDto {
    @ApiProperty({
        required: true,
        description:'离校单类型代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeNum : string


    @ApiProperty({
        required: true,
        description:'离校单类型名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeName: string
}

export class CreateStatusDto {
    @ApiProperty({
        required: true,
        description:'状态代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    statusNum : string


    @ApiProperty({
        required: true,
        description:'状态名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    statusName: string
}

export class CreateTransportationDto {
    @ApiProperty({
        required: true,
        description:'交通方式代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    transportationNum: string


    @ApiProperty({
        required: true,
        description:'交通方式名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    transportationName: string
}