import { Controller, Get, Post, Body, Param, Query, Patch, Delete, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Admin, AdminData } from 'src/common';
import { AuditLeaveDto, CreateSchoolTypeDto, CreateStatusDto, CreateTransportationDto, DelLeaveBatchDto, DelLeaveDto, DowLeaveExcelDto, FindLeaveDto, UpdateLeaveDto, UpdateLeaveSchoolDto, UpdateReturnSchoolDto } from 'src/microservice/dto/leave/admin.dto';
import { LeaveAdminService } from "src/microservice/service/leave";
import { Response } from "express";

@Controller('leave/admin')
export class LeaveAdminController {
    constructor(private readonly adminService: LeaveAdminService) { }
    // 获取全部请假类型---离校---返校的数量
    @ApiOperation({ summary: "获取全部请假类型---离校---返校的数量", description: "获取全部请假类型---离校---返校的数量" })
    @Get("findLeaveSum")
    async findLeaveSum() {
        return await this.adminService.findLeaveSum();
    }

    // 获取全部请假类型---离校---返校的昨天趋势
    @Get("findLeaveTendency")
    async findLeaveTendency() {
        return await this.adminService.findLeaveTendency();
    }

    // 获取病假的数量
    @Get("findSickLeaveSum")
    async findSickLeaveSum() {
        return await this.adminService.findSickLeaveSum();
    }

    // 获取病假的昨日趋势
    @Get("findSickLeaveTendency")
    async findSickLeaveTendency() {
        return await this.adminService.findSickLeaveTendency();
    }

    // 获取事假的数量
    @Get("findMatterLeaveSum")
    async findMatterLeaveSum() {
        return await this.adminService.findMatterLeaveSum();
    }

    // 获取事假的昨日趋势
    @Get("findMatterLeaveTendency")
    async findMatterLeaveTendency() {
        return await this.adminService.findMatterLeaveTendency();
    }

    // 获取离校的数量
    @Get("findSchoolLeaveSum")
    async findSchoolLeaveSum() {
        return await this.adminService.findSchoolLeaveSum();
    }

    // 获取离校的昨日趋势
    @Get("findSchoolLeaveTendency")
    async findSchoolLeaveTendency() {
        return await this.adminService.findSchoolLeaveTendency();
    }

    // 获取返校的数量
    @Get("findReturnLeaveSum")
    async findReturnLeaveSum() {
        return await this.adminService.findReturnLeaveSum();
    }

    // 获取返校的昨日趋势
    @Get("findReturnLeaveTendency")
    async findReturnLeaveTendency() {
        return await this.adminService.findReturnLeaveTendency();
    }

    // 查询全部假条
    @Post("findLeave")
    async findLeave(@Body() findLeaveDto: FindLeaveDto) {
        return await this.adminService.findLeave(findLeaveDto);
    }

    // 查询详情假条
    @Get("findLeaveOne/id=:leaveId")
    async findLeaveOne(@Param("leaveId") id: string, @Query("type") type: string) {
        return await this.adminService.findLeaveOne(id, type);
    }

    // 创建状态
    @Post("createStatus")
    async createStatus(@Body() createStatus: CreateStatusDto) {
        return await this.adminService.createStatus(createStatus);
    }

    // 查询所有状态
    @Get("findStatus")
    async findStatus() {
        return await this.adminService.findStatus();
    }

    // 创建离校类型
    @Post("createSchoolType")
    async createSchoolType(@Body() createSchoolType: CreateSchoolTypeDto) {
        return await this.adminService.createSchoolType(createSchoolType);
    }

    // 查询所有离校类型
    @Get("findSchoolType")
    async findSchoolType() {
        return await this.adminService.findSchoolType();
    }

    // 创建交通方式
    @Post("createTransportation")
    async createTransportation(@Body() createTransportation: CreateTransportationDto) {
        return await this.adminService.createTransportation(createTransportation);
    }

    // 查询所有交通方式
    @Get("findTransportation")
    async findTransportation() {
        return await this.adminService.findTransportation();
    }

    // 单个审批操作
    @Patch("auditLeave")
    async auditLeave(@Body() { id, type, status }: AuditLeaveDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.auditLeave(id, type, status, adminId, adminName);
    }

    // 批量审批操作
    @Patch("auditLeaveBatch")
    async auditLeaveBatch(@Body() { leave, status }: { leave: { id: string, type: string }[], status: number }, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.auditLeaveBatch(leave, status, adminId, adminName);
    }

    // 单个删除操作
    @Delete("delLeave")
    async delLeave(@Body() { id, type }: DelLeaveDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delLeave(id, type, adminId, adminName);
    }

    // 批量删除操作
    @Delete("delLeaveBatch")
    async delLeaveBatch(@Body() data: DelLeaveBatchDto[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delLeaveBatch(data, adminId, adminName);
    }

    // 请假单编辑操作
    @Patch("updateLeave")
    async updateLeave(@Body() updateLeaveDto: UpdateLeaveDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.updateLeave(updateLeaveDto, adminId, adminName);
    }

    // 离校单编辑操作
    @Patch("updateLeaveSchool")
    async updateLeaveSchool(@Body() updateLeaveSchoolDto: UpdateLeaveSchoolDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.updateLeaveSchool(updateLeaveSchoolDto, adminId, adminName);
    }

    // 返校单编辑操作
    @Patch("updateReturnSchool")
    async updateReturnSchool(@Body() updateReturnSchoolDto: UpdateReturnSchoolDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.updateReturnSchool(updateReturnSchoolDto, adminId, adminName);
    }

    // 获取辅导员信息---筛选(学院id+班级id)
    @Get("findFilterAssistant")
    async findFilterAssistant(@Query("campusId") campusId: string, @Query("classId") classId: string) {
        return await this.adminService.findFilterAssistant(campusId, classId);
    }

    // 获取学院数据
    @Get("findCampus")
    async findCampus() {
        return await this.adminService.findCampus();
    }

    // 获取根据学院获取班级
    @Get("findClass/campusId=:campusId")
    async findClass(@Param("campusId") campusId: string) {
        return await this.adminService.findClass(campusId);
    }

    // 下载excel文件
    @Post("dowLeaveExcel")
    async dowLeaveExcel(@Res() res: Response, @Body() dowLeaveExcelDto: DowLeaveExcelDto, @AdminData("num") adminNum: string) {
        if (!adminNum || adminNum === "abnormal") {
            return "abnormal";
        }
        dowLeaveExcelDto.adminNum = adminNum;
        return await this.adminService.dowLeaveExcel(res, dowLeaveExcelDto);
    }
}