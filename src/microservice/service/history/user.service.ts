import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Response } from 'express'

@Injectable()
export class HistoryUserService {

    constructor(
        @Inject("HISTORY_SERVICE") private readonly historyService: ClientProxy
    ) { }

    // 首页查询
    // 首页轮播图查询
    async findHomeSlideshow() {
        const pattern = { cmd: "history_user_findHomeSlideshow" };
        const data = {};

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 文章首页
    async findArticleHome(type: number) {
        const pattern = { cmd: "history_user_findArticleHome" };
        const data = type;

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 人物首页查询
    async findPersonagHome() {
        const pattern = { cmd: "history_user_findPersonagHome" };
        const data = {};

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 红色遗迹首页查询
    async findSiteHome() {
        const pattern = { cmd: "history_user_findSiteHome" };
        const data = {};

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 文章模块查询
    async findArticle(type: number, page: number) {
        const pattern = { cmd: "history_user_findArticle" };
        const data = { type: type, page: page };

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 人物模块查询
    async findPersonag(page: number) {
        const pattern = { cmd: "history_user_findPersonag" };
        const data = page;

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 红色遗迹模块查询
    async findSite(page: number) {
        const pattern = { cmd: "history_user_findSite" };
        const data = page;

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 文章点赞
    async articlePraise(userId: string, articleId: string) {
        const pattern = { cmd: "history_user_articlePraise" };
        const data = { userId: userId, articleId: articleId };

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 人物点赞
    async personagPraise(userId: string, personagId: string) {
        const pattern = { cmd: "history_user_personagPraise" };
        const data = { userId: userId, personagId: personagId };

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 红色遗址点赞
    async sitePraise(siteId: string, userId: string) {
        const pattern = { cmd: "history_user_sitePraise" };
        const data = { userId: userId, siteId: siteId };

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 查看详细文章HTML
    async findArticleOne(res: Response, articleId: string) {
        const pattern = { cmd: "history_user_findArticleOne" };
        const data = articleId;

        let status = this.historyService
            .send<any>(pattern, data)
            .subscribe(meassage => {
                if (meassage !== "Unknown resource") {
                    res.sendFile(meassage, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                } else {
                    res.status(400).send(meassage)
                }
            })
        return status;
    }

    // 查看详细人物HTML
    async findPersonagOne(res: Response, personagId: string) {
        const pattern = { cmd: "history_user_findPersonagOne" };
        const data = personagId;

        let status = this.historyService
            .send<any>(pattern, data)
            .subscribe(meassage => {
                if (meassage !== "Unknown resource") {
                    res.sendFile(meassage, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                } else {
                    res.status(400).send(meassage)
                }
            })
        return status;
    }

    // 查看详细地点HTML
    async findSiteOne(res: Response, siteId: string) {
        const pattern = { cmd: "history_user_findSiteOne" };
        const data = siteId;

        let status = this.historyService
            .send<any>(pattern, data)
            .subscribe(meassage => {
                if (meassage !== "Unknown resource") {
                    res.sendFile(meassage, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                } else {
                    res.status(400).send(meassage)
                }
            })
        return status;
    }

    // 查看文章详情数据
    async findArticleData(id: string, userId: string, userRole: string, userName: string) {
        const pattern = { cmd: "history_user_findArticleData" };
        const data = { id: id, userId: userId, userRole: userRole, userName: userName };

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 查看人物详情数据
    async findPersonagData(id: string, userId: string, userRole: string, userName: string) {
        const pattern = { cmd: "history_user_findPersonagData" };
        const data = { id: id, userId: userId, userRole: userRole, userName: userName };

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 查看红色遗址详情数据
    async findSiteData(id: string, userId: string, userRole: string, userName: string) {
        const pattern = { cmd: "history_user_findSiteData" };
        const data = { id: id, userId: userId, userRole: userRole, userName: userName };

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 查看文章浏览量以及点赞量
    async findArticleRecord(articleId: string) {
        const pattern = { cmd: "history_user_findArticleRecord" };
        const data = articleId;

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 查看人物浏览量以及点赞量
    async findPersonagRecord(personagId: string) {
        const pattern = { cmd: "history_user_findPersonagRecord" };
        const data = personagId;

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }

    // 查看红色遗址浏览量以及点赞量
    async findSiteRecord(siteId: string) {
        const pattern = { cmd: "history_user_findSiteRecord" };
        const data = siteId;

        let status = this.historyService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ));
        return status;
    }
}