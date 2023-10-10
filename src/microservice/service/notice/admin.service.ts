import { Inject, Injectable, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { Response } from "express";
import { map } from "rxjs";
import { CreateNoticeDto, CreateNoticeTagDto, DelNotcieDto, DelNoticeTagDto, FindNoticeDto, PublishNoticeDto, UpdateNoticeDto, UpdateNoticeTagDto } from "src/microservice/dto/notice/admin.dto";

@Injectable()
export class NoticeAdminService {
    constructor(
        @Inject("NOTICE_SERVICE") private readonly noticeService: ClientProxy
    ) { }

    // 基础数据
    async findNoticeBasics(userId: string) {
        const pattern = { cmd: "notice_admin_findNoticeBasics" };
        const data = { userId: userId };
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 基础数据趋势
    async findNoticeTendency(userId: string) {
        const pattern = { cmd: "notice_admin_findNoticeTendency" };
        const data = { userId: userId };
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 热门标签
    async findHotTag() {
        const pattern = { cmd: "notice_admin_findHotTag" };
        const data = {};
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查询通知数据
    async findNotice(findNoticeDto: FindNoticeDto) {
        const pattern = { cmd: "notice_admin_findNotice" };
        const data = findNoticeDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查询通知数量
    async findNoticeSum(findNoticeDto: FindNoticeDto) {
        const pattern = { cmd: "notice_admin_findNoticeSum" };
        const data = findNoticeDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查询某篇文章的浏览量与点赞量
    async findNoticeRecord(noticeId: string) {
        const pattern = { cmd: "notice_admin_findNoticeRecord" };
        const data = { noticeId: noticeId };
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查看详细通知
    async findNoticeOne(noticeId: string) {
        const pattern = { cmd: "notice_admin_findNoticeOne" };
        const data = { noticeId: noticeId };
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查看通知HTML
    async findNoticeHtml(noticeId: string, res: Response) {
        const pattern = { cmd: "notice_admin_findNoticeHtml" };
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

    // 发布通知
    async publishNotice(publishNoticeDto: PublishNoticeDto) {
        const pattern = { cmd: "notice_admin_publishNotice" };
        const data = publishNoticeDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 删除通知
    async delNotice(delNotcieDto: DelNotcieDto) {
        const pattern = { cmd: "notice_admin_delNotice" };
        const data = delNotcieDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 新建通知
    async createNotice(createNoticeDto: CreateNoticeDto) {
        const pattern = { cmd: "notice_admin_createNotice" };
        const data = createNoticeDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 修改通知
    async updateNotice(updateNoticeDto: UpdateNoticeDto) {
        const pattern = { cmd: "notice_admin_updateNotice" };
        const data = updateNoticeDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 查看所有通知
    async findNoticeTag() {
        const pattern = { cmd: "notice_admin_findNoticeTag" };
        const data = {};
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 创建新通知
    async createNoticeTag(createNoticeTagDto: CreateNoticeTagDto) {
        const pattern = { cmd: "notice_admin_createNoticeTag" };
        const data = createNoticeTagDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 编辑标签
    async updateNoticeTag(updateNoticeTagDto: UpdateNoticeTagDto) {
        const pattern = { cmd: "notice_admin_updateNoticeTag" };
        const data = updateNoticeTagDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 删除通知
    async delNoticeTag(delNoticeTagDto: DelNoticeTagDto) {
        const pattern = { cmd: "notice_admin_delNoticeTag" };
        const data = delNoticeTagDto;
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }

    // 获取当前发布的管理员所在部门或者学院
    async findAdminRole(adminId: string, adminName: string) {
        const pattern = { cmd: "notice_admin_findAdminRole" };
        const data = { adminId: adminId, adminName: adminName };
        let status = this.noticeService.send<any>(pattern, data).pipe(map((message: any) => { return message; }));
        return status;
    }
}