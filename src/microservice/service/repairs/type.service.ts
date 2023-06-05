import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateTypeDto, UpdateTypeDto } from "src/microservice/dto/repairs";

@Injectable()
export class RepairsTypeService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }
    // 创建新类型
    async createType(createTypeDto: CreateTypeDto) {
        const pattern = { cmd: "repairs_create_type" };
        const data = createTypeDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 获取所有类型
    async findAll() {
        const pattern = { cmd: "repairs_findAdmin_type" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 用户获取所有类型
    async findTypeUserAll() {
        const pattern = { cmd: "repairs_findUser_type" };
        const data = {}
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 修改类型
    async updateType(updateTypeDto: UpdateTypeDto) {
        const pattern = { cmd: "repairs_update_type" };
        const data = updateTypeDto
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }

    // 删除类型
    async deleteType(typeId: string) {
        const pattern = { cmd: "repairs_delete_type" };
        const data = typeId
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
}