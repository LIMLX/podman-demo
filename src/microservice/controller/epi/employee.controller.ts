import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import e, { Response } from 'express';
import { User } from 'src/common';
import { CreateClockExcelDto } from 'src/microservice/dto/epi';
import { EpiEmployeeService } from 'src/microservice/service/epi';

@Controller('epi/employee')
export class EpiEmployeeController {
    constructor(private readonly employeeService: EpiEmployeeService) { }

    // 数据分析
    @Get('analyseClock/class=:className/time=:time')
    async analyseClock(@Param() { className, time }: { className: string, time: string }) {
        return await this.employeeService.analyseClock(className, time)
    }

    // 获取负责的班级信息
    @Get('findClass')
    async findClass(@User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal"
        }
        return await this.employeeService.getEmployeeClass(employeeId)
    }

    // 查询当前选定的班级+时间的打卡记录
    @Get('findClock/class=:className/time=:time/type=:type')
    async findClock(@Param() { time, className, type }: { time: string, className: string, type: string }, @User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal"
        }
        return await this.employeeService.findClock(employeeId, time, className, type)
    }

    // 文件下载
    @Post("dowClockExcel")
    async dowClockExcel(@Res() res: Response, createClockExcelDto: CreateClockExcelDto, @User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal"
        }
        createClockExcelDto.employeeId = employeeId
        return await this.employeeService.dowClockExcel(res, createClockExcelDto)
    }
}