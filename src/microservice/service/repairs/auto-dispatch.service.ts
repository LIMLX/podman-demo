import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";

@Injectable()
export class RepairsAutoDispatchService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }
    // 自动派单开关
    async settingAuto() {
        const pattern = { cmd: "repairs_auto-dispatch_settingAuto" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }
    // 获取当前开关状态
    async findSetting() {
        const pattern = { cmd: "repairs_auto-dispatch_getSetting" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取当前开关状态
    async demo() {
        const pattern = { cmd: "repairs_auto-dispatch_demo" };
        const data = {};
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }
}