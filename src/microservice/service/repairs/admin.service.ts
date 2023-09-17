import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { CreateBuildingDto, CreateManagerDto, DispatchDto, FindBuildingDto, FindManagerDto, FindRepairsDto, UpdateBuildingDto, UpdateManagerDto } from "src/microservice/dto/repairs/admin.dto";

export class RepairsAdminService {
    constructor(
        @Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy,
    ) { }
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
    async findManagerSum() {
        const pattern = { cmd: "repairs_admin_findManagerSum" };
        const data = {};
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

    // -------------------------------------类型操作--------------------------------------------

    // ------------------------------------报修管理操作------------------------------------------
    // 获取基础数据
    async findRepairsSum() {
        const pattern = { cmd: "repairs_admin_findRepairsSum" };
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

    // 查询所有地点/楼栋
    async findBuilding() {
        const pattern = { cmd: "repairs_admin_findBuilding" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询所有类型
    async findType() {
        const pattern = { cmd: "repairs_admin_findType" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询所有维修工
    async findMtr() {
        const pattern = { cmd: "repairs_admin_findMtr" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询详细维修工
    async findMtrOne(mtrId: string) {
        const pattern = { cmd: "repairs_admin_findMtrOne" };
        const data = mtrId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }
}