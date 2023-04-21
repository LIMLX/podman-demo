import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateRepairDto {
    @ApiProperty({
        required: true,
        description: '工单id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    repairsUUID: string


    @ApiProperty({
        required: true,
        description: '类型id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeId: string


    @ApiProperty({
        required: true,
        description: '楼栋id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    buildingId: string


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
}
