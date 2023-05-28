import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends CreateEmployeeDto { }

export class UpdateLeaveDto {
    id: string
    statusLevel: string
    approverId: string
    remark: string
    type: string
}

export class UpdateLeaveManyDto {
    statusLevel: string
    id: string
    type: string
}