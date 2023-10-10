import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Response } from "express";
import { map } from "rxjs";
import { FindNoticeDto, FindNoticeOneDto } from "src/microservice/dto/notice/user.dto";

@Injectable()
export class NoticeUserService {
    constructor(
        @Inject("NOTICE_SERVICE") private readonly noticeService: ClientProxy
    ) { }

    // 查看所有通知
    async findNotice(findNoticeDto: FindNoticeDto) {
        const pattern = { cmd: "notice_user_findNotice" };
        const data = findNoticeDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查看所有搜索通知
    async findNoticeLike(like: string, page: number) {
        const pattern = { cmd: "notice_user_findNoticeLike" };
        const data = { like: like, page: page };
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查看标签通知
    async findNoticeTag(tagId: string, page: number) {
        const pattern = { cmd: "notice_user_findNoticeTag" };
        const data = { tagId: tagId, page: page };
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查看通知详情
    async findNoticeData(findNoticeOneDto: FindNoticeOneDto) {
        const pattern = { cmd: "notice_user_findNoticeData" };
        const data = findNoticeOneDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查看通知详情HTML
    async findNoticeHtml(noticeId: string, res: Response) {
        const pattern = { cmd: "notice_user_findNoticeHtml" };
        const data = { noticeId: noticeId };
        let status = this.noticeService
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

    // 热门标签浏览
    async findHotTag() {
        const pattern = { cmd: "notice_user_findHotTag" };
        const data = {};
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 侧边栏数据查看
    async findBasicDataSum(userId: string) {
        const pattern = { cmd: "notice_user_findBasicDataSum" };
        const data = { userId: userId };
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }
}