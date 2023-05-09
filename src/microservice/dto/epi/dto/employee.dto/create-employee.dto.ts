import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class CreateEmployeeDto { }
export class CreateClockExcelDto {
    employeeId: string

    @ApiProperty({
        required: true,
        description: '起始时间'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsDateString()
    startTime: string


    @ApiProperty({
        required: true,
        description: '结束时间'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsDateString()
    endTime: string


    @ApiProperty({
        required: false,
        description: '班级名称'
    })
    className: string
}