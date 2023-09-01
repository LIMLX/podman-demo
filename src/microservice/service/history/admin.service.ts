import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { UpdateHistoryDto, UpdatePersonagDto, UpdateSiteDto, CreateHistoryDto, CreatePersonagDto, CreateSiteDto } from 'src/microservice/dto/history/admin.dto';
import { Response } from "express";

@Injectable()
export class HistoryAdminService {
  constructor(
    @Inject("HISTORY_SERVICE") private readonly historyService: ClientProxy
  ) { }
  // --------------------首页--------------------
  // 基础数据获取
  // 文章总量
  async findArticleSum(type: number) {
    const pattern = { cmd: "history_admin_findArticleSum" };
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

  // 文章趋势---对比昨天
  async findArticleTrend(type: number) {
    const pattern = { cmd: "history_admin_findArticleTrend" };
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

  // 总浏览量
  async findVisitSum(type: number) {
    const pattern = { cmd: "history_admin_findVisitSum" };
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

  // 总浏览量趋势---对比昨天
  async findVisitTrend(type: number) {
    const pattern = { cmd: "history_admin_findVisitTrend" };
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

  // 点赞量
  async findLikeSum(type: number) {
    const pattern = { cmd: "history_admin_findLikeSum" };
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

  // 点赞量趋势---对比昨天
  async findLikeTrend(type: number) {
    const pattern = { cmd: "history_admin_findLikeTrend" };
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

  // 实时动态---点赞人
  async findRealTime() {
    const pattern = { cmd: "history_admin_findRealTime" };
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

  // 当前搜索的文章数量
  async findArticleSize(like: string) {
    const pattern = { cmd: "history_admin_findArticleSize" };
    const data = like;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 分页显示全部文章
  async findArticleAll(page: number, like: string) {
    const pattern = { cmd: "history_admin_findArticleAll" };
    const data = { page: page, like: like };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 创建文章
  async createArticle(file: Express.Multer.File, createHistoryDto: CreateHistoryDto) {
    const pattern = { cmd: "history_admin_createArticle" };
    const data = { file: file, createHistoryDto: createHistoryDto };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }


  // 删除文章
  async delArticle(historyId: string) {
    const pattern = { cmd: "history_admin_delArticle" };
    const data = historyId;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 查询文章详细内容
  async findArticleOne(res: Response, articleId: string) {
    const pattern = { cmd: "history_admin_findArticleOne" };
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

  // 查看文章浏览量以及点赞量
  async findArticleRecord(articleId: string) {
    const pattern = { cmd: "history_admin_findArticleRecord" };
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

  // 修改文章内容
  async updateArticle(updateArticle: UpdateHistoryDto) {
    const pattern = { cmd: "history_admin_updateArticle" };
    const data = updateArticle;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 修改文章封面
  async updateCover(file: Express.Multer.File, articleId: string) {
    const pattern = { cmd: "history_admin_updateCover" };
    const data = { file: file, articleId: articleId };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 查看待发文章
  async findPendingArticleAll(page: number, like: string) {
    const pattern = { cmd: "history_admin_findPendingArticleAll" };
    const data = { page: page, like: like };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 查看代发文章数量
  async findPendingArticleSum(like: string) {
    const pattern = { cmd: "history_admin_findPendingArticleSum" };
    const data = like;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 发布文章
  async publishArticle(articleId: string) {
    const pattern = { cmd: "history_admin_publishArticle" };
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

  // 批量发布
  async publishArticleAll(idArr: string[]) {
    const pattern = { cmd: "history_admin_publishArticleAll" };
    const data = idArr;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // -------------------人物------------------------
  // 基础数据获取
  // 人物总量获取
  async findPersonagSum() {
    const pattern = { cmd: "history_admin_findPersonagSum" };
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

  // 人物趋势---对比昨天
  async findPersonagTrend() {
    const pattern = { cmd: "history_admin_findPersonagTrend" };
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

  // 人物总浏览量
  async findPersonagVisitSum() {
    const pattern = { cmd: "history_admin_findPersonagVisitSum" };
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

  // 人物总浏览量趋势---对比昨天
  async findPersonagVisitTrend() {
    const pattern = { cmd: "history_admin_findPersonagVisitTrend" };
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

  // 人物实时动态---点赞人
  async findPersonagRealTime() {
    const pattern = { cmd: "history_admin_findPersonagRealTime" };
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

  // 当前搜索的人物数量
  async findPersonagSize(like: string) {
    const pattern = { cmd: "history_admin_findPersonagSize" };
    const data = like;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 分页显示全部人物
  async findPersonagAll(page: number, like: string) {
    const pattern = { cmd: "history_admin_findPersonagAll" };
    const data = { page: page, like: like };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 查看详细人物HTML
  async findPersonagOne(res: Response, id: string) {
    const pattern = { cmd: "history_admin_findPersonagOne" };
    const data = id;

    let status = this.historyService
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

  // 查看待发文章
  async findPendingPersonagAll(page: number, like: string) {
    const pattern = { cmd: "history_admin_findPendingPersonagAll" };
    const data = { page: page, like: like };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 查看代发文章数量
  async findPendingPersonagSum(like: string) {
    const pattern = { cmd: "history_admin_findPendingPersonagSum" };
    const data = like;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 发布文章
  async publishPersonag(personagId: string) {
    const pattern = { cmd: "history_admin_publishPersonag" };
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

  // 批量发布
  async publishPersonagAll(idArr: string[]) {
    const pattern = { cmd: "history_admin_publishPersonagAll" };
    const data = idArr;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 创建人物文章
  async createPersonag(file: Express.Multer.File, createPersonagDto: CreatePersonagDto) {
    const pattern = { cmd: "history_admin_createPersonag" };
    const data = { file: file, createPersonagDto: createPersonagDto };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 获取民族信息
  async findNation() {
    const pattern = { cmd: "history_admin_findNation" };
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

  // 修改人物封面
  async updatePersonagCover(file: Express.Multer.File, personagId: string) {
    const pattern = { cmd: "history_admin_updatePersonagCover" };
    const data = { file: file, personagId: personagId };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 删除人物
  async delPersonag(personagId: string) {
    const pattern = { cmd: "history_admin_delPersonag" };
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

  // 查看人物浏览量以及点赞量
  async findPersonagRecord(personagId: string) {
    const pattern = { cmd: "history_admin_findPersonagRecord" };
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

  // 修改人物内容
  async updatePersonag(updatePersonag: UpdatePersonagDto) {
    const pattern = { cmd: "history_admin_updatePersonag" };
    const data = updatePersonag;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 红色遗址(地点)
  // 基础数据获取
  // 地点总量获取
  async findSiteSum() {
    const pattern = { cmd: "history_admin_findSiteSum" };
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

  // 地点趋势---对比昨天
  async findSiteTrend() {
    const pattern = { cmd: "history_admin_findSiteTrend" };
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

  // 地点总浏览量
  async findSiteVisitSum() {
    const pattern = { cmd: "history_admin_findSiteVisitSum" };
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

  // 地点总浏览量趋势---对比昨天
  async findSiteVisitTrend() {
    const pattern = { cmd: "history_admin_findSiteVisitTrend" };
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

  // 地点实时动态---点赞人
  async findSiteRealTime() {
    const pattern = { cmd: "history_admin_findSiteRealTime" };
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

  // 当前搜索的地点数量
  async findSiteSize(like: string) {
    const pattern = { cmd: "history_admin_findSiteSize" };
    const data = like;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 分页显示全部地点
  async findSiteAll(page: number, like: string) {
    const pattern = { cmd: "history_admin_findSiteAll" };
    const data = { page: page, like: like };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 分页显示全部地点
  async findSiteOne(res: Response, id: string) {
    const pattern = { cmd: "history_admin_findSiteOne" };
    const data = id;

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

  // 查看待发地点
  async findPendingSiteAll(page: number, like: string) {
    const pattern = { cmd: "history_admin_findPendingSiteAll" };
    const data = { page: page, like: like };

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 查看代发地点数量
  async findPendingSiteSum(like: string) {
    const pattern = { cmd: "history_admin_findPendingSiteSum" };
    const data = like;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 发布地点
  async publishSite(siteId: string) {
    const pattern = { cmd: "history_admin_publishSite" };
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

  // 批量发布
  async publishSiteAll(idArr: string[]) {
    const pattern = { cmd: "history_admin_publishSiteAll" };
    const data = idArr;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 创建地点
  async createSite(createSiteDto: CreateSiteDto) {
    const pattern = { cmd: "history_admin_createSite" };
    const data = createSiteDto;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 修改地点
  async updateSite(updateSiteDto: UpdateSiteDto) {
    const pattern = { cmd: "history_admin_updateSite" };
    const data = updateSiteDto;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 删除地点
  async delSite(siteId: string) {
    const pattern = { cmd: "history_admin_delSite" };
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

  // 查看人物浏览量以及点赞量
  async findSiteRecord(siteId: string) {
    const pattern = { cmd: "history_admin_findSiteRecord" };
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
