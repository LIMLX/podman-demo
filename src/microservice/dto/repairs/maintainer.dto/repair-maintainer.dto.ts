import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class OrderReceivingDto {
    maintainerId: string
    repairsUUID: string
}

export class TransferRepairDto {
    maintainerId: string

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
    repairsUUID: string


    @ApiProperty({
        required: true,
        description: '转单对象的工号'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    transferMaintainerNum: string


    @ApiProperty({
        required: true,
        description: '转单理由'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    cause: string
}

export class ReturnRepairDto {
    @ApiProperty({
        required: true,
        description: '退单的工单id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    repairsUUID: string
    maintainerId: string


    @ApiProperty({
        required: true,
        description: '退单理由'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    cause: string
}

export class FulfilRepairsDto {
    @ApiProperty({
        required: true,
        description: '完单工单id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    repairsUUID: string
    maintainerId: string
    fileSite: string
}