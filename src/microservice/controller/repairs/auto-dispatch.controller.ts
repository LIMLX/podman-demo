import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin, AdminRole, AdminRoleGuard } from 'src/common';
import { RepairsAutoDispatchService } from 'src/microservice/service/repairs';

@ApiTags('报修自动派单')
@UseGuards(AdminRoleGuard)
@Controller('repairs/auto-dispatch')
export class RepairsAutoDispatchController {
    constructor(private readonly autoDispatchService: RepairsAutoDispatchService) { }

    // 自动派单开关
    @ApiOperation({ summary: "自动派单开关", description: "自动派单开关" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Post("settingAuto")
    async settingAuto() {
        return await this.autoDispatchService.settingAuto();
    }

    // 获取当前开关状态
    @ApiOperation({ summary: "自动派单状态", description: "当前开关状态" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get('findSetting')
    async findSetting() {
        return await this.autoDispatchService.findSetting();
    }

    @Get("demo")
    async demo() {
        return await this.autoDispatchService.demo();
    }
}