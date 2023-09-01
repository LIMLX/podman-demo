import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { EmployeeService } from 'src/microservice/service/report';
import { AuditReportAllDto, AuditReportDto, FindExcelDto } from 'src/microservice/dto/report/employee.dto';
import type { Response } from 'express'

@Controller('report/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  // 查看负责的所有学生报备单
  @Get("findReportAll/employeeId=:employeeId/page=:page")
  async findReport(@Param() { page, employeeId }: { page: number, employeeId: string }, @Query("time") time: string) {
    return await this.employeeService.findReport(page, time, employeeId);
  }

  // 查询详细报备单
  @Get("findReport/id=:id")
  async findReportOne(@Param("id") id: string) {
    return await this.employeeService.findReportOne(id);
  }

  // 辅导员单个审批
  @Post("auditReport")
  async auditReport(@Body() auditReportDto: AuditReportDto) {
    return await this.employeeService.auditReport(auditReportDto);
  }

  // 辅导员批量审批
  @Post("auditReportAll")
  async auditReportAll(@Body() auditReportAllDto: AuditReportAllDto) {
    return await this.employeeService.auditReportAll(auditReportAllDto);
  }

  // 状态查询
  @Get("findStatus")
  async findStatus() {
    return await this.employeeService.findStatus();
  }

  // 类型查询
  @Get("findType")
  async findType() {
    return await this.employeeService.findType();
  }

  // 负责班级查询
  @Get("findClass/id=:id")
  async findClass(@Param("id") id: string) {
    return await this.employeeService.findClass(id);
  }

  // 辅导员高级查询
  @Get("findReportFilter/page=:page")
  async findReportFilter(@Param("page") page: number, @Query() filterData: { employeeId: string, statusNum: string, typeNum: string, startTime: string, endTime: string, time: string, classId: string, studentName: string, studentNum: string }) {
    return await this.employeeService.findReportFilter(page, filterData);
  }

  // 辅导员导出预览
  @Post("findExcel")
  async findExcel(@Body() findExcelDto: FindExcelDto) {
    return await this.employeeService.findExcel(findExcelDto);
  }

  // 辅导员下载指定文件
  @Get("dowExcle/file=:file")
  async dowExcle(@Param("file") file: string, @Res() res: Response) {
    return await this.employeeService.dowExcle(file, res);
  }
}
