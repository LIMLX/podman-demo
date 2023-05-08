import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { CreateAdminDto, LoginAdminDto, UpdateAdminDto } from "src/microservice/dto/repairs";

export class RepairsAdminService {
    constructor(
        @Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy,
        private readonly jwtService: JwtService,
    ) { }
    // 创建新管理员
    async createAdmin(createAdminDto: CreateAdminDto) {
        const pattern = { cmd: "repairs_createAdmin_admin" };
        const data = createAdminDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 修改管理员
    async updateAdmin(updateAdminDto: UpdateAdminDto) {
        const pattern = { cmd: "repairs_updateAdmin_admin" };
        const data = updateAdminDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 管理员登录
    async loginAdmin(LoginDto: LoginAdminDto) {
        const pattern = { cmd: "repairs_login_admin" };
        const data = LoginDto

        let token: any
        const observable = this.repairsService
            .send<any>(pattern, data)
            .pipe(map((message: any) => {
                if (message && message !== "login error" && message !== "abnormal") {
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
    // 管理员的修改预计时间接口
    async updateRepairsET(time: string, repairId: number) {
        const pattern = { cmd: "repairs_updateET_admin" };
        const data = { time: time, repairId: repairId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 管理员查询工单
    async findRepairsAll(page: number) {
        const pattern = { cmd: "repairs_findAll_admin" };
        const data = { page: page }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 管理员查询详细工单
    async findRepairs(repairId: number) {
        const pattern = { cmd: "repairs_findOne_admin" };
        const data = { repairId: repairId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 管理员过滤查询
    async findFilter(typeNum: string, statusNum: string, page: number) {
        const pattern = { cmd: "repairs_findFilter_admin" };
        const data = { typeNum: typeNum, statusNum: statusNum, page: page }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 查询所有维修工信息----此操作为admin操作
    async findMaintainerAll() {
        const pattern = { cmd: "repairs_findAllMtr_admin" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
}