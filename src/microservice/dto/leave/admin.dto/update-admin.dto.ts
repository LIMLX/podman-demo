import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator"

export class AuditLeaveDto {
    @ApiProperty({
        required: false,
        description: '请假单id'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        required: false,
        description: '请假单类型type'
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['1', '2', '3'])
    type: string

    @ApiProperty({
        required: false,
        description: '状态'
    })
    @IsNotEmpty()
    @IsInt()
    @IsIn([1, 2])
    status: number
}

export class DelLeaveDto {
    @ApiProperty({
        required: false,
        description: '请假单id'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        required: false,
        description: '请假单类型type'
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['1', '2', '3'])
    type: string
}

export class DelLeaveBatchDto {
    @ApiProperty({
        required: false,
        description: '请假单id'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        required: false,
        description: '请假单类型type'
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['1', '2', '3'])
    type: string
}

export class UpdateLeaveDto {
    @ApiProperty({
        required: true,
        description: '请假单id'
    })
    @IsNotEmpty()
    @IsString()
    leaveId: string

    @ApiProperty({
        required: true,
        description: '类型(0病假,1事假)'
    })
    @IsNotEmpty()
    @IsInt()
    @IsIn([0, 1])
    type: number

    @ApiProperty({
        required: true,
        description: '内容'
    })
    @IsNotEmpty()
    @IsString()
    content: string

    @ApiProperty({
        required: true,
        description: '起始时间'
    })
    @IsNotEmpty()
    startTime: Date

    @ApiProperty({
        required: true,
        description: '结束时间'
    })
    @IsNotEmpty()
    endTime: Date

    @ApiProperty({
        required: true,
        description: '状态id'
    })
    @IsNotEmpty()
    @IsString()
    statusId: string
}

export class UpdateLeaveSchoolDto {
    @ApiProperty({
        required: true,
        description: '离校单id'
    })
    @IsNotEmpty()
    @IsString()
    leaveId: string

    @ApiProperty({
        required: true,
        description: '状态id'
    })
    @IsNotEmpty()
    @IsString()
    statusId: string

    @ApiProperty({
        required: true,
        description: '离校类型'
    })
    @IsNotEmpty()
    @IsString()
    leaveSchoolTypeId: string

    @ApiProperty({
        required: true,
        description: '起始时间'
    })
    @IsNotEmpty()
    startTime: Date

    @ApiProperty({
        required: true,
        description: '结束时间'
    })
    @IsNotEmpty()
    endTime: Date

    @ApiProperty({
        required: true,
        description: '交通方式id'
    })
    @IsNotEmpty()
    @IsString()
    transportationId: string

    @ApiProperty({
        required: true,
        description: '班次/航班'
    })
    @IsNotEmpty()
    @IsString()
    flight: string

    @ApiProperty({
        required: true,
        description: '省份'
    })
    @IsNotEmpty()
    @IsString()
    province: string

    @ApiProperty({
        required: true,
        description: '区/县'
    })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({
        required: true,
        description: '区/镇/村'
    })
    @IsNotEmpty()
    @IsString()
    country: string

    @ApiProperty({
        required: true,
        description: '内容'
    })
    @IsNotEmpty()
    @IsString()
    content: string
}

export class UpdateReturnSchoolDto {
    @ApiProperty({
        required: true,
        description: '返校单id'
    })
    @IsNotEmpty()
    @IsString()
    leaveId: string

    @ApiProperty({
        required: true,
        description: '状态id'
    })
    @IsNotEmpty()
    @IsString()
    statusId: string

    @ApiProperty({
        required: true,
        description: '预计起始时间'
    })
    @IsNotEmpty()
    startET: Date

    @ApiProperty({
        required: true,
        description: '预计结束时间'
    })
    @IsNotEmpty()
    endET: Date

    @ApiProperty({
        required: true,
        description: '起始时间'
    })
    @IsNotEmpty()
    startTime: Date

    @ApiProperty({
        required: true,
        description: '结束时间'
    })
    @IsNotEmpty()
    endTime: Date

    @ApiProperty({
        required: true,
        description: '交通方式id'
    })
    @IsNotEmpty()
    @IsString()
    transportationId: string

    @ApiProperty({
        required: true,
        description: '航班/班次'
    })
    @IsNotEmpty()
    @IsString()
    flight: string

    @ApiProperty({
        required: true,
        description: '起始省'
    })
    @IsNotEmpty()
    @IsString()
    startProvince: string

    @ApiProperty({
        required: true,
        description: '起始市'
    })
    @IsNotEmpty()
    @IsString()
    startCity: string

    @ApiProperty({
        required: true,
        description: '起始县/区'
    })
    @IsNotEmpty()
    @IsString()
    startCountry: string

    @ApiProperty({
        required: true,
        description: '到达省'
    })
    @IsNotEmpty()
    @IsString()
    endProvince: string

    @ApiProperty({
        required: true,
        description: '到达市'
    })
    @IsNotEmpty()
    @IsString()
    endCity: string

    @ApiProperty({
        required: true,
        description: '到达区/县'
    })
    @IsNotEmpty()
    @IsString()
    endCountry: string
}