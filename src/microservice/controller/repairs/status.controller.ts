import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStatusDto, UpdateStatusDto } from 'src/microservice/dto/repairs';
import { RepairsStatusService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@Controller('repairs/status')
export class RepairsStatusController {
    constructor(private readonly statusService: RepairsStatusService) { }

    // 创建新状态
    @ApiOperation({ summary: "创建工单状态", description: "创建维修工单的新状态---管理员" })
    @Post('createStatus')
    async createStatus(@Body() createStatusDto: CreateStatusDto) {
        return await this.statusService.createStatus(createStatusDto);
    }

    // 查询所有状态----管理员
    @ApiOperation({ summary: "查询工单状态", description: "查询维修工单状态的详细数据---管理员" })
    @Get('findStatusAll')
    async findStatusAll() {
        return await this.statusService.findStatusAll();
    }

    // 用户端查询所有状态
    @ApiOperation({ summary: "查询工单状态", description: "查询维修工单状态的简略数据---用户" })
    @Get('findStatusUserAll')
    async findStatusUserAll() {
        return await this.statusService.findStatusUserAll()
    }

    // 修改状态
    @ApiOperation({ summary: "修改工单状态", description: "修改维修工单的状态---管理员" })
    @Patch('updateStatus')
    async updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
        return await this.statusService.updateStatus(updateStatusDto);
    }

    // 删除状态
    @ApiOperation({ summary: "删除工单状态", description: "删除维修工单的状态---管理员" })
    @Delete('deleteStatus/id=:statusId')
    async deleteStatus(@Param() param: { statusId: string }) {
        return await this.statusService.deleteStatus(param);
    }
}
