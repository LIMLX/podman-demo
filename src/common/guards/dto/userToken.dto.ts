export class EmployeeData {
    employee?: {
        employeeId?: string
        employeeName?: string
        employeeNum?: string
        employeeSex?: string
    }

    module?: {
        moduleName?: string
        moduleNum?: string
        operationName?: string
        operationNum?: string
        operationLevel?: number
    }[]
}

export class StudentData {
    student?: {
        studentId?: string
        studentName?: string
        studentNum?: string
        studentSex?: string
    }

    module?: {
        moduleName?: string
        moduleNum?: string
        operationName?: string
        operationNum?: string
        operationLevel?: number
    }[]
}

export class RepairsAdminDto {
    repairsAdmin: {
        adminId: string
        adminName: string
        adminNum: string
    }
}