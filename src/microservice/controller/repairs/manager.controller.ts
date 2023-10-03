import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common';
import { FindRepairsDto } from 'src/microservice/dto/repairs/manager.dto';
import { RepairsManagerService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@Controller('repairs/manager')
export class RepairsManagerController {
    constructor(private readonly managerService: RepairsManagerService) { }

    // 验证是否为楼栋管理员
    @Get("managerLogin")
    async managerLogin(@User("num") managerNum: string) {
        if (!managerNum || managerNum === "abnormal") {
            return "abnormal";
        }
        return await this.managerService.managerLogin(managerNum);
    }

    // 获取类型颜色
    @Get("findTypeColour")
    async findTypeColour() {
        return await this.managerService.findTypeColour();
    }

    // 查询维修单数据
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
    @Get("findRepairsOne/id=:repairsId")
    async findRepairsOne(@Param("repairsId") repairsId: string) {
        return await this.managerService.findRepairsOne(repairsId);
    }

    // 查询报修单--状态日志
    @Get("findRepairsStatusLog/id=:repairId")
    async findRepairsStatusLog(@Param("repairId") repairId: string) {
        return await this.managerService.findRepairsStatusLog(repairId);
    }
}
