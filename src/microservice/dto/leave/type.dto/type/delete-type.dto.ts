import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class DeleteTypeDto {
    @ApiProperty({
        required: true,
        description:'请假单类型id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeId: string
}

export class DeleteSchoolTypeDto {
    @ApiProperty({
        required: true,
        description:'离校单类型id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeId: string
}

export class DeleteStatusDto {
    @ApiProperty({
        required: true,
        description:'状态id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    statusId: string
}

export class DeleteTransportationDto {
    @ApiProperty({
        required: true,
        description:'交通方式id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    transportationId: string
}