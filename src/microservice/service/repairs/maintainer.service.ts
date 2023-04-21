import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { CreateMaintainerDto, FulfilRepairsDto, LoginMaintainerDto, ReturnRepairDto, TransferRepairDto, UpdateMaintainerDto } from "src/microservice/dto/repairs";

@Injectable()
export class RepairsMaintainerService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy
    ) { }
    // 维修工创建
    async createMaintainer({ maintainerName, maintainerNum, maintainerPhone, maintainerPsw }: CreateMaintainerDto) {
        const pattern = { cmd: "repairs_create_maintainer" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 维修工登录
    async loginMaintainer(loginMaintainer: LoginMaintainerDto) {
        const pattern = { cmd: "repairs_login_maintainer" };
        const data = loginMaintainer

        let token: any
        const observable = this.repairsService
            .send<any>(pattern, data)
            .pipe(map((message: any) => {
                if (message) {
                    token = { token: this.jwtService.sign(message) }
                    return token
                } else {
                    return token = { "message": "Unauthorized" }
                }
            }))

        // 异步执行获取查询的数据
        try {
            await lastValueFrom(observable)
        } catch (error) {
            console.error(error)
        }

        return token
    }
    // 维修工基础信息修改
    async updateMaintainer(updateBuilding: UpdateMaintainerDto) {
        const pattern = { cmd: "repairs_update_maintainer" };
        const data = updateBuilding
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 授权给维修工负责楼栋
    async authMaintainerBuilding(maintainerId: string, buildingId: string) {
        const pattern = { cmd: "repairs_authBuilding_maintainer" };
        const data = { maintainerId: maintainerId, buildingId: buildingId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 维修工授权擅长类型
    async authMaintainerType(maintainerId: string, typeId: string) {
        const pattern = { cmd: "repairs_authType_maintainer" };
        const data = { maintainerId: maintainerId, typeId: typeId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 删除(撤销)负责楼栋
    async deleteMtrBuilding(maintainerId: string, buildingId: string) {
        const pattern = { cmd: "repairs_delBuilding_maintainer" };
        const data = { maintainerId: maintainerId, buildingId: buildingId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 删除(撤销)负责类型
    async deleteMtrType(maintainerId: string, typeId: string) {
        const pattern = { cmd: "repairs_delType_maintainer" };
        const data = { maintainerId: maintainerId, typeId: typeId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 查询所有维修工信息----此操作为admin操作
    async findMaintainerAll() {
        const pattern = { cmd: "repairs_findAdmin_maintainer" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 查询所有维修工信息----此操作为users操作
    async findMtrUserAll() {
        const pattern = { cmd: "repairs_findUser_maintainer" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 维修工查询自己负责的所有工单
    async findRepairsAll(maintainerId: string, page: number) {
        const pattern = { cmd: "repairs_findRepairsAll_maintainer" };
        const data = { maintainerId: maintainerId, page: page }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 维修工查询过滤后的所有工单
    async findRepairsWaitFilterAll(maintainerId: string, typeLevel: number, statusLevel: number, time: string, page: number) {
        const pattern = { cmd: "repairs_findRepairsFilterAll_maintainer" };
        const data = { maintainerId: maintainerId, type: typeLevel, status: statusLevel, time: time, page: page }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 维修工转单
    async transferRepair(transferRepair: TransferRepairDto) {
        const pattern = { cmd: "repairs_reansferRepair_maintainer" };
        const data = transferRepair
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 维修工退单
    async returnRepair(returnRepair: ReturnRepairDto) {
        const pattern = { cmd: "repairs_returnReapair_maintainer" };
        const data = returnRepair
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 维修工完单(交单)
    async fulfilRepairs(fulfilRepairs: FulfilRepairsDto) {
        const pattern = { cmd: "repairs_fulfilReapairs_maintainer" };
        const data = fulfilRepairs
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
}