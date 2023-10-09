import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Response } from "express";
import { map } from "rxjs";
import { CreateClockExcelDto, FindAuditReportAllDto, FindAuditReportDto, FindClockDto, FindExcelDto, FindReportDto, FindReportFilterDto } from "src/microservice/dto/epi";

@Injectable()
export class EpiEmployeeService {
    constructor(
        @Inject("EPI_SERVICE") private readonly epiService: ClientProxy
    ) { }

    // 数据分析
    async analyseClock(classId: string, time: string) {
        const pattern = { cmd: "ep_employee_analyseClock" };
        const data = { classId: classId, time: time };

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message;
            }
            ))
        return status;
    }

    // 查询当前选定的班级+时间的打卡记录
    async findClock(findClockDto: FindClockDto) {
        const pattern = { cmd: "ep_employee_findClock" };
        const data = findClockDto;

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message;
            }
            ))
        return status;
    }

    // 文件下载
    async dowClockExcel(res: Response, createClockExcelDto: CreateClockExcelDto) {
        const pattern = { cmd: "ep_employee_dowClockExcel" };
        const data = createClockExcelDto;
        this.epiService
            .send<any>(pattern, data).subscribe(meassage => {
                meassage.fileName = encodeURI(meassage.fileName);
                if (meassage && meassage !== "abnormal" && meassage.fileName && meassage.src) {
                    res.setHeader('Content-Type', 'application/octet-stream');
                    res.setHeader('Content-Disposition', `attachment; filename=${meassage.fileName.toString("iso8859-1")}`);
                    res.sendFile(meassage.src, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send(meassage);
                        }
                    })
                } else {
                    res.status(400).send(meassage);
                }
            })
    }

    // 职工获取管理的班级的信息(不包括成员信息)
    async getEmployeeClass(employeeId: string) {
        const pattern = { cmd: "ep_employee_findClass" };
        const data = { employeeId: employeeId };

        const status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message;
            }
            ))
        return status;
    }

    // ----------------------------------------------报备模块-----------------------------------------------------------
    // 查看负责的报备单总数
    async findReportSum(findReportDto: FindReportDto) {
        const pattern = { cmd: "ep_employee_findReportSum" };
        const data = findReportDto;

        const status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message;
            }
            ))
        return status;
    }

    // 查看负责的所有学生报备单
    async findReport(findReportDto: FindReportDto) {
        const pattern = { cmd: "ep_employee_findReport" };
        const data = findReportDto;

        const status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message;
            }
            ))
        return status;
    }

    // 报备类型查询
    async findReportType() {
        const pattern = { cmd: "ep_employee_findReportType" };
        const data = {};

        const status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message;
            }
            ))
        return status;
    }

    // 辅导员高级查询
    async findReportFilter(findReportFilterDto: FindReportFilterDto) {
        const pattern = { cmd: "ep_employee_findReportFilter" };
        const data = findReportFilterDto;

        const status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message;
            }
            ))
        return status;
    }

    // 辅导员单个审批
    async auditReport(findAuditReportDto: FindAuditReportDto) {
        const pattern = { cmd: "ep_employee_auditReport" };
        const data = findAuditReportDto;

        const status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message;
            }
            ))
        return status;
    }

    // 辅导员批量审批
    async auditReportAll(findAuditReportAllDto: FindAuditReportAllDto) {
        const pattern = { cmd: "ep_employee_auditReportAll" };
        const data = findAuditReportAllDto;

        const status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message;
            }
            ))
        return status;
    }

    // 辅导员执行文件数据导出
    async dowReportExcle(res: Response, findExcelDto: FindExcelDto) {
        const pattern = { cmd: "ep_employee_dowReportExcle" };
        const data = findExcelDto;
        this.epiService
            .send<any>(pattern, data).subscribe(meassage => {
                if (meassage && meassage !== "abnormal" && meassage.fileName && meassage.src) {
                    meassage.fileName = encodeURI(meassage.fileName);
                    res.setHeader('Content-Type', 'application/octet-stream');
                    res.setHeader('Content-Disposition', `attachment; filename=${meassage.fileName.toString("iso8859-1")}`);
                    res.sendFile(meassage.src, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send(meassage);
                        }
                    })
                } else {
                    res.status(400).send(meassage);
                }
            })
    }
}