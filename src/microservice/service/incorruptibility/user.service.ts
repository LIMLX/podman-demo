import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Response } from "express";
import { FindSloganCommentDto, FindSloganOneDto, SloganCommentDto, SloganCommentPraiseDto } from 'src/microservice/dto/incorruptibility';

@Injectable()
export class IncorruptibilityUserService {
    constructor(
        @Inject("INCORRUPTIBILITY_SERVICE") private readonly incorruptibilityService: ClientProxy
    ) { }

    // 标语查询
    async findSlogan(page: number) {
        const pattern = { cmd: "incorruptibility_user_findSlogan" };
        const data = { page: page };

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 标语详情
    async findSloganOne(findSloganOneDto: FindSloganOneDto) {
        const pattern = { cmd: "incorruptibility_user_findSloganOne" };
        const data = findSloganOneDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 标语详情HTML
    async findSloganHTML(res: Response, sloganId: string) {
        const pattern = { cmd: "incorruptibility_user_findSloganHTML" };
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

    // 进行标语点赞
    async sloganPraise(findSloganOneDto: FindSloganOneDto) {
        const pattern = { cmd: "incorruptibility_user_sloganPraise" };
        const data = findSloganOneDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查询评论区
    async findSloganComment(findSloganCommentDto: FindSloganCommentDto) {
        const pattern = { cmd: "incorruptibility_user_findSloganComment" };
        const data = findSloganCommentDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 进行评论
    async sloganComment(sloganCommentDto: SloganCommentDto) {
        const pattern = { cmd: "incorruptibility_user_sloganComment" };
        const data = sloganCommentDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 进行评论点赞
    async sloganCommentPraise(sloganCommentPraiseDto: SloganCommentPraiseDto) {
        const pattern = { cmd: "incorruptibility_user_sloganCommentPraise" };
        const data = sloganCommentPraiseDto;

        let status = this.incorruptibilityService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }
}