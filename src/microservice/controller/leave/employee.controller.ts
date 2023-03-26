import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/decorators";
import { CreateEmployeeExcelDto, FindLeaveAdvancedFilterDto, ParamLeaveFilterDto, UpdateLeaveDto, UpdateLeaveManyDto } from "src/microservice/dto/leave/employee.dto";
import { LeaveEmployeeService } from "src/microservice/service/leave";

@ApiTags("leave")
@Controller('leave/employee')
export class LeaveEmployeeController {
    constructor(private readonly employeeService: LeaveEmployeeService) {}

    // 查询职工管理的班级所有的请假单与离校单
    @ApiOperation({summary:"职工普通查询的接口", description:"需要bearerAuth--获取职工管理班级的单"})
    @Get('/leaveAll/page=:page')
    async findLeaveAll(@User("id") employeeId : string, @Param("page") page: string) {
      if(employeeId === "abnormal") {
        return "abnormal"
      }
      return await this.employeeService.findLeaveAll(employeeId,+page)
    }
  
    // 查询详细请假单
    @ApiOperation({summary:"点击查询详细请假单的接口", description:"获取更详细的请假单详细"})
    @Get('/leave/id=:id')
    async findLeaveOne(@Param('id') id: string,@Body('leaveUUID') leaveUUID: string) {
      return await this.employeeService.findLeaveOne(+id,leaveUUID)
    }
  
    // 查询详细离校单
    @ApiOperation({summary:"点击查询详细离校单的接口", description:"获取更详细的离校单接口"})
    @Get("/leaveSchool/id=:id")
    async findLeaveSchoolOne(@Param('id') id: string,@Body('leaveUUID') leaveUUID: string) {
      return await this.employeeService.findLeaveSchoolOne(+id,leaveUUID)
    }
  
    // 初步过滤查询
    @ApiOperation({summary:"低级过滤筛选查询的接口", description:"获取低级过滤后的请假单离校单信息"})
    @Get("/leaveFilter/employeeId=:id/typeNum=:typeNum/time=:time/page=:page")
    async leaveFilter(@User("id") employeeId: string,@Param() paramLeaveFilterDto:ParamLeaveFilterDto){
      if(employeeId === "abnormal") {
        return "abnormal"
      }
      return await this.employeeService.leaveFilter(employeeId,paramLeaveFilterDto)
    }
  
    // 高级筛选查询
    @ApiOperation({summary:"高级过滤筛选查询的接口", description:"获取高级过滤后的请假单离校单信息"})
    @Post("/leaveAdvancedFilter")
    async leaveAdvancedFilter (@User('id') employeeId: string,@Body() leaveFilterDto : FindLeaveAdvancedFilterDto) {
      if(employeeId === "abnormal") {
        return "abnormal"
      }
      return await this.employeeService.leaveAdvancedFilter(employeeId,leaveFilterDto)
    }
  
    // 获取职工所管理的班级
    @ApiOperation({summary:"查询职工(辅导员)管理的接口", description:"获取职工所管理的班级"})
    @Get("/employeeClass")
    async getEmployeeClass (@User("id") employeeId: string) {
      if(employeeId === "abnormal") {
        return "abnormal"
      }
      return await this.employeeService.getEmployeeClass(employeeId)
    }
  
    // 修改请假单值(审批)
    @ApiOperation({summary:"职工(辅导员)批准的接口", description:"辅导员操作请假单接口"})
    @Patch('/leavePass')
    async auditLeave (@Body() updateLeaveDto: UpdateLeaveDto) {
      return await this.employeeService.leaveAuditOne(updateLeaveDto)
    }
  
    // 批量审批
    @ApiOperation({summary:"职工(辅导员)批量批准的接口", description:"辅导员批量操作请假单接口"})
    @Patch('/leavePassMany')
    async auditLeaveMany (@Body() updateLeaveManyDto: UpdateLeaveManyDto) {
      return await this.employeeService.auditLeaveMany(updateLeaveManyDto)
    }
  
    // Excel表下载(近返回文件路径)
    @ApiOperation({summary:"职工(辅导员)下载excel表的接口", description:"辅导员下载excel文件"})
    @Post("/dowExcel")
    async dowExcel (@User("id") employeeId: string,@Body() createEmployeeExcelDto : CreateEmployeeExcelDto) {
      if(employeeId === "abnormal") {
        return "abnormal"
      }
      return await this.employeeService.dowExcel(employeeId,createEmployeeExcelDto)
    }
}