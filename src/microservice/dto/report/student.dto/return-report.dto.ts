export class ReturnReportDto {
    reportId: string
    typeName: string
    statusName: string
    startTime: Date
    submitTime: Date
    comment: boolean
    file: boolean
}

export class ReturnReportOneDto {
    reportId: string
    studentName: string
    typeName: string
    statusName: string
    startTime: Date
    endTime: Date
    submitTime: Date
    reason: string

    files?: string[]
    employeeName?: string
    comment?: string
    redactTime?: Date
    approvalTime?: Date
}