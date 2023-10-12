import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Employee, EmployeeRole, EmployeeRoleGuard, User } from 'src/common';
import { FindRepairsDto } from 'src/microservice/dto/repairs/manager.dto';
import { RepairsManagerService } from 'src/microservice/service/repairs';

@ApiTags('报修楼栋管理员')
@UseGuards(EmployeeRoleGuard)
@Controller('repairs/manager')
export class RepairsManagerController {
    constructor(private readonly managerService: RepairsManagerService) { }

    // 验证是否为楼栋管理员
    @ApiOperation({ summary: "验证是否为楼栋管理员", description: "验证是否为楼栋管理员" })
    @EmployeeRole([{ module: Employee.History, level: 1 }])
    @Get("managerLogin")
    async managerLogin(@User("num") managerNum: string) {
        if (!managerNum || managerNum === "abnormal") {
            return "abnormal";
        }
        return await this.managerService.managerLogin(managerNum);
    }

    // 获取类型颜色
    @ApiOperation({ summary: "获取类型颜色", description: "获取类型颜色" })
    @EmployeeRole([{ module: Employee.History, level: 2 }])
    @Get("findTypeColour")
    async findTypeColour() {
        return await this.managerService.findTypeColour();
    }

    // 查询维修单数据
    @ApiOperation({ summary: "查询维修单数据", description: "查询维修单数据" })
    @EmployeeRole([{ module: Employee.History, level: 2 }])
    @Get("findRepairs/page=:page")
    async findRepairs(@Param("page") page: string, @Query() findRepairsDto: FindRepairsDto, @User("num") managerNum: string) {
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findRepairsDto.page = Number(page);
        if (!managerNum || managerNum === "abnormal") {
            return "abnormal";
        }
        findRepairsDto.managerNum = managerNum;
        if (findRepairsDto.status === 0 || findRepairsDto.status === "0" || findRepairsDto.status) {
            findRepairsDto.status = Number(findRepairsDto.status);
        }
        return await this.managerService.findRepairs(findRepairsDto);
    }

    // 查询详细维修单
    @ApiOperation({ summary: "查询详细维修单", description: "查询详细维修单" })
    @EmployeeRole([{ module: Employee.History, level: 2 }])
    @Get("findRepairsOne/id=:repairsId")
    async findRepairsOne(@Param("repairsId") repairsId: string) {
        return await this.managerService.findRepairsOne(repairsId);
    }

    // 查询报修单--状态日志
    @ApiOperation({ summary: "查询报修单--状态日志", description: "查询报修单--状态日志" })
    @EmployeeRole([{ module: Employee.History, level: 2 }])
    @Get("findRepairsStatusLog/id=:repairId")
    async findRepairsStatusLog(@Param("repairId") repairId: string) {
        return await this.managerService.findRepairsStatusLog(repairId);
    }
}
