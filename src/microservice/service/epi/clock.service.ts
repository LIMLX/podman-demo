import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateClockDto } from "src/microservice/dto/epi";

@Injectable()
export class EpiClockService {
    constructor(
        @Inject("EPI_SERVICE") private readonly epiService: ClientProxy
    ) { }

    // 进行打卡
    async clockIn(createClockDto: CreateClockDto) {
        const pattern = { cmd: "clock-in" };
        const data = createClockDto

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }

    // 返回打卡记录(个人)
    async findClock(userId: string, time: string) {
        const pattern = { cmd: "clock-find" };
        const data = { userId: userId, time: time }

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }

    // 打卡时显示的多选框(类型)
    async findType() {
        const pattern = { cmd: "clock-find-type" };
        const data = {}

        let status = this.epiService.send<any>(pattern, data).pipe(
            map((message: any) => {
                return message
            }
            ))
        return status
    }
}