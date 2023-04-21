import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { AuthBuildingDto, CreateManagerDto, UpdateManagerDto } from "src/microservice/dto/repairs";

@Injectable()
export class RepairsManagerService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }
    // 创建楼栋管理员
    async createManager(createManagerDto: CreateManagerDto) {
        const pattern = { cmd: "repairs_create_manager" };
        const data = createManagerDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 楼栋管理员授权对应楼栋
    async authBuilding(authBuildingDto: AuthBuildingDto) {
        const pattern = { cmd: "repairs_authBuilding_manager" };
        const data = authBuildingDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 查询所有的楼栋管理员
    async findManagerAll() {
        const pattern = { cmd: "repairs_findAll_manager" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 修改楼栋管理员信息
    async updateManager(updateManagerDto: UpdateManagerDto) {
        const pattern = { cmd: "repairs_update_manager" };
        const data = updateManagerDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 删除楼栋管理员
    async deleteManager(managerId: string) {
        const pattern = { cmd: "repairs_delete_manager" };
        const data = { managerId: managerId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 重新启用楼栋管理员
    async reuseManager(managerId: string) {
        const pattern = { cmd: "repairs_reuse_manager" };
        const data = { managerId: managerId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 楼栋管理员普通查询自己管理的楼栋报修
    async findRepairsAll(managerNum: string, page: number) {
        const pattern = { cmd: "repairs_findRepairsAll_manager" };
        const data = { managerNum: managerNum, page: page }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 楼栋管理员筛选查询自己管理的楼栋报修
    async findRepairsFilterAll(page: number, typeNum: number, statusNum: number, managerNum: string) {
        const pattern = { cmd: "repairs_findRepairsFileterAll_manager" };
        const data = { managerNum: managerNum, page: page, type: typeNum, status: statusNum }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
}