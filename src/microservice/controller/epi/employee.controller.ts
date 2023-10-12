import { Controller, Get, Post, Body, Param, Res, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import e, { Response } from 'express';
import { Employee, EmployeeRole, EmployeeRoleGuard, User } from 'src/common';
import { CreateClockExcelDto, FindAuditReportAllDto, FindAuditReportDto, FindClockDto, FindExcelDto, FindReportDto, FindReportFilterDto } from 'src/microservice/dto/epi';
import { EpiEmployeeService } from 'src/microservice/service/epi';

@ApiTags('防疫职工')
@Controller('epi/employee')
@UseGuards(EmployeeRoleGuard)
export class EpiEmployeeController {
    constructor(private readonly employeeService: EpiEmployeeService) { }
    // ----------------------------------------------公共模块-----------------------------------------------------------
    // 获取负责的班级信息
    @ApiOperation({ summary: "获取负责的班级信息", description: "获取负责的班级信息" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
    @Get('findClass')
    async findClass(@User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal";
        }
        return await this.employeeService.getEmployeeClass(employeeId);
    }

    // ----------------------------------------------打卡模块-----------------------------------------------------------
    // 数据分析
    @ApiOperation({ summary: "数据分析", description: "数据分析" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
    @Get('analyseClock/class=:classId/time=:time')
    async analyseClock(@Param() { classId, time }: { classId: string, time: string }) {
        return await this.employeeService.analyseClock(classId, time);
    }

    // 查询当前选定的班级+时间的打卡记录
    @ApiOperation({ summary: "查询当前选定的班级+时间的打卡记录", description: "查询当前选定的班级+时间的打卡记录" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
    @Get('findClock/class=:classId/time=:time/type=:type')
    async findClock(@Param() findClockDto: FindClockDto, @User('id') employeeId: string) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal";
        }
        findClockDto.employeeId = employeeId;
        return await this.employeeService.findClock(findClockDto);
    }

    // 文件下载
    @ApiOperation({ summary: "文件下载", description: "文件下载" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
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
    @ApiOperation({ summary: "查看负责的报备单总数", description: "查看负责的报备单总数" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
    @Get("findReportSum")
    async findReportSum(@User('id') employeeId: string, @Query() findReportDto: FindReportDto) {
        if (!employeeId || employeeId === "abnormal") {
            return "abnormal";
        }
        findReportDto.employeeId = employeeId;
        return await this.employeeService.findReportSum(findReportDto);
    }

    // 查看负责的所有学生报备单
    @ApiOperation({ summary: "查看负责的所有学生报备单", description: "查看负责的所有学生报备单" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
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
    @ApiOperation({ summary: "报备类型查询", description: "报备类型查询" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
    @Get("findReportType")
    async findReportType() {
        return await this.employeeService.findReportType();
    }

    // 辅导员高级查询
    @ApiOperation({ summary: "辅导员高级查询", description: "辅导员高级查询" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
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
    @ApiOperation({ summary: "辅导员单个审批", description: "辅导员单个审批" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
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
    @ApiOperation({ summary: "辅导员批量审批", description: "辅导员批量审批" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
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
    @ApiOperation({ summary: "辅导员执行文件数据导出", description: "辅导员执行文件数据导出" })
    @EmployeeRole([{ module: Employee.Epi, level: 1 }])
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