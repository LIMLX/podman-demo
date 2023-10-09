import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateAdminDto { }
export class CreateReportTypeDto {
    @ApiProperty({
        required: true,
        description: '类型名称'
    })
    @IsNotEmpty()
    @IsString()
    typeName: string

    @ApiProperty({
        required: true,
        description: '类型备注'
    })
    typeTitle: string

    adminId: string
    adminName: string
}