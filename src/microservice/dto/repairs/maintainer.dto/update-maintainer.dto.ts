import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class TransferRepairsDto {
    mtrId: string
    mtrName: string

    @ApiProperty({
        required: true,
        description: '单号/维修单单号'
    })
    @IsNotEmpty()
    @IsString()
    repairId: string

    @ApiProperty({
        required: true,
        description: '转单对象num工号'
    })
    @IsNotEmpty()
    @IsString()
    transferMtrNum: string


    @ApiProperty({
        required: true,
        description: '转单理由'
    })
    @IsNotEmpty()
    @IsString()
    cause: string
}

export class SendBackRepairsDto {
    userId: string
    userName: string

    @ApiProperty({
        required: true,
        description: '单号/维修单单号'
    })
    @IsNotEmpty()
    @IsString()
    repairId: string

    @ApiProperty({
        required: true,
        description: '退单理由'
    })
    @IsNotEmpty()
    @IsString()
    cause: string
}

export class FulfilRepairsDto {
    @ApiProperty({
        required: true,
        description: '单号/维修单单号'
    })
    @IsNotEmpty()
    @IsString()
    repairId: string
    userId: string
    userName: string

    file: {
        file_site: string
        file_type: string
    }[]
}