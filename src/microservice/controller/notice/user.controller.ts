import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { User } from 'src/common';
import { FindNoticeOneDto, FindNoticeDto } from 'src/microservice/dto/notice/user.dto';
import { NoticeUserService } from 'src/microservice/service/notice';
import { Response } from 'express'


@Controller('notice/user')
export class NoticeUserController {
  constructor(private readonly userService: NoticeUserService) { }

  // 查看所有通知
  @Get("findNotice/page=:page")
  async findNotice(@Param() findNoticeDto: FindNoticeDto) {
    // 进行页数数据验证和转换
    if (!/^[0-9]*$/.test(findNoticeDto.page)) {
      return "abnormal";
    }
    findNoticeDto.page = Number(findNoticeDto.page);
    return await this.userService.findNotice(findNoticeDto);
  }

  // 查看所有搜索通知
  @Get("findNoticeLike/page=:page")
  async findNoticeLike(@Query("like") like: string, @Param("page") page: any) {
    // 进行页数数据验证和转换
    if (!/^[0-9]*$/.test(page)) {
      return "abnormal";
    }
    page = Number(page);
    return await this.userService.findNoticeLike(like, page);
  }

  // 查看标签通知
  @Get("findNoticeTag/tag=:tagId/page=:page")
  async findNoticeTag(@Param() { tagId, page }: { tagId: string, page: any }) {
    // 进行页数数据验证和转换
    if (!/^[0-9]*$/.test(page)) {
      return "abnormal";
    }
    page = Number(page);
    return await this.userService.findNoticeTag(tagId, page);
  }

  // 查看通知详情
  @Get("findNoticeData/notice=:noticeId")
  async findNoticeData(@Param() findNoticeOneDto: FindNoticeOneDto, @User("id") userId: string, @User("name") userName: string, @User("type") userType: string) {
    if (!userId || userId === "abnormal" || !userName || userName === "abnormal" || !userType || userType === "abnormal") {
      return "abnormal";
    }
    findNoticeOneDto.userId = userId;
    findNoticeOneDto.userName = userName;
    switch (userType) {
      case "employee": findNoticeOneDto.userRole = 1; break;
      case "student": findNoticeOneDto.userRole = 0; break;
    }
    return await this.userService.findNoticeData(findNoticeOneDto);
  }

  // 查看通知详情HTML
  @Get("findNoticeHtml/notice=:noticeId")
  async findNoticeHtml(@Param("noticeId") noticeId: string, @Res() res: Response) {
    return await this.userService.findNoticeHtml(noticeId, res);
  }

  // 热门标签浏览
  @Get("findHotTag")
  async findHotTag() {
    return await this.userService.findHotTag();
  }

  // 侧边栏数据查看
  @Get("findBasicDataSum")
  async findBasicDataSum(@User("id") userId: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    return await this.userService.findBasicDataSum(userId);
  }
}
