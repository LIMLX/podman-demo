import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminData } from 'src/common';
import { CreateBuildingDto, CreateManagerDto, CreateMtrDto, CreateTypeDto, DispatchDto, FindBuildingDto, FindManagerDto, FindMtrDto, FindRepairsDto, FindTypeDto, UpdateBuildingDto, UpdateManagerDto, UpdateMtrDto, UpdateTypeDto } from 'src/microservice/dto/repairs/admin.dto';
import { RepairsAdminService } from 'src/microservice/service/repairs';

@ApiTags("admin")
@Controller('repairs/admin')
export class RepairsAdminController {
    constructor(private readonly adminService: RepairsAdminService) { }

    // 验证是否有超级管理员权限
    @Post("superAdminLogin")
    async superAdminLogin(@AdminData("id") adminId: string) {
        if (!adminId || adminId === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.superAdminLogin(adminId);
    }

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

    // 获取楼栋的基础数据
    @Get("findBuildingBasicsSum")
    async findBuildingBasicsSum() {
        return await this.adminService.findBuildingBasicsSum();
    }

    // 查询所有楼栋数据总数
    @Get("findBuildingSum")
    async findBuildingSum(@Query() findBuildingDto: FindBuildingDto) {
        if (findBuildingDto.status) {
            findBuildingDto.status = Number(findBuildingDto.status);
        }
        if (findBuildingDto.type) {
            findBuildingDto.type = Number(findBuildingDto.type);
        }
        return await this.adminService.findBuildingSum(findBuildingDto);
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
    async findManagerSum(@Query() findManagerDto: FindManagerDto) {
        if (findManagerDto.status) {
            findManagerDto.status = Number(findManagerDto.status);
        }
        return await this.adminService.findManagerSum(findManagerDto);
    }

    // 查询楼栋管理员
    @Get("findManager/page=:page")
    async findManager(@Param("page") page: string, @Query() findManagerDto: FindManagerDto) {
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findManagerDto.page = Number(page);
        if (findManagerDto.status) {
            findManagerDto.status = Number(findManagerDto.status);
        }
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

    // -----------------------------------维修工管理操作-----------------------------------------
    // 获取维修工总数
    @Get("findMtrSum")
    async findMtrSum(@Query() findMtrDto: FindMtrDto) {
        if (findMtrDto.status) {
            findMtrDto.status = Number(findMtrDto.status);
        }
        return await this.adminService.findMtrSum(findMtrDto);
    }

    // 获取所有维修工数据
    @Get("findMtr/page=:page")
    async findMtr(@Param("page") page: string, @Query() findMtrDto: FindMtrDto) {
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findMtrDto.page = Number(page);
        if (findMtrDto.status) {
            findMtrDto.status = Number(findMtrDto.status);
        }
        return await this.adminService.findMtr(findMtrDto);
    }

    // 获取维修工详细数据
    @Get("findMtrOne/id=:mtrId")
    async findMtrOne(@Param("mtrId") mtrId: string) {
        return await this.adminService.findMtrOne(mtrId);
    }

    // 创建维修工
    @Post("createMtr")
    async createMtr(@Body() createMtrDto: CreateMtrDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        createMtrDto.adminId = adminId;
        createMtrDto.adminName = adminName;
        return await this.adminService.createMtr(createMtrDto);
    }

    // 修改(编辑)维修工
    @Patch("updateMtr")
    async updateMtr(@Body() updateMtrDto: UpdateMtrDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        updateMtrDto.adminId = adminId;
        updateMtrDto.adminName = adminName;
        return await this.adminService.updateMtr(updateMtrDto);
    }

    // 删除维修工/撤职(单个)
    @Delete("delMtr/id=:mtrId")
    async delMtr(@Param("mtrId") mtrId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delMtr(mtrId, adminId, adminName);
    }

    // 删除维修工/撤职(多个)
    @Delete("delMtrArr")
    async delMtrArr(@Body("mtrId") mtrId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delMtrArr(mtrId, adminId, adminName);
    }

    // ------------------------------------类型管理操作------------------------------------------
    // 获取类型总数
    @Get("findTypeSum")
    async findTypeSum(@Query() findTypeDto: FindTypeDto) {
        if (findTypeDto.status) {
            findTypeDto.status = Number(findTypeDto.status);
        }
        return await this.adminService.findTypeSum(findTypeDto);
    }

    // 获取类型工种
    @Get("findType/page=:page")
    async findType(@Param("page") page: string, @Query() findTypeDto: FindTypeDto) {
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findTypeDto.page = Number(page);
        if (findTypeDto.status) {
            findTypeDto.status = Number(findTypeDto.status);
        }
        return await this.adminService.findType(findTypeDto);
    }

    // 创建类型工种
    @Post("createType")
    async createType(@Body() createTypeDto: CreateTypeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.createType(createTypeDto);
    }

    // 修改/编辑类型工种
    @Patch("updateType")
    async updateType(@Body() updateTypeDto: UpdateTypeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.updateType(updateTypeDto);
    }

    // 删除类型工种(单个)
    @Delete("delType/id=:typeId")
    async delType(@Param("typeId") typeId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delType(typeId, adminId, adminName);
    }

    // 删除类型工种(多个)
    @Delete("delTypeArr")
    async delTypeArr(@Body("typeId") typeId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delTypeArr(typeId, adminId, adminName);
    }

    // ------------------------------------报修管理操作------------------------------------------
    // 获取报修单总数
    @Get("findRepairsSum")
    async findRepairsSum(@Query() findRepairsDto: FindRepairsDto) {
        if (findRepairsDto.status) {
            findRepairsDto.status = Number(findRepairsDto.status);
        }
        return await this.adminService.findRepairsSum(findRepairsDto);
    }

    // 获取基础数据
    @Get("findRepairsBasicsSum")
    async findRepairsBasicsSum() {
        return await this.adminService.findRepairsBasicsSum();
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
    async dispatch(@Body() dispatchDto: DispatchDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        dispatchDto.adminId = adminId;
        dispatchDto.adminName = adminName;
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

    // 查询所有地点/楼栋---编辑功能
    @Get("findRepairsBuilding")
    async findRepairsBuilding() {
        return await this.adminService.findRepairsBuilding();
    }

    // 查询所有类型---编辑功能
    @Get("findRepairsType")
    async findRepairsType() {
        return await this.adminService.findRepairsType();
    }

    // 查询所有维修工---派单(编辑)功能
    @Get("findRepairsMtr")
    async findRepairsMtr() {
        return await this.adminService.findRepairsMtr();
    }

    // 查询详细维修工---派单功能
    @Get("findRepairsMtrOne/id=:mtrId")
    async findRepairsMtrOne(@Param("mtrId") mtrId: string) {
        return await this.adminService.findRepairsMtrOne(mtrId);
    }
}