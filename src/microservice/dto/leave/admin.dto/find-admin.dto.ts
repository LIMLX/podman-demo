import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty } from "class-validator"

export class FindLeaveDto {
    @ApiProperty({
        required: true,
        description: '页数'
    })

    @IsNotEmpty()
    @IsInt()
    page: number

    @ApiProperty({
        required: false,
        description: '班级id'
    })
    classId: string

    @ApiProperty({
        required: false,
        description: '类型type'
    })
    @IsIn(['0', '1', 'leave', 'all', 'school', 'returnSchool', undefined])
    type: string

    @ApiProperty({
        required: false,
        description: '排序状态'
    })
    @IsIn(['asc', 'desc', undefined])
    orderBy: string

    @ApiProperty({
        required: false,
        description: '状态num'
    })
    statusNum: string

    @ApiProperty({
        required: false,
        description: '关键词'
    })
    like: string
}

export class DowLeaveExcelDto {
    @ApiProperty({
        required: false,
        description: '学院id'
    })
    campusId: string

    @ApiProperty({
        required: false,
        description: '班级id'
    })
    classId: string

    @ApiProperty({
        required: false,
        description: '辅导员id'
    })
    assistantId: string

    @ApiProperty({
        required: false,
        description: '开始时间'
    })
    startTime: Date

    @ApiProperty({
        required: false,
        description: '结束时间'
    })
    endTime: Date

    @ApiProperty({
        required: false,
        description: '时间段'
    })
    @IsIn(["Today", "Week", "Month", "HalfYear", "Year", undefined])
    time: string

    @ApiProperty({
        required: false,
        description: '类型'
    })
    @IsIn(["0", "1", "leave", "leaveSchool", "returnSchool", undefined])
    type: string

    @ApiProperty({
        required: false,
        description: '排序'
    })
    @IsIn(["desc", "asc", undefined])
    orderBy: string

    @ApiProperty({
        required: false,
        description: '状态'
    })
    @IsIn([0, 1, 2, undefined])
    statusNum: number
}