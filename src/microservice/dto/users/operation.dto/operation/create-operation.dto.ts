import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateOperationDto {
    @ApiProperty({
        required: true,
        description:'操作权限代号'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    operationNum : string
    

    @ApiProperty({
        required: true,
        description:'操作权限名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    operationName: string


    @ApiProperty({
        required: true,
        description:'操作权限等级'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为数字"
    })
    operationLevel: number
}
