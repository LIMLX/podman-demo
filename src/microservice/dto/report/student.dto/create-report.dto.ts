export class CreateReportDto {
    userId: string
    typeNum: string
    startTime: string
    endTime: string
    phone: string
    province: string
    city: string
    destination: string
    reason: string

    file: {
        fileSite: string
    }[]
}
