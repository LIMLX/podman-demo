import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common';
import { AuthBuildingDto, CreateManagerDto, UpdateManagerDto } from 'src/microservice/dto/repairs';
import { RepairsManagerService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@Controller('repairs/manager')
export class RepairsManagerController {
    constructor(private readonly managerService: RepairsManagerService) { }

    // 创建楼栋管理员
    @ApiOperation({ summary: "楼栋管理员创建", description: "创建新的楼栋管理员---管理员" })
    @Post('createManager')
    async createManager(@Body() createManagerDto: CreateManagerDto) {
        return await this.managerService.createManager(createManagerDto);
    }

    // 楼栋管理员授权对应楼栋
    @ApiOperation({ summary: "给楼栋管理员授权", description: "楼栋管理员授权接口---管理员" })
    @Post('authBuilding')
    async authBuilding(@Body() authBuildingDto: AuthBuildingDto) {
        return await this.managerService.authBuilding(authBuildingDto)
    }

    // 查询所有的楼栋管理员
    @ApiOperation({ summary: "查询楼栋管理员数据", description: "查询楼栋管理员详细数据---管理员" })
    @Get('findManagerAll')
    async findManagerAll() {
        return await this.managerService.findManagerAll();
    }

    // 修改楼栋管理员信息
    @ApiOperation({ summary: "楼栋管理员修改", description: "修改楼栋管理员数据---管理员" })
    @Patch('updateManager')
    async updateManager(@Body() updateManagerDto: UpdateManagerDto) {
        return await this.managerService.updateManager(updateManagerDto);
    }

    // 删除楼栋管理员
    @ApiOperation({ summary: "楼栋管理员删除(停职)", description: "删除(停职)楼栋管理员---管理员" })
    @Delete('deleteManager/managerId=:managerId')
    async deleteManager(@Param("managerId") managerId: string) {
        return await this.managerService.deleteManager(managerId);
    }

    // 重新启用楼栋管理员
    @ApiOperation({ summary: "楼栋管理员重启", description: "重启楼栋管理员---管理员" })
    @Patch('reuseManager/managerId=:managerId')
    async reuseManager(@Param("managerId") managerId: string) {
        return await this.managerService.reuseManager(managerId);
    }

    // 楼栋管理员普通查询自己管理的楼栋报修
    @ApiOperation({ summary: "楼栋管理员查询负责楼栋工单", description: "楼栋管理员查询负责楼栋工单---楼栋管理员" })
    @Get("findRepairsAll/page=:page")
    async findRepairsAll(@User("num") managerNum: string, @Param('page') page: string) {
        if (!managerNum || managerNum === "abnormal") {
            return "abnormal"
        }
        return await this.managerService.findRepairsAll(managerNum, +page)
    }

    // 楼栋管理员筛选查询自己管理的楼栋报修
    @ApiOperation({ summary: "楼栋管理员筛选查询负责楼栋工单", description: "楼栋管理员筛选查询负责楼栋工单---楼栋管理员" })
    @Get("findRepairsFilterAll/page=:page")
    async findRepairsFilterAll(@Param("page") page: string, @User("num") managerNum: string, @Query() { type, status }: { type: string, status: string }) {
        if (!managerNum || managerNum === "abnormal") {
            return "abnormal"
        }
        return await this.managerService.findRepairsFilterAll(+page, +type, +status, managerNum)
    }
}
