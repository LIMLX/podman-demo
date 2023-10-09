import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class CreateEmployeeDto { }
export class CreateClockExcelDto {
    employeeId: string

    @ApiProperty({
        required: true,
        description: '起始时间'
    })

    @IsNotEmpty()
    @IsDateString()
    startTime: string


    @ApiProperty({
        required: true,
        description: '结束时间'
    })

    @IsNotEmpty()
    @IsDateString()
    endTime: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    className: string
}