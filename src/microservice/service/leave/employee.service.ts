import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateEmployeeExcelDto, FindLeaveAdvancedFilterDto, ParamLeaveFilterDto, UpdateLeaveDto, UpdateLeaveManyDto } from "src/microservice/dto/leave/employee.dto";

@Injectable()
export class LeaveEmployeeService{
    constructor(
        @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
    ){}  
    // 查询职工管理的班级所有的请假单与离校单
    async findLeaveAll(employeeId : string, page: number) {
        const pattern = { cmd: "employee_leaveAll" };
        const data = {employeeId:employeeId,page:page}
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 查询详细请假单
    async findLeaveOne(id: number,leaveUUID: string) {
        const pattern = { cmd: "employee_leaveOne" };
        const data = {id:id,leaveUUID:leaveUUID}
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 查询详细离校单
    async findLeaveSchoolOne(id: number, leaveUUID: string) {
        const pattern = { cmd: "employee_leaveSchoolOne" };
        const data = {id:id,leaveUUID:leaveUUID}
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 初步过滤查询
    async leaveFilter(employeeId: string, paramLeaveFilterDto:ParamLeaveFilterDto){
        const pattern = { cmd: "employee_leaveFilter" };
        paramLeaveFilterDto.employeeId = employeeId
        const data = paramLeaveFilterDto
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 高级筛选查询
    async leaveAdvancedFilter (employeeId:string,leaveFilterDto : FindLeaveAdvancedFilterDto) {
        const pattern = { cmd: "employee_leaveAdvancedFilter" };
        leaveFilterDto.employeeId = employeeId
        const data = leaveFilterDto
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 获取职工所管理的班级
    async getEmployeeClass ( employeeId : string) {
        const pattern = { cmd: "employee_classAll" };
        const data = {employeeId:employeeId}
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 修改请假单值(审批)
    async leaveAuditOne (updateLeaveDto: UpdateLeaveDto) {
        const pattern = { cmd: "employee_leavePass" };
        const data = updateLeaveDto
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 批量审批
    async auditLeaveMany (updateLeaveManyDto: UpdateLeaveManyDto) {
        const pattern = { cmd: "employee_leavePassMany" };
        const data = updateLeaveManyDto
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // Excel表下载(近返回文件路径)
    async dowExcel (employeeId: string,createEmployeeExcelDto : CreateEmployeeExcelDto) {
        const pattern = { cmd: "employee_dowExcel" };
        createEmployeeExcelDto.employeeId = employeeId
        const data = createEmployeeExcelDto
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
}