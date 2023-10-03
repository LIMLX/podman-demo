import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { FindAppRepairsDto, FindRepairsDto, FulfilRepairsDto, MaintainerLoginDto, SendBackRepairsDto, TransferRepairsDto } from "src/microservice/dto/repairs/maintainer.dto";

@Injectable()
export class RepairsMaintainerService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy
    ) { }

    // 维修工登录
    async maintainerLogin(loginMaintainer: MaintainerLoginDto) {
        const pattern = { cmd: "repairs_maintainer_maintainerLogin" };
        const data = loginMaintainer

        let token: any;
        const observable = this.repairsService
            .send<any>(pattern, data)
            .pipe(map((message: any) => {
                if (message && message !== "login error" && message !== "abnormal") {
                    token = { token: this.jwtService.sign(message) }
                    return token
                } else if (message === "login error") {
                    token = "账号或密码错误"
                } else {
                    return token = { "message": "Unauthorized" }
                }
            }))

        // 异步执行获取查询的数据
        try {
            await lastValueFrom(observable);
        } catch (error) {
            console.error(error);
        }

        return token;
    }

    // 获取类型颜色
    async findTypeColour() {
        const pattern = { cmd: "repairs_maintainer_findTypeColour" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询自己负责的维修单
    async findRepairs(findRepairsDto: FindRepairsDto) {
        const pattern = { cmd: "repairs_maintainer_findRepairs" };
        const data = findRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询详细维修单
    async findRepairsOne(repairsId: string) {
        const pattern = { cmd: "repairs_maintainer_findRepairsOne" };
        const data = repairsId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查询报修单--状态日志
    async findRepairsStatusLog(repairId: string) {
        const pattern = { cmd: "repairs_maintainer_findRepairsStatusLog" };
        const data = repairId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取其他维修工数据
    async findMtr(mtrId: string) {
        const pattern = { cmd: "repairs_maintainer_findMtr" };
        const data = mtrId;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 退单
    async sendBackRepairs(sendBackRepairsDto: SendBackRepairsDto) {
        const pattern = { cmd: "repairs_maintainer_sendBackRepairs" };
        const data = sendBackRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 转单
    async transferRepairs(transferRepairsDto: TransferRepairsDto) {
        const pattern = { cmd: "repairs_maintainer_transferRepairs" };
        const data = transferRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 完单
    async fulfilRepairs(fulfilRepairsDto: FulfilRepairsDto) {
        const pattern = { cmd: "repairs_maintainer_fulfilRepairs" };
        const data = fulfilRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // app进行查询操作
    async findAppRepairs(findAppRepairsDto: FindAppRepairsDto) {
        const pattern = { cmd: "repairs_maintainer_findAppRepairs" };
        const data = findAppRepairsDto;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // app进行查询详情操作
    async findAppRepairsOne(repairsId: string, updateTime: Date) {
        const pattern = { cmd: "repairs_maintainer_findAppRepairsOne" };
        const data = { repairsId: repairsId, updateTime: updateTime };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }
}