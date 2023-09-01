import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends CreateReportDto {
    reportId: string
    delFile: string[]
}
