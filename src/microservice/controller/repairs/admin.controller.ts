import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin, AdminData, AdminRole, AdminRoleGuard } from 'src/common';
import { CreateBuildingDto, CreateManagerDto, CreateMtrDto, CreateTypeDto, DispatchDto, FindBuildingDto, FindManagerDto, FindMtrDto, FindRepairsDto, FindTypeDto, UpdateBuildingDto, UpdateManagerDto, UpdateMtrDto, UpdateTypeDto } from 'src/microservice/dto/repairs/admin.dto';
import { RepairsAdminService } from 'src/microservice/service/repairs';

@ApiTags('报修管理员')
@UseGuards(AdminRoleGuard)
@Controller('repairs/admin')
export class RepairsAdminController {
    constructor(private readonly adminService: RepairsAdminService) { }

    // 验证是否有超级管理员权限
    @ApiOperation({ summary: "验证是否有超级管理员权限", description: "验证是否有超级管理员权限" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Post("superAdminLogin")
    async superAdminLogin(@AdminData("id") adminId: string) {
        if (!adminId || adminId === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.superAdminLogin(adminId);
    }

    // --------------------------------------日志查看--------------------------------------------------
    // 维修动态查看
    @ApiOperation({ summary: "维修动态查看", description: "维修动态查看" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsMtrLog")
    async findRepairsMtrLog() {
        return await this.adminService.findRepairsMtrLog();
    }

    // 报修动态查看
    @ApiOperation({ summary: "报修动态查看", description: "报修动态查看" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsLog")
    async findRepairsLog() {
        return await this.adminService.findRepairsLog();
    }

    // 楼栋动态查看
    @ApiOperation({ summary: "楼栋动态查看", description: "楼栋动态查看" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findBuildingLog")
    async findBuildingLog() {
        return await this.adminService.findBuildingLog();
    }

    // --------------------------------------楼栋操作--------------------------------------------------
    // 创建新楼栋
    @ApiOperation({ summary: "创建新楼栋", description: "创建新楼栋" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "获取楼栋的基础数据", description: "获取楼栋的基础数据" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findBuildingBasicsSum")
    async findBuildingBasicsSum() {
        return await this.adminService.findBuildingBasicsSum();
    }

    // 查询所有楼栋数据总数
    @ApiOperation({ summary: "查询所有楼栋数据总数", description: "查询所有楼栋数据总数" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "查询所有楼栋数据", description: "查询所有楼栋数据" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "修改楼栋数据", description: "修改楼栋数据" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "删除楼栋(软删除---单个)", description: "删除楼栋(软删除---单个)" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Delete("deleteBuilding/id=:buildingId")
    async deleteBuilding(@Param("buildingId") buildingId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.deleteBuilding(buildingId, adminId, adminName);
    }

    // 删除楼栋(软删除---多个)
    @ApiOperation({ summary: "删除楼栋(软删除---多个)", description: "删除楼栋(软删除---多个)" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Delete("deleteBuildingArr")
    async deleteBuildingArr(@Body("buildingId") buildingId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.deleteBuildingArr(buildingId, adminId, adminName);
    }

    // -------------------------------------楼栋管理员操作--------------------------------------------
    // 根据工号查询职工信息
    @ApiOperation({ summary: "根据工号查询职工信息", description: "根据工号查询职工信息" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findEmpoyeeData/id=:employeeId")
    async findEmpoyeeData(@Param("employeeId") employeeId: string) {
        return await this.adminService.findEmpoyeeData(employeeId);
    }

    // 获取楼栋管理员数量
    @ApiOperation({ summary: "获取楼栋管理员数量", description: "获取楼栋管理员数量" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findManagerSum")
    async findManagerSum(@Query() findManagerDto: FindManagerDto) {
        if (findManagerDto.status) {
            findManagerDto.status = Number(findManagerDto.status);
        }
        return await this.adminService.findManagerSum(findManagerDto);
    }

    // 查询楼栋管理员
    @ApiOperation({ summary: "查询楼栋管理员", description: "查询楼栋管理员" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "创建楼栋管理员", description: "创建楼栋管理员" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "编辑楼栋管理员", description: "编辑楼栋管理员" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "删除楼栋管理员(单个)", description: "删除楼栋管理员(单个)" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Delete("delManager/id=:managerId")
    async delManager(@Param("managerId") managerId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delManager(managerId, adminId, adminName);
    }

    // 删除楼栋管理员(多个)
    @ApiOperation({ summary: "删除楼栋管理员(多个)", description: "删除楼栋管理员(多个)" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Delete("delManagerArr")
    async delManagerArr(@Body("managerIdArr") managerIdArr: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delManagerArr(managerIdArr, adminId, adminName);
    }

    // -----------------------------------维修工管理操作-----------------------------------------
    // 获取维修工总数
    @ApiOperation({ summary: "获取维修工总数", description: "获取维修工总数" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findMtrSum")
    async findMtrSum(@Query() findMtrDto: FindMtrDto) {
        if (findMtrDto.status) {
            findMtrDto.status = Number(findMtrDto.status);
        }
        return await this.adminService.findMtrSum(findMtrDto);
    }

    // 获取所有维修工数据
    @ApiOperation({ summary: "获取所有维修工数据", description: "获取所有维修工数据" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "获取维修工详细数据", description: "获取维修工详细数据" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findMtrOne/id=:mtrId")
    async findMtrOne(@Param("mtrId") mtrId: string) {
        return await this.adminService.findMtrOne(mtrId);
    }

    // 创建维修工
    @ApiOperation({ summary: "创建维修工", description: "创建维修工" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "修改(编辑)维修工", description: "修改(编辑)维修工" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "删除维修工/撤职(单个)", description: "删除维修工/撤职(单个)" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Delete("delMtr/id=:mtrId")
    async delMtr(@Param("mtrId") mtrId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delMtr(mtrId, adminId, adminName);
    }

    // 删除维修工/撤职(多个)
    @ApiOperation({ summary: "删除维修工/撤职(多个)", description: "删除维修工/撤职(多个)" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Delete("delMtrArr")
    async delMtrArr(@Body("mtrId") mtrId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delMtrArr(mtrId, adminId, adminName);
    }

    // ------------------------------------类型管理操作------------------------------------------
    // 获取类型总数
    @ApiOperation({ summary: "获取类型总数", description: "获取类型总数" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findTypeSum")
    async findTypeSum(@Query() findTypeDto: FindTypeDto) {
        if (findTypeDto.status) {
            findTypeDto.status = Number(findTypeDto.status);
        }
        return await this.adminService.findTypeSum(findTypeDto);
    }

    // 获取类型颜色
    @ApiOperation({ summary: "获取类型颜色", description: "获取类型颜色" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findTypeColour")
    async findTypeColour() {
        return await this.adminService.findTypeColour();
    }

    // 获取类型工种
    @ApiOperation({ summary: "获取类型工种", description: "获取类型工种" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "创建类型工种", description: "创建类型工种" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Post("createType")
    async createType(@Body() createTypeDto: CreateTypeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.createType(createTypeDto);
    }

    // 修改/编辑类型工种
    @ApiOperation({ summary: "修改/编辑类型工种", description: "修改/编辑类型工种" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Patch("updateType")
    async updateType(@Body() updateTypeDto: UpdateTypeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.updateType(updateTypeDto);
    }

    // 删除类型工种(单个)
    @ApiOperation({ summary: "删除类型工种(单个)", description: "删除类型工种(单个)" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Delete("delType/id=:typeId")
    async delType(@Param("typeId") typeId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delType(typeId, adminId, adminName);
    }

    // 删除类型工种(多个)
    @ApiOperation({ summary: "删除类型工种(多个)", description: "删除类型工种(多个)" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Delete("delTypeArr")
    async delTypeArr(@Body("typeId") typeId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.delTypeArr(typeId, adminId, adminName);
    }

    // ------------------------------------报修管理操作------------------------------------------
    // 获取报修单总数
    @ApiOperation({ summary: "获取报修单总数", description: "获取报修单总数" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsSum")
    async findRepairsSum(@Query() findRepairsDto: FindRepairsDto) {
        if (findRepairsDto.status) {
            findRepairsDto.status = Number(findRepairsDto.status);
        }
        return await this.adminService.findRepairsSum(findRepairsDto);
    }

    // 获取基础数据
    @ApiOperation({ summary: "获取基础数据", description: "获取基础数据" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsBasicsSum")
    async findRepairsBasicsSum() {
        return await this.adminService.findRepairsBasicsSum();
    }

    // 获取基础数据的趋势
    @ApiOperation({ summary: "获取基础数据的趋势", description: "获取基础数据的趋势" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsTendency")
    async findRepairsTendency() {
        return await this.adminService.findRepairsTendency();
    }

    // 查询报修数据
    @ApiOperation({ summary: "查询报修数据", description: "查询报修数据" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "查询报修详情数据", description: "查询报修详情数据" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsOne/id=:repairId")
    async findRepairsOne(@Param("repairId") repairId: string) {
        return await this.adminService.findRepairsOne(repairId);
    }

    // 查询报修--状态日志
    @ApiOperation({ summary: "查询报修--状态日志", description: "查询报修--状态日志" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsStatusLog/id=:repairId")
    async findRepairsStatusLog(@Param("repairId") repairId: string) {
        return await this.adminService.findRepairsStatusLog(repairId);
    }

    // 报修批量派单
    @ApiOperation({ summary: "报修批量派单", description: "报修批量派单" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Patch("dispatchArr")
    async dispatchArr(@Body("repairId") repairId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.dispatchArr(repairId, adminId, adminName);
    }

    // 报修派单
    @ApiOperation({ summary: "报修派单", description: "报修派单" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
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
    @ApiOperation({ summary: "报修批量退回", description: "报修批量退回" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Patch("sendBackArr")
    async sendBackArr(@Body("repairId") repairId: string[], @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.sendBackArr(repairId, adminId, adminName);
    }

    // 报修退回
    @ApiOperation({ summary: "报修退回", description: "报修退回" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Patch("sendBack/id=:repairId")
    async sendBack(@Param("repairId") repairId: string, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
        if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
            return "abnormal";
        }
        return await this.adminService.sendBack(repairId, adminId, adminName);
    }

    // 查询所有地点/楼栋---编辑功能
    @ApiOperation({ summary: "查询所有地点/楼栋---编辑功能", description: "查询所有地点/楼栋---编辑功能" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsBuilding")
    async findRepairsBuilding() {
        return await this.adminService.findRepairsBuilding();
    }

    // 查询所有类型---编辑功能
    @ApiOperation({ summary: "查询所有类型---编辑功能", description: "查询所有类型---编辑功能" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsType")
    async findRepairsType() {
        return await this.adminService.findRepairsType();
    }

    // 查询所有维修工---派单(编辑)功能
    @ApiOperation({ summary: "查询所有维修工---派单(编辑)功能", description: "查询所有维修工---派单(编辑)功能" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsMtr")
    async findRepairsMtr() {
        return await this.adminService.findRepairsMtr();
    }

    // 查询详细维修工---派单功能
    @ApiOperation({ summary: "查询详细维修工---派单功能", description: "查询详细维修工---派单功能" })
    @AdminRole([{ admin: Admin.Repairs, level: 1 }])
    @Get("findRepairsMtrOne/id=:mtrId")
    async findRepairsMtrOne(@Param("mtrId") mtrId: string) {
        return await this.adminService.findRepairsMtrOne(mtrId);
    }
}