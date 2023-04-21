import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateBuildingDto, UpdateBuildingDto } from "src/microservice/dto/repairs";

@Injectable()
export class RepairsBuildingService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }

    // 创建新楼栋
    async createBuilding(createBuilding: CreateBuildingDto) {
        const pattern = { cmd: "repairs_create_building" };
        const data = createBuilding
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 返回所有楼栋数据
    async findBuildingAll() {
        const pattern = { cmd: "repairs_find_buildingAll" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 修改楼栋数据
    async updateBuilding(updateBuilding: UpdateBuildingDto) {
        const pattern = { cmd: "repairs_update_building" };
        const data = updateBuilding
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 删除楼栋数据
    async deleteBuilding(id: string) {
        const pattern = { cmd: "repairs_delete_building" };
        const data = { buildingId: id }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
}