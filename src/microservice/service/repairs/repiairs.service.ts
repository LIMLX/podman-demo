import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateRepairDto, UpdateRepairDto } from "src/microservice/dto/repairs";

@Injectable()
export class RepairsRepairsService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }
    // 创建维修工单
    async createRepairs(createRepairDto: CreateRepairDto) {
        const pattern = { cmd: "repairs_create" };
        const data = createRepairDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 修改维修工单
    async updateRepairs(updateRepairDto: UpdateRepairDto) {
        const pattern = { cmd: "repairs_update" };
        const data = updateRepairDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 删除维修工单
    async deleteRepairs(repairsId: string, userId: string) {
        const pattern = { cmd: "repairs_delete" };
        const data = { repairsId: repairsId, userId: userId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 查看个人所有工单
    async findRepairsAll(userId: string, page: number) {
        const pattern = { cmd: "repairs_findAll" };
        const data = { userId: userId, page: page }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 查看单个的个人的详情工单----在此方法内只能供创建人查看
    async findRepairsOne(repairsId: string, userId: string) {
        const pattern = { cmd: "repairs_findOne" };
        const data = { repairsId: repairsId, userId: userId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 个人数据状态值筛选
    async findRepairsStatusFilter(statusNum: number, userId: string, page: number) {
        const pattern = { cmd: "repairs_findFileterAll" };
        const data = { status: statusNum, userId: userId, page: page }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
}