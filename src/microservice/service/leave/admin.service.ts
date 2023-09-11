import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { FindLeaveDto } from "src/microservice/dto/leave/admin.dto";

@Injectable()
export class LeaveAdminService {
    constructor(
        @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
    ) { }

    // 获取全部请假类型---离校---返校的数量
    async findLeaveSum() {
        const pattern = { cmd: "leave_admin_findLeaveSum" };
        const data = {};

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 获取全部请假类型---离校---返校的昨天趋势
    async findLeaveTendency() {
        const pattern = { cmd: "leave_admin_findLeaveTendency" };
        const data = {};

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status;
    }

    // 获取病假的数量
    async findSickLeaveSum() {
        const pattern = { cmd: "leave_admin_findSickLeaveSum" };
        const data = {}

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status
    }

    // 获取病假的昨日趋势
    async findSickLeaveTendency() {
        const pattern = { cmd: "leave_admin_findSickLeaveTendency" };
        const data = {}

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status
    }

    // 获取事假的数量
    async findMatterLeaveSum() {
        const pattern = { cmd: "leave_admin_findMatterLeaveSum" };
        const data = {}

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status
    }

    // 获取事假的昨日趋势
    async findMatterLeaveTendency() {
        const pattern = { cmd: "leave_admin_findMatterLeaveTendency" };
        const data = {}

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status
    }

    // 获取离校的数量
    async findSchoolLeaveSum() {
        const pattern = { cmd: "leave_admin_findSchoolLeaveSum" };
        const data = {}

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status
    }

    // 获取离校的昨日趋势
    async findSchoolLeaveTendency() {
        const pattern = { cmd: "leave_admin_findSchoolLeaveTendency" };
        const data = {}

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status
    }

    // 获取返校的数量
    async findReturnLeaveSum() {
        const pattern = { cmd: "leave_admin_findReturnLeaveSum" };
        const data = {}

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status
    }

    // 获取返校的昨日趋势
    async findReturnLeaveTendency() {
        const pattern = { cmd: "leave_admin_findReturnLeaveTendency" };
        const data = {}

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status
    }

    // 查询全部假条
    async findLeave(findLeaveDto: FindLeaveDto) {
        const pattern = { cmd: "leave_admin_findLeave" };
        const data = findLeaveDto;

        let status = this.leaveService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status
    }
}