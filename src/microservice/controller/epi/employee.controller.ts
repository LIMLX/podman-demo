import { Controller, Get, Post, Body, Param, Res, Patch, Query } from '@nestjs/common';
import e, { Response } from 'express';
import { User } from 'src/common';
import { CreateClockExcelDto, FindAuditReportAllDto, FindAuditReportDto, FindClockDto, FindExcelDto, FindReportDto, FindReportFilterDto } from 'src/microservice/dto/epi';
import { EpiEmployeeService } from 'src/microservice/service/epi';

@Controller('epi/employee')
export class EpiEmployeeController {
    constructor(private readonly employeeService: EpiEmployeeService) { }
    // ----------------------------------------------公共模块-----------------------------------------------------------
    // 获取负责的班级信息
    @Get('findClass')
    async findClass(@User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal";
        }
        return await this.employeeService.getEmployeeClass(employeeId);
    }

    // ----------------------------------------------打卡模块-----------------------------------------------------------
    // 数据分析
    @Get('analyseClock/class=:classId/time=:time')
    async analyseClock(@Param() { classId, time }: { classId: string, time: string }) {
        return await this.employeeService.analyseClock(classId, time);
    }

    // 查询当前选定的班级+时间的打卡记录
    @Get('findClock/class=:classId/time=:time/type=:type')
    async findClock(@Param() findClockDto: FindClockDto, @User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal";
        }
        findClockDto.employeeId = employeeId;
        return await this.employeeService.findClock(findClockDto);
    }

    // 文件下载
    @Post("dowClockExcel")
    async dowClockExcel(@Res() res: Response, @Body() createClockExcelDto: CreateClockExcelDto, @User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            res.status(400).send("abnormal");
            return;
        }
        createClockExcelDto.employeeId = employeeId;
        return await this.employeeService.dowClockExcel(res, createClockExcelDto);
    }

    // ----------------------------------------------报备模块-----------------------------------------------------------
    // 查看负责的报备单总数
    @Get("findReportSum")
    async findReportSum(@User('id') employeeId: string, @Query() findReportDto: FindReportDto) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal";
        }
        findReportDto.employeeId = employeeId;
        return await this.employeeService.findReportSum(findReportDto);
    }

    // 查看负责的所有学生报备单
    @Get("findReport/page=:page")
    async findReport(@Query() findReportDto: FindReportDto, @Param("page") page: any, @User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal";
        }
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findReportDto.page = Number(page);
        findReportDto.employeeId = employeeId;
        return await this.employeeService.findReport(findReportDto);
    }

    // 报备类型查询
    @Get("findReportType")
    async findReportType() {
        return await this.employeeService.findReportType();
    }

    // 辅导员高级查询
    @Get("findReportFilter/page=:page")
    async findReportFilter(@Query() findReportFilterDto: FindReportFilterDto, @Param("page") page: any, @User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal";
        }
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findReportFilterDto.page = Number(page);
        findReportFilterDto.employeeId = employeeId;
        if (findReportFilterDto.status) {
            findReportFilterDto.status = Number(findReportFilterDto.status);
        }
        return await this.employeeService.findReportFilter(findReportFilterDto);
    }

    // 辅导员单个审批
    @Patch("auditReport")
    async auditReport(@Body() findAuditReportDto: FindAuditReportDto, @User('id') employeeId: string, @User('name') employeeName: string) {
        if (!employeeId || employeeId === "abnormal" || !employeeName || employeeName === "abnormal") {
            return "abnormal";
        }
        findAuditReportDto.employeeId = employeeId;
        findAuditReportDto.employeeName = employeeName;
        return await this.employeeService.auditReport(findAuditReportDto);
    }

    // 辅导员批量审批
    @Patch("auditReportAll")
    async auditReportAll(@Body() findAuditReportAllDto: FindAuditReportAllDto, @User('id') employeeId: string, @User('name') employeeName: string) {
        if (!employeeId || employeeId === "abnormal" || !employeeName || employeeName === "abnormal") {
            return "abnormal";
        }
        findAuditReportAllDto.employeeId = employeeId;
        findAuditReportAllDto.employeeName = employeeName
        return await this.employeeService.auditReportAll(findAuditReportAllDto);
    }

    // 辅导员执行文件数据导出
    @Post("dowReportExcle")
    async dowReportExcle(@Res() res: Response, @Body() findExcelDto: FindExcelDto, @User('id') employeeId: string, @User('num') employeeNum: string) {
        if (!employeeId || employeeId === "abnormal" || !employeeNum || employeeNum === "abnormal") {
            return "abnormal";
        }
        findExcelDto.employeeId = employeeId;
        findExcelDto.employeeNum = employeeNum;
        return await this.employeeService.dowReportExcle(res, findExcelDto);
    }
}