import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateStatusDto, UpdateStatusDto } from "src/microservice/dto/repairs";

@Injectable()
export class RepairsStatusService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }
    // 创建新状态
    async createStatus(createStatusDto: CreateStatusDto) {
        const pattern = { cmd: "repairs_create_status" };
        const data = createStatusDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 查询所有状态----管理员
    async findStatusAll() {
        const pattern = { cmd: "repairs_findAdmin_status" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 用户端查询所有状态
    async findStatusUserAll() {
        const pattern = { cmd: "repairs_findUser_status" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 修改状态
    async updateStatus(updateStatusDto: UpdateStatusDto) {
        const pattern = { cmd: "repairs_update_status" };
        const data = updateStatusDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 删除状态
    async deleteStatus(param: { statusId: string }) {
        const pattern = { cmd: "repairs_delete_status" };
        const data = param
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
}