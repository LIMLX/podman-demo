import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNotEmpty, IsString } from "class-validator"

export class ParamLeaveOneDto {
    id: number
    leaveUUID: string
}

export class ParamLeaveSchoolOneDto {
    id: number
    leaveUUID: string
}

export class ParamLeaveFilterDto {
    employeeId: string


    @ApiProperty({
        required: true,
        description: '时间'
    })
    @IsIn(['Today', 'Week', 'Month', 'HalfYear', 'Year', undefined])
    time: string

    @ApiProperty({
        required: false,
        description: '类型Num'
    })
    @IsIn(['0', '1', 'leave', 'all', 'school', 'returnSchool', undefined])
    typeNum: string

    @ApiProperty({
        required: false,
        description: '状态Num'
    })
    statusNum: string
    page: string
}

