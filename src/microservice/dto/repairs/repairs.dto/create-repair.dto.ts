import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateRepairDto {

    @ApiProperty({
        required: true,
        description: '类型代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeNum: string


    @ApiProperty({
        required: true,
        description: '楼栋代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    buildingNum: string


    @ApiProperty({
        required: true,
        description: '具体地点'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    dorm: string

    userId: string
    userLevel: number


    @ApiProperty({
        required: true,
        description: '用户联系方式'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    phone: string


    @ApiProperty({
        required: true,
        description: '内容'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    content: string

    file: {
        file_site: string
        file_type: string
    }[]
}
