import { Controller, Get, Patch, Param, Res, UseGuards } from '@nestjs/common';
import { User, UserEnum, UserRole, UserRoleGuard } from 'src/common';
import { HistoryUserService } from 'src/microservice/service/history';
import { Response } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('党史用户')
@Controller('history/user')
@UseGuards(UserRoleGuard)
export class HistoryUserController {
  constructor(private readonly userService: HistoryUserService) { }

  // 首页查询
  // 首页轮播图查询
  @ApiOperation({ summary: "首页轮播图查询", description: "首页轮播图查询" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findHomeSlideshow")
  async findHomeSlideshow() {
    return await this.userService.findHomeSlideshow();
  }

  // 文章首页
  @ApiOperation({ summary: "文章首页", description: "文章首页" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findArticleHome/type=:type")
  async findArticleHome(@Param("type") type: number) {
    return await this.userService.findArticleHome(type);
  }

  // 人物首页查询
  @ApiOperation({ summary: "人物首页查询", description: "人物首页查询" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findPersonagHome")
  async findPersonagHome() {
    return await this.userService.findPersonagHome();
  }

  // 红色遗迹首页查询
  @ApiOperation({ summary: "红色遗迹首页查询", description: "红色遗迹首页查询" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findSiteHome")
  async findSiteHome() {
    return await this.userService.findSiteHome();
  }

  // 文章模块查询
  @ApiOperation({ summary: "文章模块查询", description: "文章模块查询" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findArticle/type=:type/page=:page")
  async findArticle(@Param() { type, page }: { type: number, page: number }) {
    return await this.userService.findArticle(type, page);
  }

  // 人物模块查询
  @ApiOperation({ summary: "人物模块查询", description: "人物模块查询" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findPersonag/page=:page")
  async findPersonag(@Param("page") page: number) {
    return await this.userService.findPersonag(page);
  }

  // 红色遗迹模块查询
  @ApiOperation({ summary: "红色遗迹模块查询", description: "红色遗迹模块查询" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findSite/page=:page")
  async findSite(@Param("page") page: number) {
    return await this.userService.findSite(page);
  }

  // 文章点赞
  @ApiOperation({ summary: "文章点赞", description: "文章点赞" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Patch("articlePraise/id=:articleId")
  async articlePraise(@Param("articleId") articleId: string, @User("id") userId: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    return await this.userService.articlePraise(userId, articleId);
  }

  // 人物点赞
  @ApiOperation({ summary: "人物点赞", description: "人物点赞" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Patch("personagPraise/id=:personagId")
  async personagPraise(@Param("personagId") personagId: string, @User("id") userId: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    return await this.userService.personagPraise(userId, personagId);
  }

  // 红色遗址点赞
  @ApiOperation({ summary: "红色遗址点赞", description: "红色遗址点赞" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Patch("sitePraise/id=:siteId")
  async sitePraise(@Param("siteId") siteId: string, @User("id") userId: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    return await this.userService.sitePraise(siteId, userId);
  }

  // 查看详细文章HTML
  @ApiOperation({ summary: "查看详细文章HTML", description: "查看详细文章HTML" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findArticleOne/id=:id")
  async findArticleOne(@Res() res: Response, @Param("id") id: string) {
    return await this.userService.findArticleOne(res, id);
  }

  // 查看详细人物HTML
  @ApiOperation({ summary: "查看详细人物HTML", description: "查看详细人物HTML" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findPersonagOne/id=:id")
  async findPersonagOne(@Res() res: Response, @Param("id") id: string) {
    return await this.userService.findPersonagOne(res, id);
  }

  // 查看详细地点HTML
  @ApiOperation({ summary: "查看详细地点HTML", description: "查看详细地点HTML" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findSiteOne/id=:id")
  async findSiteOne(@Res() res: Response, @Param("id") id: string) {
    return await this.userService.findSiteOne(res, id);
  }

  // 查看文章详情数据
  @ApiOperation({ summary: "查看文章详情数据", description: "查看文章详情数据" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findArticleData/id=:id")
  async findArticleData(@Param("id") id: string, @User("id") userId: string, @User("type") userRole: string, @User("name") userName: string) {
    if (!userId || userId === "abnormal" || !userRole || userRole === "abnormal" || !userName || userName === "abnormal") {
      return "abnormal";
    }
    return await this.userService.findArticleData(id, userId, userRole, userName);
  }

  // 查看人物详情数据
  @ApiOperation({ summary: "查看人物详情数据", description: "查看人物详情数据" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findPersonagData/id=:id")
  async findPersonagData(@Param("id") id: string, @User("id") userId: string, @User("type") userRole: string, @User("name") userName: string) {
    if (!userId || userId === "abnormal" || !userRole || userRole === "abnormal" || !userName || userName === "abnormal") {
      return "abnormal";
    }
    return await this.userService.findPersonagData(id, userId, userRole, userName);
  }

  // 查看红色遗址详情数据
  @ApiOperation({ summary: "查看红色遗址详情数据", description: "查看红色遗址详情数据" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findSiteData/id=:id")
  async findSiteData(@Param("id") id: string, @User("id") userId: string, @User("type") userRole: string, @User("name") userName: string) {
    if (!userId || userId === "abnormal" || !userRole || userRole === "abnormal" || !userName || userName === "abnormal") {
      return "abnormal";
    }
    return await this.userService.findSiteData(id, userId, userRole, userName);
  }

  // 查看文章浏览量以及点赞量
  @ApiOperation({ summary: "查看文章浏览量以及点赞量", description: "查看文章浏览量以及点赞量" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findArticleRecord/id=:articleId")
  async findArticleRecord(@Param("articleId") articleId: string) {
    return await this.userService.findArticleRecord(articleId);
  }

  // 查看人物浏览量以及点赞量
  @ApiOperation({ summary: "查看人物浏览量以及点赞量", description: "查看人物浏览量以及点赞量" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findPersonagRecord/id=:personagId")
  async findPersonagRecord(@Param("personagId") personagId: string) {
    return await this.userService.findPersonagRecord(personagId);
  }

  // 查看红色遗址浏览量以及点赞量
  @ApiOperation({ summary: "查看红色遗址浏览量以及点赞量", description: "查看红色遗址浏览量以及点赞量" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get("findSiteRecord/id=:siteId")
  async findSiteRecord(@Param("siteId") siteId: string) {
    return await this.userService.findSiteRecord(siteId);
  }
}
