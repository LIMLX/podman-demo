import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminData } from 'src/common';
import { CreateBuildingDto, CreateManagerDto, DispatchDto, FindBuildingDto, FindManagerDto, FindRepairsDto, UpdateBuildingDto, UpdateManagerDto } from 'src/microservice/dto/repairs/admin.dto';
import { RepairsAdminService } from 'src/microservice/service/repairs';

@ApiTags("admin")
@Controller('repairs/admin')
export class RepairsAdminController {
    constructor(private readonly adminService: RepairsAdminService) { }
    // --------------------------------------日志查看--------------------------------------------------
    // 维修动态查看
    @Get("findRepairsMtrLog")
    async findRepairsMtrLog() {
        return await this.adminService.findRepairsMtrLog();
    }

    // 报修动态查看
    @Get("findRepairsLog")
    async findRepairsLog() {
        return await this.adminService.findRepairsLog();
    }

    // 楼栋动态查看
    @Get("findBuildingLog")
    async findBuildingLog() {
        return await this.adminService.findBuildingLog();
    }

    // --------------------------------------楼栋操作--------------------------------------------------
    // 创建新楼栋
    @Post("createBuilding")
    async createBuilding(@Body() createBuildingDto: CreateBuildingDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        // 获取数据
        createBuildingDto.adminId = adminId;
        createBuildingDto.adminName = adminName;
        return await this.adminService.createBuilding(createBuildingDto);
    }

    // 查询所有楼栋数据
    @Get("findBuildingAll/page=:page")
    async findBuildingAll(@Param("page") page: string, @Query() findBuildingDto: FindBuildingDto) {
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findBuildingDto.page = Number(page);
        if (findBuildingDto.status) {
            findBuildingDto.status = Number(findBuildingDto.status);
        }
        if (findBuildingDto.type) {
            findBuildingDto.type = Number(findBuildingDto.type);
        }
        return await this.adminService.findBuildingAll(findBuildingDto);
    }

    // 修改楼栋数据
    @Patch("updateBuilding")
    async updateBuilding(@Body() updateBuildingDto: UpdateBuildingDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        // 获取数据
        updateBuildingDto.adminId = adminId;
        updateBuildingDto.adminName = adminName;
        return await this.adminService.updateBuilding(updateBuildingDto);
    }

    // 删除楼栋(软删除---单个)
    @Delete("deleteBuilding/id=:buildingId")
    async deleteBuilding(@Param("buildingId") buildingId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.deleteBuilding(buildingId, adminId, adminName);
    }

    // 删除楼栋(软删除---多个)
    @Delete("deleteBuildingArr")
    async deleteBuildingArr(@Body("buildingId") buildingId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.deleteBuildingArr(buildingId, adminId, adminName);
    }

    // -------------------------------------楼栋管理员操作--------------------------------------------
    // 根据工号查询职工信息
    @Get("findEmpoyeeData/id=:employeeId")
    async findEmpoyeeData(@Param("employeeId") employeeId: string) {
        return await this.adminService.findEmpoyeeData(employeeId);
    }

    // 获取楼栋管理员数量
    @Get("findManagerSum")
    async findManagerSum() {
        return await this.adminService.findManagerSum();
    }

    // 查询楼栋管理员
    @Post("findManagerSum")
    async findManager(@Body() findManagerDto: FindManagerDto) {
        return await this.adminService.findManager(findManagerDto);
    }

    // 创建楼栋管理员
    @Post("createManager")
    async createManager(@Body() createManagerDto: CreateManagerDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        // 获取数据
        createManagerDto.adminId = adminId;
        createManagerDto.adminName = adminName;
        return await this.adminService.createManager(createManagerDto);
    }

    // 编辑楼栋管理员
    @Patch("updateManager")
    async updateManager(@Body() updateManagerDto: UpdateManagerDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        // 获取数据
        updateManagerDto.adminId = adminId;
        updateManagerDto.adminName = adminName;
        return await this.adminService.updateManager(updateManagerDto);
    }

    // 删除楼栋管理员(单个)
    @Delete("delManager/id=:managerId")
    async delManager(@Param("managerId") managerId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delManager(managerId, adminId, adminName);
    }

    // 删除楼栋管理员(多个)
    @Delete("delManagerArr")
    async delManagerArr(@Body("managerIdArr") managerIdArr: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delManagerArr(managerIdArr, adminId, adminName);
    }

    // -------------------------------------类型操作--------------------------------------------

    // ------------------------------------报修管理操作------------------------------------------
    // 获取基础数据
    @Get("findRepairsSum")
    async findRepairsSum() {
        return await this.adminService.findRepairsSum();
    }

    // 获取基础数据的趋势
    @Get("findRepairsTendency")
    async findRepairsTendency() {
        return await this.adminService.findRepairsTendency();
    }

    // 查询报修数据
    @Get("findRepairs/page=:page")
    async findRepairs(@Param("page") page: string, @Query() findRepairsDto: FindRepairsDto) {
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findRepairsDto.page = Number(page);
        if (findRepairsDto.status) {
            findRepairsDto.status = Number(findRepairsDto.status);
        }
        return await this.adminService.findRepairs(findRepairsDto);
    }

    // 查询报修详情数据
    @Get("findRepairsOne/id=:repairId")
    async findRepairsOne(@Param("repairId") repairId: string) {
        return await this.adminService.findRepairsOne(repairId);
    }

    // 查询报修--状态日志
    @Get("findRepairsStatusLog/id=:repairId")
    async findRepairsStatusLog(@Param("repairId") repairId: string) {
        return await this.adminService.findRepairsStatusLog(repairId);
    }

    // 报修批量派单
    @Patch("dispatchArr")
    async dispatchArr(@Body("repairId") repairId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.dispatchArr(repairId, adminId, adminName);
    }

    // 报修派单
    @Patch("dispatch")
    async dispatch(@Body() dispatchDto: DispatchDto) {
        return await this.adminService.dispatch(dispatchDto);
    }

    // 报修批量退回
    @Patch("sendBackArr")
    async sendBackArr(@Body("repairId") repairId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.sendBackArr(repairId, adminId, adminName);
    }

    // 报修退回
    @Patch("sendBack/id=:repairId")
    async sendBack(@Param("repairId") repairId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.sendBack(repairId, adminId, adminName);
    }

    // 查询所有地点/楼栋
    @Get("findBuilding")
    async findBuilding() {
        return await this.adminService.findBuilding();
    }

    // 查询所有类型
    @Get("findType")
    async findType() {
        return await this.adminService.findType();
    }

    // 查询所有维修工
    @Get("findMtr")
    async findMtr() {
        return await this.adminService.findMtr();
    }

    // 查询详细维修工
    @Get("findMtrOne/id=:mtrId")
    async findMtrOne(@Param("mtrId") mtrId: string) {
        return await this.adminService.findMtrOne(mtrId);
    }
}