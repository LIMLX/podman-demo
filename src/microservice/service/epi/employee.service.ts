import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Response } from "express";
import { map } from "rxjs";
import { CreateClockExcelDto } from "src/microservice/dto/epi";
import * as fs from 'fs';

@Injectable()
export class EpiEmployeeService {
    constructor(
        @Inject("EPI_SERVICE") private readonly epiService: ClientProxy
    ) { }

    // 数据分析
    async analyseClock(className: string, time: string) {
        const pattern = { cmd: "employee-analyse-clock" };
        const data = { className: className, time: time }

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }

    // 查询当前选定的班级+时间的打卡记录
    async findClock(employeeId: string, time: string, className: string, type: string) {
        const pattern = { cmd: "employee-find-class" };
        const data = { employeeId: employeeId, time: time, className: className, type: type }

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }

    // 文件下载
    async dowClockExcel(res: Response, createClockExcelDto: CreateClockExcelDto) {
        const pattern = { cmd: "employee-dow-excel" };
        const data = createClockExcelDto

        this.epiService
            .send<any>(pattern, data).subscribe(meassage => {
                if (meassage && meassage !== "abnormal") {
                    res.setHeader('Content-Type', 'application/octet-stream');
                    res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');
                    res.sendFile(meassage, (err) => {
                        if (err) {
                            console.log(err)
                            res.status(400).send(meassage)
                        }
                    })
                } else {
                    res.status(400).send(meassage)
                }
            })
    }

    // 职工获取管理的班级的信息(不包括成员信息)
    async getEmployeeClass(employeeId: string) {
        const pattern = { cmd: "employee-find-class" };
        const data = { employeeId: employeeId }

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }
}