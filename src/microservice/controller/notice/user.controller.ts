import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { User, UserEnum, UserRole, UserRoleGuard } from 'src/common';
import { FindNoticeOneDto, FindNoticeDto } from 'src/microservice/dto/notice/user.dto';
import { NoticeUserService } from 'src/microservice/service/notice';
import { Response } from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('通知用户')
@Controller('notice/user')
@UseGuards(UserRoleGuard)
export class NoticeUserController {
  constructor(private readonly userService: NoticeUserService) { }

  // 查看所有通知
  @ApiOperation({ summary: "查看所有通知", description: "查看所有通知" })
  @UserRole([{ module: UserEnum.Notice, level: 1 }])
  @Get("findNotice/page=:page")
  async findNotice(@Param() findNoticeDto: FindNoticeDto, @User("id") userId: string) {
    // 进行页数数据验证和转换
    if (!/^[0-9]*$/.test(findNoticeDto.page)) {
      return "abnormal";
    }
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    findNoticeDto.page = Number(findNoticeDto.page);
    findNoticeDto.userId = userId;
    return await this.userService.findNotice(findNoticeDto);
  }

  // 查看所有搜索通知
  @ApiOperation({ summary: "查看所有搜索通知", description: "查看所有搜索通知" })
  @UserRole([{ module: UserEnum.Notice, level: 1 }])
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
  @ApiOperation({ summary: "查看标签通知", description: "查看标签通知" })
  @UserRole([{ module: UserEnum.Notice, level: 1 }])
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
  @ApiOperation({ summary: "查看通知详情", description: "查看通知详情" })
  @UserRole([{ module: UserEnum.Notice, level: 1 }])
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
  @ApiOperation({ summary: "查看通知详情HTML", description: "查看通知详情HTML" })
  @UserRole([{ module: UserEnum.Notice, level: 1 }])
  @Get("findNoticeHtml/notice=:noticeId")
  async findNoticeHtml(@Param("noticeId") noticeId: string, @Res() res: Response) {
    return await this.userService.findNoticeHtml(noticeId, res);
  }

  // 热门标签浏览
  @ApiOperation({ summary: "热门标签浏览", description: "热门标签浏览" })
  @UserRole([{ module: UserEnum.Notice, level: 1 }])
  @Get("findHotTag")
  async findHotTag() {
    return await this.userService.findHotTag();
  }

  // 侧边栏数据查看
  @ApiOperation({ summary: "侧边栏数据查看", description: "侧边栏数据查看" })
  @UserRole([{ module: UserEnum.Notice, level: 1 }])
  @Get("findBasicDataSum")
  async findBasicDataSum(@User("id") userId: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    return await this.userService.findBasicDataSum(userId);
  }
}
