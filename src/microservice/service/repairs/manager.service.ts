import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { FindRepairsDto } from 'src/microservice/dto/repairs/manager.dto';

@Injectable()
export class RepairsManagerService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }


    // 验证是否为楼栋管理员
    async managerLogin(managerNum: string) {
        const pattern = { cmd: "repairs_manager_managerLogin" };
        const data = managerNum;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取类型颜色
    async findTypeColour() {
        const pattern = { cmd: "repairs_manager_findTypeColour" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询维修单数据
    async findRepairs(findRepairsDto: FindRepairsDto) {
        const pattern = { cmd: "repairs_manager_findRepairs" };
        const data = findRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询详细维修单
    async findRepairsOne(repairsId: string) {
        const pattern = { cmd: "repairs_manager_findRepairsOne" };
        const data = repairsId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询报修单--状态日志
    async findRepairsStatusLog(repairId: string) {
        const pattern = { cmd: "repairs_manager_findRepairsStatusLog" };
        const data = { repairId: repairId };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }
}