import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends CreateEmployeeDto {
    employeePsw: string
    employeeId: string
}

export class UpdateEmployeePswDto {
    employeeId: string
    employeeNum: string
    employeePsw: string
}