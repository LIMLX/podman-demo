import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends CreateEmployeeDto {}

export class UpdateLeaveDto {
    leaveId:number
    leaveUUID: string
    statusId: string
    approverId : string
    remark : string
}

export class UpdateLeaveManyDto {
    statusId: string
    leaveUUID: string[]
}