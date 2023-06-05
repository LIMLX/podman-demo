import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common';
import { CreateRepairDto, UpdateRepairDto } from 'src/microservice/dto/repairs';
import { RepairsRepairsService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@Controller('repairs')
export class RepairsRepairsController {
    constructor(private readonly repairsService: RepairsRepairsService) { }

    // 创建维修工单
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: "创建工单", description: "创建新的维修工单---用户" })
    @Post("createRepairs")
    async createRepairs(@Body() createRepairDto: CreateRepairDto, @User('id') userId: string, @User('type') userType: string) {
        // 验证身份id
        if (!userId || userId === "abnormal") {
            return "abnormal"
        }
        createRepairDto.userId = userId
        if (!userType || userType === "abnormal") {
            return "abnormal"
        }
        // 判断上传人类型
        if (userType === "student") {
            createRepairDto.userLevel = 0
        } else if (userType === "employee") {
            createRepairDto.userLevel = 1
        } else {
            return "abnormal"
        }
        return await this.repairsService.createRepairs(createRepairDto);
    }

    // 修改维修工单
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: "修改自己的工单", description: "修改自己的维修工单(在派单前)---用户" })
    @Patch('updateRepairs')
    async updateRepairs(@Body() updateRepairDto: UpdateRepairDto, @User('id') userId: string, @User('type') userType: string) {
        updateRepairDto.userId = userId
        if (!userType || userType === "abnormal") {
            return "abnormal"
        }
        if (userType === "student") {
            updateRepairDto.userLevel = 0
        } else if (userType === "employee") {
            updateRepairDto.userLevel = 1
        } else {
            return "abnormal"
        }
        return await this.repairsService.updateRepairs(updateRepairDto)
    }

    // 删除维修工单
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: "删除工单", description: "删除维修工单---用户" })
    @Delete('deleteRepairs/id=:repairsId')
    async deleteRepairs(@Param("repairsId") repairsId: string, @User("id") userId: string) {
        return await this.repairsService.deleteRepairs(repairsId, userId)
    }

    // 查看个人所有工单
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: "查看个人工单", description: "查看个人维修工单---用户" })
    @Get('findRepairsAll/page=:page')
    async findRepairsAll(@User('id') userId: string, @Param('page') page: number) {
        if (!userId || userId === "abnormal") {
            return "abnormal"
        }
        return await this.repairsService.findRepairsAll(userId, +page)
    }

    // 查看单个的个人的详情工单----在此方法内只能供创建人查看
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: "查看详细工单", description: "查看详细维修工单---用户" })
    @Get('findRepairsOne/id=:repairsId')
    async findRepairsOne(@Param('repairsId') repairsId: string, @User('id') userId: string) {
        return await this.repairsService.findRepairsOne(repairsId, userId)
    }

    // 个人数据状态值筛选
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: "筛选工单", description: "筛选查询维修工单---用户" })
    @Get('findRepairsStatusFilter/status=:status/page=:page')
    async findRepairsStatusFilter(@Param() { status, page }: { status: string, page: number }, @User('id') userId: string) {
        return await this.repairsService.findRepairsStatusFilter(+status, userId, +page)
    }
}
