import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateClockTypeDto } from "src/microservice/dto/epi";

@Injectable()
export class EpiClockTypeService {
    constructor(
        @Inject("EPI_SERVICE") private readonly epiService: ClientProxy
    ) { }

    // 创建新类型
    async createType(createClockTypeDto: CreateClockTypeDto) {
        const pattern = { cmd: "ep_clockType_createType" };
        const data = createClockTypeDto

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }

    // 查询所有类型
    async findTypeAll() {
        const pattern = { cmd: "ep_clockType_findTypeAll" };
        const data = {}

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }

    // 修改数据
    async updateType(updateTypeDto: CreateClockTypeDto) {
        const pattern = { cmd: "ep_clockType_updateType" };
        const data = updateTypeDto

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }

    // 删除数据
    async deleteType(typeId: string) {
        const pattern = { cmd: "ep_clockType_deleteType" };
        const data = { typeId: typeId }

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }
}