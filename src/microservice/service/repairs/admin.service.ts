import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { CreateBuildingDto, CreateManagerDto, CreateMtrDto, CreateTypeDto, DispatchDto, FindBuildingDto, FindManagerDto, FindMtrDto, FindRepairsDto, FindTypeDto, UpdateBuildingDto, UpdateManagerDto, UpdateMtrDto, UpdateTypeDto } from "src/microservice/dto/repairs/admin.dto";

export class RepairsAdminService {
    constructor(
        @Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy,
    ) { }
    // 验证是否有超级管理员权限
    async superAdminLogin(adminId: string) {
        const pattern = { cmd: "repairs_admin_superAdminLogin" };
        const data = adminId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // --------------------------------------日志查看--------------------------------------------------
    // 维修动态查看
    async findRepairsMtrLog() {
        const pattern = { cmd: "repairs_admin_findRepairsMtrLog" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 报修动态查看
    async findRepairsLog() {
        const pattern = { cmd: "repairs_admin_findRepairsLog" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 楼栋动态查看
    async findBuildingLog() {
        const pattern = { cmd: "repairs_admin_findBuildingLog" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // --------------------------------------楼栋操作--------------------------------------------------
    // 创建新楼栋
    async createBuilding(createBuildingDto: CreateBuildingDto) {
        const pattern = { cmd: "repairs_admin_createBuilding" };
        const data = createBuildingDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取楼栋的基础数据
    async findBuildingBasicsSum() {
        const pattern = { cmd: "repairs_admin_findBuildingBasicsSum" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询所有楼栋数据总数
    async findBuildingSum(findBuildingDto: FindBuildingDto) {
        const pattern = { cmd: "repairs_admin_findBuildingSum" };
        const data = findBuildingDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询所有楼栋数据
    async findBuildingAll(findBuildingDto: FindBuildingDto) {
        const pattern = { cmd: "repairs_admin_findBuildingAll" };
        const data = findBuildingDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 修改楼栋数据
    async updateBuilding(updateBuildingDto: UpdateBuildingDto) {
        const pattern = { cmd: "repairs_admin_updateBuilding" };
        const data = updateBuildingDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除楼栋(软删除---单个)
    async deleteBuilding(buildingId: string, adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_deleteBuilding" };
        const data = { buildingId: buildingId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除楼栋(软删除---多个)
    async deleteBuildingArr(buildingId: string[], adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_deleteBuildingArr" };
        const data = { buildingId: buildingId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // -------------------------------------楼栋管理员操作--------------------------------------------
    // 根据工号查询职工信息
    async findEmpoyeeData(employeeId: string) {
        const pattern = { cmd: "repairs_admin_findEmpoyeeData" };
        const data = employeeId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取楼栋管理员数量
    async findManagerSum(findManagerDto: FindManagerDto) {
        const pattern = { cmd: "repairs_admin_findManagerSum" };
        const data = findManagerDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询楼栋管理员
    async findManager(findManagerDto: FindManagerDto) {
        const pattern = { cmd: "repairs_admin_findManager" };
        const data = findManagerDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 创建楼栋管理员
    async createManager(createManagerDto: CreateManagerDto) {
        const pattern = { cmd: "repairs_admin_createManager" };
        const data = createManagerDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 编辑楼栋管理员
    async updateManager(updateManagerDto: UpdateManagerDto) {
        const pattern = { cmd: "repairs_admin_updateManager" };
        const data = updateManagerDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除楼栋管理员(单个)
    async delManager(managerId: string, adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_delManager" };
        const data = { managerId: managerId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除楼栋管理员(多个)
    async delManagerArr(managerIdArr: string[], adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_delManagerArr" };
        const data = { managerIdArr: managerIdArr, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // -----------------------------------维修工管理操作-----------------------------------------
    // 获取维修工总数
    async findMtrSum(findMtrDto: FindMtrDto) {
        const pattern = { cmd: "repairs_admin_findMtrSum" };
        const data = findMtrDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取所有维修工数据
    async findMtr(findMtrDto: FindMtrDto) {
        const pattern = { cmd: "repairs_admin_findMtr" };
        const data = findMtrDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取维修工详细数据
    async findMtrOne(mtrId: string) {
        const pattern = { cmd: "repairs_admin_findMtrOne" };
        const data = mtrId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 创建维修工
    async createMtr(createMtrDto: CreateMtrDto) {
        const pattern = { cmd: "repairs_admin_createMtr" };
        const data = createMtrDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 修改(编辑)维修工
    async updateMtr(updateMtrDto: UpdateMtrDto) {
        const pattern = { cmd: "repairs_admin_updateMtr" };
        const data = updateMtrDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除维修工/撤职(单个)
    async delMtr(mtrId: string, adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_delMtr" };
        const data = { mtrId: mtrId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除维修工/撤职(多个)
    async delMtrArr(mtrId: string[], adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_delMtrArr" };
        const data = { mtrId: mtrId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // ------------------------------------类型管理操作------------------------------------------
    // 获取类型总数
    async findTypeSum(findTypeDto: FindTypeDto) {
        const pattern = { cmd: "repairs_admin_findTypeSum" };
        const data = findTypeDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }


    // 获取类型工种
    async findType(findTypeDto: FindTypeDto) {
        const pattern = { cmd: "repairs_admin_findType" };
        const data = findTypeDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 创建类型工种
    async createType(createTypeDto: CreateTypeDto) {
        const pattern = { cmd: "repairs_admin_createType" };
        const data = createTypeDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 修改/编辑类型工种
    async updateType(updateTypeDto: UpdateTypeDto) {
        const pattern = { cmd: "repairs_admin_updateType" };
        const data = updateTypeDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除类型工种(单个)
    async delType(typeId: string, adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_delType" };
        const data = { typeId: typeId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除类型工种(多个)
    async delTypeArr(typeId: string[], adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_delTypeArr" };
        const data = { typeId: typeId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // ------------------------------------报修管理操作------------------------------------------
    // 获取报修单总数
    async findRepairsSum(findRepairsDto: FindRepairsDto) {
        const pattern = { cmd: "repairs_admin_findRepairsSum" };
        const data = findRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取基础数据
    async findRepairsBasicsSum() {
        const pattern = { cmd: "repairs_admin_findRepairsBasicsSum" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取基础数据的趋势
    async findRepairsTendency() {
        const pattern = { cmd: "repairs_admin_findRepairsTendency" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询报修数据
    async findRepairs(findRepairsDto: FindRepairsDto) {
        const pattern = { cmd: "repairs_admin_findRepairs" };
        const data = findRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询报修详情数据
    async findRepairsOne(repairId: string) {
        const pattern = { cmd: "repairs_admin_findRepairsOne" };
        const data = repairId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询报修--状态日志
    async findRepairsStatusLog(repairId: string) {
        const pattern = { cmd: "repairs_admin_findRepairsStatusLog" };
        const data = repairId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 报修批量派单
    async dispatchArr(repairId: string[], adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_dispatchArr" };
        const data = { repairId: repairId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 报修派单
    async dispatch(dispatchDto: DispatchDto) {
        const pattern = { cmd: "repairs_admin_dispatch" };
        const data = dispatchDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 报修批量退回
    async sendBackArr(repairId: string[], adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_sendBackArr" };
        const data = { repairId: repairId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 报修退回
    async sendBack(repairId: string, adminId: string, adminName: string) {
        const pattern = { cmd: "repairs_admin_sendBack" };
        const data = { repairId: repairId, adminId: adminId, adminName: adminName };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询所有地点/楼栋---编辑功能
    async findRepairsBuilding() {
        const pattern = { cmd: "repairs_admin_findRepairsBuilding" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询所有类型---编辑功能
    async findRepairsType() {
        const pattern = { cmd: "repairs_admin_findRepairsType" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询所有维修工---派单(编辑)功能
    async findRepairsMtr() {
        const pattern = { cmd: "repairs_admin_findRepairsMtr" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询详细维修工---派单功能
    async findRepairsMtrOne(mtrId: string) {
        const pattern = { cmd: "repairs_admin_findRepairsMtrOne" };
        const data = mtrId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }
}