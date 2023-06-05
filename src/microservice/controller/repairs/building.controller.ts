import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBuildingDto, UpdateBuildingDto } from 'src/microservice/dto/repairs';
import { RepairsBuildingService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@Controller('repairs/building')
export class RepairsBuildingController {
    constructor(private readonly buildingService: RepairsBuildingService) { }

    // 创建新楼栋
    @ApiOperation({ summary: "创建楼栋", description: "创建新楼栋" })
    @Post("createBuilding")
    async createBuilding(@Body() createBuildingDto: CreateBuildingDto) {
        return await this.buildingService.createBuilding(createBuildingDto);
    }

    // 查询所有楼栋数据
    @ApiOperation({ summary: "查询所有楼栋", description: "获取所有楼栋详细数据---管理员" })
    @Get("findBuildingAll")
    async findBuildingAll() {
        return await this.buildingService.findBuildingAll();
    }

    // 查询所有楼栋数据---用户
    @ApiOperation({ summary: "查询所有楼栋", description: "获取所有楼栋详细数据---用户" })
    @Get("findBuildingUserAll")
    async findBuildingUserAll() {
        return await this.buildingService.findBuildingUserAll();
    }

    // 修改楼栋数据
    @ApiOperation({ summary: "修改楼栋", description: "修改楼栋详细数据---管理员" })
    @Patch('updateBuilding')
    async updateBuilding(@Body() updateBuildingDto: UpdateBuildingDto) {
        return await this.buildingService.updateBuilding(updateBuildingDto);
    }

    // 删除楼栋
    @ApiOperation({ summary: "删除楼栋", description: "删除楼栋---管理员" })
    @Delete('deleteBuilding/id=:buildingId')
    async deleteBuilding(@Param('buildingId') buildingId: string) {
        return await this.buildingService.deleteBuilding(buildingId);
    }
}
