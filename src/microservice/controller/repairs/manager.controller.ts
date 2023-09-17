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
    async managerLogin(@User("num") managerNum: string) {
        if (!managerNum || managerNum === "abnormal") {
            return "abnormal";
        }
        return await this.managerService.managerLogin(managerNum);
    }

    // 查询维修单数据
    async findRepairs(findRepairsDto: FindRepairsDto) {
        return await this.managerService.findRepairs(findRepairsDto);
    }

    // 查询详细维修单
    async findRepairsOne(repairsId: string) {
        return await this.managerService.findRepairsOne(repairsId);
    }

    // 查询报修单--状态日志
    async findRepairsStatusLog(repairId: string) {
        return await this.managerService.findRepairsStatusLog(repairId);
    }
}
