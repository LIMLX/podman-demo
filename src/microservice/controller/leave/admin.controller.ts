import { Controller, Get, Post, Body, Param, Query, Patch, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuditLeaveDto, DelLeaveBatchDto, DelLeaveDto, FindLeaveDto } from 'src/microservice/dto/leave/admin.dto';
import { LeaveAdminService } from "src/microservice/service/leave";

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

    // 单个审批操作
    @Patch("auditLeave")
    async auditLeave({ id, type, status }: AuditLeaveDto) {
        return await this.adminService.auditLeave(id, type, status);
    }

    // 批量审批操作
    @Patch("auditLeaveBatch")
    async auditLeaveBatch({ leave, status }: { leave: { id: string, type: string }[], status: number }) {
        return await this.adminService.auditLeaveBatch(leave, status);
    }

    // 单个删除操作
    @Delete("delLeave")
    async delLeave({ id, type }: DelLeaveDto) {
        return await this.adminService.delLeave(id, type);
    }

    // 批量删除操作
    @Delete("delLeaveBatch")
    async delLeaveBatch(data: DelLeaveBatchDto[]) {
        return await this.adminService.delLeaveBatch(data);
    }
}