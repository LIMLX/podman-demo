import { Body, Controller, Get, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { EmployeeRole, User } from "src/common/decorators";
import { CreateEmployeeExcelDto, FindLeaveAdvancedFilterDto, ParamLeaveFilterDto, UpdateLeaveDto, UpdateLeaveManyDto } from "src/microservice/dto/leave/employee.dto";
import { LeaveEmployeeService } from "src/microservice/service/leave";
import { Response } from "express";
import { Employee, EmployeeRoleGuard } from "src/common";

@ApiTags("请假职工")
@Controller('leave/employee')
@UseGuards(EmployeeRoleGuard)
export class LeaveEmployeeController {
  constructor(private readonly employeeService: LeaveEmployeeService) { }

  // 查询职工管理的班级所有的请假单与离校单
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @ApiOperation({ summary: "职工普通查询的接口", description: "需要bearerAuth--获取职工管理班级的单" })
  @Get('/leaveAll/page=:page')
  async findLeaveAll(@User("id") employeeId: string, @Param("page") page: string) {
    if (!employeeId || employeeId === "abnormal") {
      return "abnormal";
    }
    return await this.employeeService.findLeaveAll(employeeId, +page);
  }

  // 查询详细请假单
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @ApiOperation({ summary: "点击查询详细请假单的接口", description: "获取更详细的请假单详细" })
  @Get('/leave/id=:leaveId')
  async findLeaveOne(@Param('leaveId') leaveId: string) {
    return await this.employeeService.findLeaveOne(leaveId)
  }

  // 查询详细离校单
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @ApiOperation({ summary: "点击查询详细离校单的接口", description: "获取更详细的离校单接口" })
  @Get("/leaveSchool/id=:leaveSchoolId")
  async findLeaveSchoolOne(@Param('leaveSchoolId') leaveSchoolId: string) {
    return await this.employeeService.findLeaveSchoolOne(leaveSchoolId)
  }

  // 初步过滤查询
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @ApiOperation({ summary: "低级过滤筛选查询的接口", description: "获取低级过滤后的请假单离校单信息" })
  @Get("leaveFilter/page=:page")
  async leaveFilter(@User("id") employeeId: string, @Query() paramLeaveFilterDto: ParamLeaveFilterDto, @Param('page') page: string) {
    if (!employeeId || employeeId === "abnormal") {
      return "abnormal";
    }
    paramLeaveFilterDto.page = page;
    paramLeaveFilterDto.employeeId = employeeId;
    return await this.employeeService.leaveFilter(paramLeaveFilterDto);
  }

  // 高级筛选查询
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @ApiOperation({ summary: "高级过滤筛选查询的接口", description: "获取高级过滤后的请假单离校单信息" })
  @Post("/leaveAdvancedFilter")
  async leaveAdvancedFilter(@User('id') employeeId: string, @Body() leaveFilterDto: FindLeaveAdvancedFilterDto) {
    if (!employeeId || employeeId === "abnormal") {
      return "abnormal";
    }
    return await this.employeeService.leaveAdvancedFilter(employeeId, leaveFilterDto);
  }

  // 获取职工所管理的班级
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @ApiOperation({ summary: "查询职工(辅导员)管理的接口", description: "获取职工所管理的班级" })
  @Get("/employeeClass")
  async getEmployeeClass(@User("id") employeeId: string) {
    if (!employeeId || employeeId === "abnormal") {
      return "abnormal"
    }
    return await this.employeeService.getEmployeeClass(employeeId)
  }

  // 获取职工所需处理的待处理的数量
  @ApiOperation({ summary: "获取职工所需处理的待处理的数量", description: "获取职工所需处理的待处理的数量" })
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @Get("/getPendingSum")
  async getPendingSum(@User("id") employeeId: string) {
    if (!employeeId || employeeId === "abnormal") {
      return "abnormal";
    }
    return await this.employeeService.getPendingSum(employeeId);
  }

  // 修改请假单值(审批)
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @ApiOperation({ summary: "职工(辅导员)批准的接口", description: "辅导员操作请假单接口" })
  @Patch('/leavePass')
  async auditLeave(@Body() updateLeaveDto: UpdateLeaveDto, @User('id') employeeId: string, @User("name") employeeName: string) {
    if (!employeeId || employeeId === "abnormal" || !employeeName || employeeName === "abnormal") {
      return "abnormal";
    }
    updateLeaveDto.approverId = employeeId;
    updateLeaveDto.approverName = employeeName;
    return await this.employeeService.leaveAuditOne(updateLeaveDto);
  }

  // 批量审批
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @ApiOperation({ summary: "职工(辅导员)批量批准的接口", description: "辅导员批量操作请假单接口" })
  @Patch('/leavePassMany')
  async auditLeaveMany(@Body() updateLeaveManyDto: UpdateLeaveManyDto[], @User('id') employeeId: string, @User("name") employeeName: string) {
    if (!employeeId || employeeId === "abnormal" || !employeeName || employeeName === "abnormal") {
      return "abnormal";
    }
    return await this.employeeService.auditLeaveMany(updateLeaveManyDto, employeeId, employeeName)
  }

  // Excel表下载(近返回文件路径)---利用express下载
  @EmployeeRole([{ module: Employee.Leave, level: 1 }])
  @ApiOperation({ summary: "职工(辅导员)下载excel表的接口", description: "辅导员下载excel文件" })
  @Post("/dowExcel")
  async dowExcel(@Res() res: Response, @User("id") employeeId: string, @User("num") employeeNum: string, @Body() createEmployeeExcelDto: CreateEmployeeExcelDto) {
    if (!employeeId || employeeId === "abnormal" || !employeeNum || employeeNum === "abnormal") {
      return "abnormal";
    }
    createEmployeeExcelDto.employeeId = employeeId;
    createEmployeeExcelDto.employeeNum = employeeNum;
    return await this.employeeService.dowExcel(res, createEmployeeExcelDto);
  }
}