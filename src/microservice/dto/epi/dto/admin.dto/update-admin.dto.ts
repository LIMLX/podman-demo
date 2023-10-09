import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CreateReportTypeDto } from "./create-admin.dto"

export class UpdateClockDto {
    @ApiProperty({
        required: true,
        description: '打卡记录id'
    })

    @IsNotEmpty()
    @IsInt()
    clockId: number
    am: boolean
    amTp: number
    amTypeId: string
    pm: boolean
    pmTp: number
    pmTypeId: string
    night: boolean
    nightTp: number
    nightTypeId: string
    adminId: string
    adminName: string
}

export class UpdateReportDto {
    @ApiProperty({
        required: true,
        description: '报备单id'
    })
    @IsNotEmpty()
    @IsString()
    reportId: string

    @ApiProperty({
        required: true,
        description: '报备类型id'
    })
    @IsNotEmpty()
    @IsString()
    typeId: string

    @ApiProperty({
        required: true,
        description: '起始时间'
    })
    @IsNotEmpty()
    @IsString()
    startTime: string

    @ApiProperty({
        required: true,
        description: '结束时间'
    })
    @IsNotEmpty()
    @IsString()
    endTime: string

    @ApiProperty({
        required: true,
        description: '省份'
    })
    @IsNotEmpty()
    @IsString()
    province: string

    @ApiProperty({
        required: true,
        description: '市区'
    })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({
        required: true,
        description: '外出地点'
    })
    @IsNotEmpty()
    @IsString()
    destination: string

    @ApiProperty({
        required: true,
        description: '外出事由'
    })
    @IsNotEmpty()
    @IsString()
    reason: string
    adminId: string
    adminName: string
}

export class DelReportDto {
    @ApiProperty({
        required: true,
        description: '删除的报备单id'
    })
    @IsNotEmpty()
    reportId: string[]
    adminId: string
    adminName: string
}

export class AuditReportDto {
    @ApiProperty({
        required: true,
        description: '审批的报备单id'
    })
    @IsNotEmpty()
    reportId: string[]

    @ApiProperty({
        required: true,
        description: '审批的报备单的状态'
    })
    @IsNotEmpty()
    @IsIn([-1, 2])
    @IsNumber()
    status: number
    adminId: string
    adminName: string
}

export class UpdateReportTypeDto extends CreateReportTypeDto {
    @ApiProperty({
        required: true,
        description: '类型id'
    })
    @IsNotEmpty()
    @IsString()
    typeId: string
}

export class DelReportTypeDto {
    @ApiProperty({
        required: true,
        description: '类型id'
    })
    @IsNotEmpty()
    @IsString()
    typeId: string
    adminId: string
    adminName: string
}