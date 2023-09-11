import { IsIn } from "class-validator"

export class CreateEmployeeDto { }

export class CreateEmployeeExcelDto {
    employeeId: string
    employeeNum: string
    startTime: Date
    endTime: Date
    @IsIn(['Today', 'Week', 'Month', 'HalfYear', 'Year', undefined])
    Time: string
    classId: string
}