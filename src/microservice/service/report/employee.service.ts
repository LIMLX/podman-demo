import { Inject, Injectable, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AuditReportAllDto, AuditReportDto, FindExcelDto, ReturnReportDto, ReturnReportOneDto } from 'src/microservice/dto/report/employee.dto';
import type { Response } from 'express'
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class EmployeeService {
    constructor(
        @Inject("REPORT_SERVICE") private readonly reportService: ClientProxy
    ) { }

    // 查看负责的所有学生报备单
    async findReport(page: number, time: string, employeeId: string) {
        const pattern = { cmd: "report_employee_findReportAll" };
        const data = { time: time, employeeId: employeeId, page: page }
        const reportData = this.reportService.send<any>(pattern, data)
            .pipe(map((message: any) => { return message }));
        return reportData;
    }

    // 查询详细报备单
    async findReportOne(id: string) {
        const pattern = { cmd: "report_employee_findReport" };
        const data = id;
        const reportData = this.reportService.send<any>(pattern, data)
            .pipe(map((message: any) => { return message }));
        return reportData;
    }

    // 辅导员单个审批
    async auditReport(auditReportDto: AuditReportDto) {
        const pattern = { cmd: "report_employee_auditReport" };
        const data = auditReportDto;
        const status = this.reportService.send<any>(pattern, data)
            .pipe(map((message: any) => { return message }));
        return status;
    }

    // 辅导员批量审批
    async auditReportAll(auditReportAllDto: AuditReportAllDto) {
        const pattern = { cmd: "report_employee_auditReportAll" };
        const data = auditReportAllDto;
        const status = this.reportService.send<any>(pattern, data)
            .pipe(map((message: any) => { return message }));
        return status;
    }

    // 状态查询
    async findStatus() {
        const pattern = { cmd: "report_employee_findStatus" };
        const data = {};
        const statusData = this.reportService.send<any>(pattern, data)
            .pipe(map((message: any) => { return message }));
        return statusData;
    }

    // 类型查询
    async findType() {
        const pattern = { cmd: "report_employee_findType" };
        const data = {};
        const typeData = this.reportService.send<any>(pattern, data)
            .pipe(map((message: any) => { return message }));
        return typeData;
    }

    // 负责班级查询
    async findClass(id: string) {
        const pattern = { cmd: "report_employee_findClass" };
        const data = id;
        const classData = this.reportService.send<any>(pattern, data)
            .pipe(map((message: any) => { return message }));
        return classData;
    }

    // 辅导员高级查询
    async findReportFilter(page: number, filterData: { employeeId: string, statusNum: string, typeNum: string, startTime: string, endTime: string, time: string, classId: string, studentName: string, studentNum: string }) {
        const pattern = { cmd: "report_employee_findReportFilter" };
        const data = { page: page, filterData: filterData };
        const reportData = this.reportService.send<any>(pattern, data)
            .pipe(map((message: any) => { return message }));
        return reportData;
    }

    // 辅导员导出预览
    async findExcel(findExcelDto: FindExcelDto) {
        const pattern = { cmd: "report_employee_findExcel" };
        const data = findExcelDto;
        const excleData = this.reportService.send<any>(pattern, data)
            .pipe(map((message: any) => { return message }));
        return excleData;
    }

    // 辅导员下载指定文件
    async dowExcle(file: string, @Res() res: Response) {
        const pattern = { cmd: "report_employee_dowExcle" };
        const data = file;
        try {
            const status = this.reportService.send<any>(pattern, data)
                .pipe(map((message: any) => {
                    if (message !== "Unknown resource") {
                        res.download(message, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        })
                    } else {
                        res.status(400).send(message)
                    }
                }));
            return status
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}
