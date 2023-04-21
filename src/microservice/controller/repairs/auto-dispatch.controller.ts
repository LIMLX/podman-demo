import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RepairsAutoDispatchService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@Controller('repairs/auto-dispatch')
export class RepairsAutoDispatchController {
    constructor(private readonly autoDispatchService: RepairsAutoDispatchService) { }

    // 自动派单开关
    @ApiOperation({ summary: "自动派单开关", description: "自动派单开关" })
    @Post("settingAuto")
    async settingAuto() {
        return await this.autoDispatchService.settingAuto()
    }

    // 获取当前开关状态
    @ApiOperation({ summary: "自动派单状态", description: "当前开关状态" })
    @Get('findSetting')
    async findSetting() {
        return await this.autoDispatchService.findSetting()
    }
}

