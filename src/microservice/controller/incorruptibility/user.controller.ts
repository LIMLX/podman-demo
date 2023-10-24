import { Body, Controller, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { FindSloganCommentDto, FindSloganOneDto, SloganCommentDto, SloganCommentPraiseDto } from 'src/microservice/dto/incorruptibility';
import { Response } from "express";
import { IncorruptibilityUserService } from 'src/microservice/service';
import { User, UserEnum, UserRole, UserRoleGuard } from 'src/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('爱廉说用户')
@UseGuards(UserRoleGuard)
@Controller('incorruptibility/user')
export class IncorruptibilityUserController {
  constructor(private readonly userService: IncorruptibilityUserService) { }

  // 标语查询
  @ApiOperation({ summary: "标语查询", description: "标语查询" })
  @UserRole([{ module: UserEnum.Incorruptibility, level: 1 }])
  @Get("findSlogan/page=:page")
  async findSlogan(@Param("page") page: number) {
    return await this.userService.findSlogan(page);
  }

  // 标语详情
  @ApiOperation({ summary: "标语详情", description: "标语详情" })
  @UserRole([{ module: UserEnum.Incorruptibility, level: 1 }])
  @Get("findSloganOne/id=:sloganId")
  async findSloganOne(@Param() findSloganOneDto: FindSloganOneDto, @User("id") userId: string, @User("name") userName: string, @User("type") userType: string) {
    if (!userId || userId === "abnormal" || !userName || userName === "abnormal" || !userType || userType === "abnormal") {
      return "abnormal";
    }
    findSloganOneDto.userId = userId;
    findSloganOneDto.userName = userName;
    switch (userType) {
      case "employee": findSloganOneDto.userRole = 1; break;
      case "student": findSloganOneDto.userRole = 0; break;
    }
    return await this.userService.findSloganOne(findSloganOneDto);
  }

  // 标语详情HTML
  @ApiOperation({ summary: "标语详情HTML", description: "标语详情HTML" })
  @UserRole([{ module: UserEnum.Incorruptibility, level: 1 }])
  @Get("findSloganHTML/id=:sloganId")
  async findSloganHTML(@Param("sloganId") sloganId: string, @Res() res: Response) {
    return await this.userService.findSloganHTML(res, sloganId);
  }

  // 进行标语点赞
  @ApiOperation({ summary: "进行标语点赞", description: "进行标语点赞" })
  @UserRole([{ module: UserEnum.Incorruptibility, level: 1 }])
  @Patch("sloganPraise")
  async sloganPraise(@Body() findSloganOneDto: FindSloganOneDto, @User("id") userId: string, @User("name") userName: string, @User("type") userType: string) {
    if (!userId || userId === "abnormal" || !userName || userName === "abnormal" || !userType || userType === "abnormal") {
      return "abnormal";
    }
    findSloganOneDto.userId = userId;
    findSloganOneDto.userName = userName;
    switch (userType) {
      case "employee": findSloganOneDto.userRole = 1; break;
      case "student": findSloganOneDto.userRole = 0; break;
    }
    return await this.userService.sloganPraise(findSloganOneDto);
  }

  // 查询评论区
  @ApiOperation({ summary: "查询评论区", description: "查询评论区" })
  @UserRole([{ module: UserEnum.Incorruptibility, level: 1 }])
  @Get("findSloganComment/id=:sloganId/page=:page")
  async findSloganComment(@Param() findSloganCommentDto: FindSloganCommentDto) {
    if (!/^[0-9]*$/.test(findSloganCommentDto.page)) {
      return "abnormal";
    }
    findSloganCommentDto.page = Number(findSloganCommentDto.page);
    return await this.userService.findSloganComment(findSloganCommentDto);
  }

  // 进行评论
  @ApiOperation({ summary: "进行评论", description: "进行评论" })
  @UserRole([{ module: UserEnum.Incorruptibility, level: 1 }])
  @Post("sloganComment")
  async sloganComment(@Body() sloganCommentDto: SloganCommentDto, @User("id") userId: string, @User("name") userName: string, @User("type") userType: string) {
    if (!userId || userId === "abnormal" || !userName || userName === "abnormal" || !userType || userType === "abnormal") {
      return "abnormal";
    }
    sloganCommentDto.userId = userId;
    sloganCommentDto.userName = userName;
    switch (userType) {
      case "employee": sloganCommentDto.userRole = 1; break;
      case "student": sloganCommentDto.userRole = 0; break;
    }
    return await this.userService.sloganComment(sloganCommentDto);
  }

  // 进行评论点赞
  @ApiOperation({ summary: "进行评论点赞", description: "进行评论点赞" })
  @UserRole([{ module: UserEnum.Incorruptibility, level: 1 }])
  @Patch("sloganCommentPraise")
  async sloganCommentPraise(@Body() sloganCommentPraiseDto: SloganCommentPraiseDto, @User("id") userId: string, @User("name") userName: string, @User("type") userType: string) {
    if (!userId || userId === "abnormal" || !userName || userName === "abnormal" || !userType || userType === "abnormal") {
      return "abnormal";
    }
    sloganCommentPraiseDto.userId = userId;
    sloganCommentPraiseDto.userName = userName;
    switch (userType) {
      case "employee": sloganCommentPraiseDto.userRole = 1; break;
      case "student": sloganCommentPraiseDto.userRole = 0; break;
    }
    return await this.userService.sloganCommentPraise(sloganCommentPraiseDto);
  }
}
