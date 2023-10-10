import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { AdminData } from 'src/common';
import { CreateNoticeDto, CreateNoticeTagDto, DelNotcieDto, DelNoticeTagDto, FindNoticeDto, PublishNoticeDto, UpdateNoticeDto, UpdateNoticeTagDto } from "src/microservice/dto/notice/admin.dto";
import { NoticeAdminService } from 'src/microservice/service/notice';
import { Response } from 'express'

@Controller('notice/admin')
export class NoticeAdminController {
  constructor(private readonly adminService: NoticeAdminService) { }

  // 基础数据
  @Get("findNoticeBasics")
  async findNoticeBasics(@AdminData("id") userId: string, @Query("status") status: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    if (status) {
      userId = undefined;
    }
    return await this.adminService.findNoticeBasics(userId);
  }

  // 基础数据趋势
  @Get("findNoticeTendency")
  async findNoticeTendency(@AdminData("id") userId: string, @Query("status") status: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    if (status) {
      userId = undefined;
    }
    return await this.adminService.findNoticeTendency(userId);
  }

  // 热门标签
  @Get("findHotTag")
  async findHotTag() {
    return await this.adminService.findHotTag();
  }

  // 查询通知数据
  @Get("findNotice/page=:page")
  async findNotice(@Param("page") page: string, @Query() findNoticeDto: FindNoticeDto) {
    // 进行页数数据验证和转换
    if (!/^[0-9]*$/.test(page)) {
      return "abnormal";
    }
    findNoticeDto.page = Number(page);
    // 进行类型转换
    if (findNoticeDto.status || findNoticeDto.status === 0) {
      findNoticeDto.status = Number(findNoticeDto.status);
    }
    return await this.adminService.findNotice(findNoticeDto);
  }

  // 查询通知数量
  @Get("findNoticeSum")
  async findNoticeSum(@Query() findNoticeDto: FindNoticeDto) {
    // 进行类型转换
    if (findNoticeDto.status || findNoticeDto.status === 0) {
      findNoticeDto.status = Number(findNoticeDto.status);
    }
    return await this.adminService.findNoticeSum(findNoticeDto);
  }

  // 查询某篇文章的浏览量与点赞量
  @Get("findNoticeRecord/notice=:noticeId")
  async findNoticeRecord(@Param("noticeId") noticeId: string) {
    return await this.adminService.findNoticeRecord(noticeId);
  }

  // 查看详细通知
  @Get("findNoticeOne/notice=:noticeId")
  async findNoticeOne(@Param("noticeId") noticeId: string) {
    return await this.adminService.findNoticeOne(noticeId);
  }

  // 查看通知HTML
  @Get("findNoticeHtml/notice=:noticeId")
  async findNoticeHtml(@Param("noticeId") noticeId: string, @Res() res: Response) {
    return await this.adminService.findNoticeHtml(noticeId, res);
  }

  // 发布通知
  @Patch("publishNotice")
  async publishNotice(@Body() publishNoticeDto: PublishNoticeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    publishNoticeDto.adminId = adminId;
    publishNoticeDto.adminName = adminName;
    return await this.adminService.publishNotice(publishNoticeDto);
  }

  // 删除通知
  @Delete("delNotice")
  async delNotice(@Body() delNotcieDto: DelNotcieDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    delNotcieDto.adminId = adminId;
    delNotcieDto.adminName = adminName;
    return await this.adminService.delNotice(delNotcieDto);
  }

  // 新建通知
  @Post("createNotice")
  async createNotice(@Body() createNoticeDto: CreateNoticeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    createNoticeDto.adminId = adminId;
    createNoticeDto.adminName = adminName;
    createNoticeDto.noticeIssuerId = adminId;
    return await this.adminService.createNotice(createNoticeDto);
  }

  // 修改通知
  @Patch("updateNotice")
  async updateNotice(@Body() updateNoticeDto: UpdateNoticeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    updateNoticeDto.adminId = adminId;
    updateNoticeDto.adminName = adminName;
    return await this.adminService.updateNotice(updateNoticeDto);
  }

  // 查看所有通知标签
  @Get("findNoticeTag")
  async findNoticeTag() {
    return await this.adminService.findNoticeTag();
  }

  // 创建新通知标签
  @Post("createNoticeTag")
  async createNoticeTag(@Body() createNoticeTagDto: CreateNoticeTagDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    createNoticeTagDto.adminId = adminId;
    createNoticeTagDto.adminName = adminName;
    return await this.adminService.createNoticeTag(createNoticeTagDto);
  }

  // 编辑标签
  @Patch("updateNoticeTag")
  async updateNoticeTag(@Body() updateNoticeTagDto: UpdateNoticeTagDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    updateNoticeTagDto.adminId = adminId;
    updateNoticeTagDto.adminName = adminName;
    return await this.adminService.updateNoticeTag(updateNoticeTagDto);
  }

  // 删除通知
  @Delete("delNoticeTag")
  async delNoticeTag(@Body() delNoticeTagDto: DelNoticeTagDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    delNoticeTagDto.adminId = adminId;
    delNoticeTagDto.adminName = adminName;
    return await this.adminService.delNoticeTag(delNoticeTagDto);
  }

  // 获取当前发布的管理员所在部门或者学院
  @Get("findAdminRole")
  async findAdminRole(@AdminData("id") adminId: string, @AdminData("role") adminRole: any) {
    if (!adminId || adminId === "abnormal" || !adminRole || adminRole === "abnormal") {
      return "abnormal";
    }
    switch (adminRole) {
      case "employee": adminRole = 1; break;
      case "student": adminRole = 0; break;
      default: return "海软易班";
    }
    return await this.adminService.findAdminRole(adminId, adminRole);
  }
}
