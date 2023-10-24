import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Response } from "express";
import { CreateSloganDto, DeleteSloganDto, FindSloganDto, PublisSloganDto, UpdateSloganDto } from 'src/microservice/dto/incorruptibility';

@Injectable()
export class IncorruptibilityAdminService {
    constructor(
        @Inject("INCORRUPTIBILITY_SERVICE") private readonly incorruptibilityService: ClientProxy
    ) { }

    // 基础数据查询
    async findSloganBasics() {
        const pattern = { cmd: "incorruptibility_admin_findSloganBasics" };
        const data = {};

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 基础数据趋势查询
    async findSloganTendency() {
        const pattern = { cmd: "incorruptibility_admin_findSloganTendency" };
        const data = {};

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 标语页数查询
    async findSloganSum(findSloganDto: FindSloganDto) {
        const pattern = { cmd: "incorruptibility_admin_findSloganSum" };
        const data = findSloganDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 标语查询
    async findSlogan(findSloganDto: FindSloganDto) {
        const pattern = { cmd: "incorruptibility_admin_findSlogan" };
        const data = findSloganDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 标语详情
    async findSloganOne(sloganId: string) {
        const pattern = { cmd: "incorruptibility_admin_findSloganOne" };
        const data = { sloganId: sloganId };

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 标语详情HTML
    async findSloganHTML(res: Response, sloganId: string) {
        const pattern = { cmd: "incorruptibility_admin_findSloganHTML" };
        const data = { sloganId: sloganId };
        let status = this.incorruptibilityService
            .send<any>(pattern, data)
            .subscribe(meassage => {
                if (meassage !== "Unknown resource") {
                    res.sendFile(meassage, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                } else {
                    res.status(400).send(meassage);
                }
            })
        return status;
    }

    // 新建标语
    async createSlogan(createSloganDto: CreateSloganDto) {
        const pattern = { cmd: "incorruptibility_admin_createSlogan" };
        const data = createSloganDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 编辑标语
    async updateSlogan(updateSloganDto: UpdateSloganDto) {
        const pattern = { cmd: "incorruptibility_admin_updateSlogan" };
        const data = updateSloganDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 发布标语
    async publisSlogan(publisSloganDto: PublisSloganDto) {
        const pattern = { cmd: "incorruptibility_admin_publisSlogan" };
        const data = publisSloganDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 删除标语
    async delSlogan(deleteSloganDto: DeleteSloganDto) {
        const pattern = { cmd: "incorruptibility_admin_delSlogan" };
        const data = deleteSloganDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }
}