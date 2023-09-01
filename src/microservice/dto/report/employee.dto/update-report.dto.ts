import { CreateEmployeeDto } from './create-report.dto';

export class UpdateEmployeeDto extends CreateEmployeeDto { }

export class AuditReportDto {
    reportId: string
    statusNum: string
    employeeId: string
    comment: string
}

export class AuditReportAllDto {
    reportId: string[]
    statusNum: string
    employeeId: string
}
