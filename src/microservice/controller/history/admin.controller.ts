import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateHistoryDto, UpdatePersonagDto, UpdateSiteDto, CreateHistoryDto, CreatePersonagDto, CreateSiteDto } from 'src/microservice/dto/history/admin.dto';
import { HistoryAdminService } from 'src/microservice/service/history';
import { Response } from 'express'
import { Admin, AdminRole, AdminRoleGuard } from 'src/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('党史管理员')
@Controller('history/admin')
@UseGuards(AdminRoleGuard)
export class HistoryAdminController {
  constructor(private readonly adminService: HistoryAdminService) { }

  // --------------------首页--------------------
  // 基础数据获取
  // 文章总量
  @ApiOperation({ summary: "文章总量", description: "文章总量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findArticleSum/type=:type")
  async findArticleSum(@Param("type") type: number) {
    // 转换type
    try {
      type = Number(type);
    } catch (error) {
      return "abnormal";
    }
    return await this.adminService.findArticleSum(type);
  }

  // 文章趋势---对比昨天
  @ApiOperation({ summary: "文章趋势---对比昨天", description: "文章趋势---对比昨天" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findArticleTrend/type=:type")
  async findArticleTrend(@Param("type") type: number) {
    // 转换type
    try {
      type = Number(type);
    } catch (error) {
      return "abnormal";
    }
    return await this.adminService.findArticleTrend(type);
  }

  // 总浏览量
  @ApiOperation({ summary: "总浏览量", description: "总浏览量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findVisitSum/type=:type")
  async findVisitSum(@Param("type") type: number) {
    // 转换type
    try {
      type = Number(type);
    } catch (error) {
      return "abnormal";
    }
    return await this.adminService.findVisitSum(type);
  }

  // 总浏览量趋势---对比昨天
  @ApiOperation({ summary: "总浏览量趋势---对比昨天", description: "总浏览量趋势---对比昨天" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findVisitTrend/type=:type")
  async findVisitTrend(@Param("type") type: number) {
    // 转换type
    try {
      type = Number(type);
    } catch (error) {
      return "abnormal";
    }
    return await this.adminService.findVisitTrend(type);
  }

  // 点赞量
  @ApiOperation({ summary: "点赞量", description: "点赞量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findLikeSum/type=:type")
  async findLikeSum(@Param("type") type: number) {
    // 转换type
    try {
      type = Number(type);
    } catch (error) {
      return "abnormal";
    }
    return await this.adminService.findLikeSum(type);
  }

  // 点赞量趋势---对比昨天
  @ApiOperation({ summary: "点赞量趋势---对比昨天", description: "点赞量趋势---对比昨天" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findLikeTrend/type=:type")
  async findLikeTrend(@Param("type") type: number) {
    // 转换type
    try {
      type = Number(type);
    } catch (error) {
      return "abnormal";
    }
    return await this.adminService.findLikeTrend(type);
  }

  // 实时动态---点赞人
  @ApiOperation({ summary: "实时动态---点赞人", description: "实时动态---点赞人" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findRealTime")
  async findRealTime() {
    return await this.adminService.findRealTime();
  }

  // 当前搜索的文章数量
  @ApiOperation({ summary: "当前搜索的文章数量", description: "当前搜索的文章数量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findArticleSize")
  async findArticleSize(@Query("like") like: string) {
    return await this.adminService.findArticleSize(like);
  }

  // 分页显示全部文章
  @ApiOperation({ summary: "分页显示全部文章", description: "分页显示全部文章" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findArticleAll/page=:page")
  async findArticleAll(@Param("page") page: number, @Query("like") like: string) {
    return await this.adminService.findArticleAll(page, like);
  }

  // 创建文章
  @ApiOperation({ summary: "创建文章", description: "创建文章" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Post("createArticle")
  @UseInterceptors(FileInterceptor('file'))
  async createArticle(@UploadedFile() file: Express.Multer.File, @Body() createHistoryDto: CreateHistoryDto) {
    // 进行string数据转换成json的转换
    if (createHistoryDto.addFile) {
      try {
        createHistoryDto.addFile = JSON.parse(createHistoryDto.addFile);
      } catch (error) {
        return "abnormal";
      }
    }
    // 验证1.5mb上传
    if (file.size >= 1024 * 1024 * 1.5) {
      return "文件大小大于1.5MB";
    }
    // 进行定时判断
    if (createHistoryDto.appointmentTime === '') {
      createHistoryDto.appointmentTime = undefined;
    }
    return await this.adminService.createArticle(file, createHistoryDto);
  }

  // 删除文章
  @ApiOperation({ summary: "删除文章", description: "删除文章" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Delete("delArticle/id=:historyId")
  async delArticle(@Param("historyId") historyId: string) {
    return await this.adminService.delArticle(historyId);
  }

  // 查询文章HTML内容
  @ApiOperation({ summary: "查询文章HTML内容", description: "查询文章HTML内容" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findArticleOne/id=:articleId")
  async findArticleOne(@Res() res: Response, @Param("articleId") articleId: string) {
    return await this.adminService.findArticleOne(res, articleId);
  }

  // 查看文章浏览量以及点赞量
  @ApiOperation({ summary: "查看文章浏览量以及点赞量", description: "查看文章浏览量以及点赞量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findArticleRecord/id=:articleId")
  async findArticleRecord(@Param("articleId") articleId: string) {
    return await this.adminService.findArticleRecord(articleId);
  }

  // 修改文章内容
  @ApiOperation({ summary: "修改文章内容", description: "修改文章内容" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("updateArticle")
  async updateArticle(@Body() updateArticle: UpdateHistoryDto) {
    return await this.adminService.updateArticle(updateArticle);
  }

  // 修改文章封面
  @ApiOperation({ summary: "修改文章封面", description: "修改文章封面" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("updateCover/id=:articleId")
  @UseInterceptors(FileInterceptor('file'))
  async updateCover(@UploadedFile() file: Express.Multer.File, @Param("articleId") articleId: string) {
    // 验证1.5mb上传
    if (file.size >= 1024 * 1024 * 1.5) {
      return "文件大小大于1.5MB";
    }
    return await this.adminService.updateCover(file, articleId);
  }

  // 查看待发文章
  @ApiOperation({ summary: "查看待发文章", description: "查看待发文章" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPendingArticleAll/page=:page")
  async findPendingArticleAll(@Param("page") page: number, @Query("like") like: string) {
    return await this.adminService.findPendingArticleAll(page, like);
  }

  // 查看代发文章数量
  @ApiOperation({ summary: "查看代发文章数量", description: "查看代发文章数量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPendingArticleSum")
  async findPendingArticleSum(@Query("like") like: string) {
    return await this.adminService.findPendingArticleSum(like);
  }

  // 发布文章
  @ApiOperation({ summary: "发布文章", description: "发布文章" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("publishArticle/id=:articleId")
  async publishArticle(@Param("articleId") articleId: string) {
    return await this.adminService.publishArticle(articleId);
  }

  // 批量发布
  @ApiOperation({ summary: "批量发布", description: "批量发布" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("publishArticleAll")
  async publishArticleAll(@Body("idArr") idArr: string[]) {
    return await this.adminService.publishArticleAll(idArr);
  }

  // -------------------人物------------------------
  // 基础数据获取
  // 人物总量获取
  @ApiOperation({ summary: "人物总量获取", description: "人物总量获取" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPersonagSum")
  async findPersonagSum() {
    return await this.adminService.findPersonagSum();
  }

  // 人物趋势---对比昨天
  @ApiOperation({ summary: "人物趋势---对比昨天", description: "人物趋势---对比昨天" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPersonagTrend")
  async findPersonagTrend() {
    return await this.adminService.findPersonagTrend();
  }

  // 人物总浏览量
  @ApiOperation({ summary: "人物总浏览量", description: "人物总浏览量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPersonagVisitSum")
  async findPersonagVisitSum() {
    return await this.adminService.findPersonagVisitSum();
  }

  // 人物总浏览量趋势---对比昨天
  @ApiOperation({ summary: "人物总浏览量趋势---对比昨天", description: "人物总浏览量趋势---对比昨天" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPersonagVisitTrend")
  async findPersonagVisitTrend() {
    return await this.adminService.findPersonagVisitTrend();
  }

  // 人物实时动态---点赞人
  @ApiOperation({ summary: "人物实时动态---点赞人", description: "人物实时动态---点赞人" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPersonagRealTime")
  async findPersonagRealTime() {
    return await this.adminService.findPersonagRealTime();
  }

  // 当前搜索的人物数量
  @ApiOperation({ summary: "当前搜索的人物数量", description: "当前搜索的人物数量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPersonagSize")
  async findPersonagSize(@Query("like") like: string) {
    return await this.adminService.findPersonagSize(like);
  }

  // 分页显示全部人物
  @ApiOperation({ summary: "分页显示全部人物", description: "分页显示全部人物" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPersonagAll/page=:page")
  async findPersonagAll(@Param("page") page: number, @Query("like") like: string) {
    return await this.adminService.findPersonagAll(page, like);
  }

  // 查看详细人物HTML
  @ApiOperation({ summary: "查看详细人物HTML", description: "查看详细人物HTML" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPersonagOne/id=:id")
  async findPersonagOne(@Res() res: Response, @Param("id") id: string) {
    return await this.adminService.findPersonagOne(res, id);
  }

  // 查看待发人物
  @ApiOperation({ summary: "查看待发人物", description: "查看待发人物" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPendingPersonagAll/page=:page")
  async findPendingPersonagAll(@Param("page") page: number, @Query("like") like: string) {
    return await this.adminService.findPendingPersonagAll(page, like);
  }

  // 查看待发人物数量
  @ApiOperation({ summary: "查看待发人物数量", description: "查看待发人物数量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPendingPersonagSum")
  async findPendingPersonagSum(@Query("like") like: string) {
    return await this.adminService.findPendingPersonagSum(like);
  }

  // 发布人物
  @ApiOperation({ summary: "发布人物", description: "发布人物" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("publishPersonag/id=:personagId")
  async publishPersonag(@Param("personagId") personagId: string) {
    return await this.adminService.publishPersonag(personagId);
  }

  // 批量发布
  @ApiOperation({ summary: "批量发布", description: "批量发布" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("publishPersonagAll")
  async publishPersonagAll(@Body("idArr") idArr: string[]) {
    return await this.adminService.publishPersonagAll(idArr);
  }

  // 创建人物文章
  @ApiOperation({ summary: "创建人物文章", description: "创建人物文章" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Post("createPersonag")
  @UseInterceptors(FileInterceptor('file'))
  async createPersonag(@UploadedFile() file: Express.Multer.File, @Body() createPersonagDto: CreatePersonagDto) {
    // 进行string数据转换成json的转换
    try {
      if (createPersonagDto.addFile) {
        createPersonagDto.addFile = JSON.parse(createPersonagDto.addFile);
      }
      if (createPersonagDto.tag) {
        createPersonagDto.tag = JSON.parse(createPersonagDto.tag);
      }
    } catch (error) {
      return "abnormal";
    }
    // 验证1.5mb上传
    if (file.size >= 1024 * 1024 * 1.5) {
      return "文件大小大于1.5MB";
    }
    // 进行定时判断
    if (createPersonagDto.appointmentTime === '') {
      createPersonagDto.appointmentTime = undefined;
    }
    // 进行数据转换
    if (typeof createPersonagDto.die === "string") {
      createPersonagDto.die = Number(createPersonagDto.die);
    }
    if (typeof createPersonagDto.gender === "string") {
      createPersonagDto.gender = Number(createPersonagDto.gender);
    }
    return await this.adminService.createPersonag(file, createPersonagDto);
  }

  // 获取民族信息
  @ApiOperation({ summary: "获取民族信息", description: "获取民族信息" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findNation")
  async findNation() {
    return await this.adminService.findNation();
  }

  // 修改人物封面
  @ApiOperation({ summary: "修改人物封面", description: "修改人物封面" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("updatePersonagCover/id=:personagId")
  @UseInterceptors(FileInterceptor('file'))
  async updatePersonagCover(@UploadedFile() file: Express.Multer.File, @Param("personagId") personagId: string) {
    // 验证1.5mb上传
    if (file.size >= 1024 * 1024 * 1.5) {
      return "文件大小大于1.5MB";
    }
    return await this.adminService.updatePersonagCover(file, personagId);
  }

  // 删除人物
  @ApiOperation({ summary: "删除人物", description: "删除人物" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Delete("delPersonag/id=:personagId")
  async delPersonag(@Param("personagId") personagId: string) {
    return await this.adminService.delPersonag(personagId);
  }

  // 查看人物浏览量以及点赞量
  @ApiOperation({ summary: "查看人物浏览量以及点赞量", description: "查看人物浏览量以及点赞量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPersonagRecord/id=:personagId")
  async findPersonagRecord(@Param("personagId") personagId: string) {
    return await this.adminService.findPersonagRecord(personagId);
  }

  // 修改人物内容
  @ApiOperation({ summary: "修改人物内容", description: "修改人物内容" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("updatePersonag")
  async updatePersonag(@Body() updatePersonag: UpdatePersonagDto) {
    return await this.adminService.updatePersonag(updatePersonag)
  }

  // 红色遗址(地点)
  // 基础数据获取
  // 地点总量获取
  @ApiOperation({ summary: "地点总量获取", description: "地点总量获取" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findSiteSum")
  async findSiteSum() {
    return await this.adminService.findSiteSum();
  }

  // 地点趋势---对比昨天
  @ApiOperation({ summary: "地点趋势---对比昨天", description: "地点趋势---对比昨天" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findSiteTrend")
  async findSiteTrend() {
    return await this.adminService.findSiteTrend();
  }

  // 地点总浏览量
  @ApiOperation({ summary: "地点总浏览量", description: "地点总浏览量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findSiteVisitSum")
  async findSiteVisitSum() {
    return await this.adminService.findSiteVisitSum();
  }

  // 地点总浏览量趋势---对比昨天
  @ApiOperation({ summary: "地点总浏览量趋势---对比昨天", description: "地点总浏览量趋势---对比昨天" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findSiteVisitTrend")
  async findSiteVisitTrend() {
    return await this.adminService.findSiteVisitTrend();
  }

  // 地点实时动态---点赞人
  @ApiOperation({ summary: "地点实时动态---点赞人", description: "地点实时动态---点赞人" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findSiteRealTime")
  async findSiteRealTime() {
    return await this.adminService.findSiteRealTime();
  }

  // 当前搜索的地点数量
  @ApiOperation({ summary: "当前搜索的地点数量", description: "当前搜索的地点数量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findSiteSize")
  async findSiteSize(@Query("like") like: string) {
    return await this.adminService.findSiteSize(like);
  }

  // 分页显示全部地点
  @ApiOperation({ summary: "分页显示全部地点", description: "分页显示全部地点" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findSiteAll/page=:page")
  async findSiteAll(@Param("page") page: number, @Query("like") like: string) {
    return await this.adminService.findSiteAll(page, like);
  }

  // 查看详细地点HTML
  @ApiOperation({ summary: "查看详细地点HTML", description: "查看详细地点HTML" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findSiteOne/id=:id")
  async findSiteOne(@Res() res: Response, @Param("id") id: string) {
    return await this.adminService.findSiteOne(res, id);
  }

  // 查看待发地点
  @ApiOperation({ summary: "查看待发地点", description: "查看待发地点" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPendingSiteAll/page=:page")
  async findPendingSiteAll(@Param("page") page: number, @Query("like") like: string) {
    return await this.adminService.findPendingSiteAll(page, like);
  }

  // 查看代发地点数量
  @ApiOperation({ summary: "查看代发地点数量", description: "查看代发地点数量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findPendingSiteSum")
  async findPendingSiteSum(@Query("like") like: string) {
    return await this.adminService.findPendingSiteSum(like);
  }

  // 发布地点
  @ApiOperation({ summary: "发布地点", description: "发布地点" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("publishSite/id=:siteId")
  async publishSite(@Param("siteId") siteId: string) {
    return await this.adminService.publishSite(siteId);
  }

  // 批量发布
  @ApiOperation({ summary: "批量发布", description: "批量发布" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("publishSiteAll")
  async publishSiteAll(@Body("idArr") idArr: string[]) {
    return await this.adminService.publishSiteAll(idArr);
  }

  // 创建地点
  @ApiOperation({ summary: "创建地点", description: "创建地点" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Post("createSite")
  async createSite(@Body() createSiteDto: CreateSiteDto) {
    return await this.adminService.createSite(createSiteDto);
  }

  // 修改地点
  @ApiOperation({ summary: "修改地点", description: "修改地点" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Patch("updateSite")
  async updateSite(@Body() updateSiteDto: UpdateSiteDto) {
    return await this.adminService.updateSite(updateSiteDto);
  }

  // 删除地点
  @ApiOperation({ summary: "删除地点", description: "删除地点" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Delete("delSite/id=:siteId")
  async delSite(@Param("siteId") siteId: string) {
    return await this.adminService.delSite(siteId);
  }

  // 查看地点浏览量以及点赞量
  @ApiOperation({ summary: "查看地点浏览量以及点赞量", description: "查看地点浏览量以及点赞量" })
  @AdminRole([{ admin: Admin.History, level: 1 }])
  @Get("findSiteRecord/id=:siteId")
  async findSiteRecord(@Param("siteId") siteId: string) {
    return await this.adminService.findSiteRecord(siteId);
  }
}
