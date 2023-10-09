import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class FindClockDto {
    employeeId: string
    @ApiProperty({
        required: true,
        description: '查询日期'
    })
    @IsNotEmpty()
    @IsString()
    time: string

    @ApiProperty({
        required: true,
        description: '查询班级'
    })
    @IsNotEmpty()
    @IsString()
    classId: string

    @ApiProperty({
        required: true,
        description: '查询类型'
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(["entirely", "notEntirely", "notClock", "abnormal"])
    type: string
}

export class FindReportDto {
    employeeId: string
    @IsIn(["0", "1", "2", "3", "4", undefined])
    time: string
    page: number
}

export class FindReportFilterDto {
    employeeId: string

    @IsIn(["1", "2", "-1", undefined])
    status: any
    typeNum: string
    startTime: string
    endTime: string

    @IsIn(["0", "1", "2", "3", "4", undefined])
    time: string
    classId: string
    studentName: string
    studentNum: string
    page: number
}

export class FindAuditReportDto {
    @ApiProperty({
        required: true,
        description: '报备单id'
    })
    @IsNotEmpty()
    @IsString()
    reportId: string

    @ApiProperty({
        required: true,
        description: '报备状态'
    })
    @IsNotEmpty()
    @IsNumber()
    @IsIn([2, -1])
    status: number
    employeeId: string
    employeeName: string
    comment: string
}

export class FindAuditReportAllDto {
    @ApiProperty({
        required: true,
        description: '报备单id'
    })
    @IsNotEmpty()
    report: {
        reportId: string
        status: number
    }[]
    employeeId: string
    employeeName: string
}

export class FindExcelDto {
    employeeId: string
    employeeNum: string
    startTime: string
    endTime: string
    @IsIn(["0", "1", "2", "3", "4", undefined])
    time: string
    classId: string
}