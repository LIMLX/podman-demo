import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateRepairsDto, UpdateRepairsDto } from "src/microservice/dto/repairs/user.dto";

@Injectable()
export class RepairsUserService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }
    // 用户查询个人的维修单
    async findRepairs(userId: string, statusNum: number) {
        const pattern = { cmd: "repairs_user_findRepairs" };
        const data = { userId: userId, status: statusNum };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询详细维修单
    async findRepairsOne(userId: string, repairsId: string) {
        const pattern = { cmd: "repairs_user_findRepairsOne" };
        const data = { userId: userId, repairsId: repairsId };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询报修单--状态日志
    async findRepairsStatusLog(repairId: string) {
        const pattern = { cmd: "repairs_user_findRepairsStatusLog" };
        const data = repairId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 创建报修单
    async createRepairs(createRepairsDto: CreateRepairsDto) {
        const pattern = { cmd: "repairs_user_createRepairs" };
        const data = createRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 撤回报修单
    async revocationRepairs(repairId: string, userName: string, userId: string) {
        const pattern = { cmd: "repairs_user_revocationRepairs" };
        const data = { repairId: repairId, userName: userName, userId: userId };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 编辑报修单
    async updateRepairs(updateRepairsDto: UpdateRepairsDto) {
        const pattern = { cmd: "repairs_user_updateRepairs" };
        const data = updateRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }
}