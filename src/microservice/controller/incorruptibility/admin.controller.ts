import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { CreateSloganDto, DeleteSloganDto, FindSloganDto, PublisSloganDto, UpdateSloganDto } from 'src/microservice/dto/incorruptibility';
import { IncorruptibilityAdminService } from 'src/microservice/service';
import { Response } from "express";
import { Admin, AdminData, AdminRole, AdminRoleGuard } from 'src/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('爱廉说管理员')
@UseGuards(AdminRoleGuard)
@Controller('incorruptibility/admin')
export class IncorruptibilityAdminController {
  constructor(private readonly adminService: IncorruptibilityAdminService) { }

  // 基础数据查询
  @ApiOperation({ summary: "基础数据查询", description: "基础数据查询" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Get("findSloganBasics")
  async findSloganBasics() {
    return await this.adminService.findSloganBasics();
  }

  // 基础数据趋势查询
  @ApiOperation({ summary: "基础数据趋势查询", description: "基础数据趋势查询" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Get("findSloganTendency")
  async findSloganTendency() {
    return await this.adminService.findSloganTendency();
  }

  // 标语页数查询
  @ApiOperation({ summary: "标语页数查询", description: "标语页数查询" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Get("findSloganSum")
  async findSloganSum(@Query() findSloganDto: FindSloganDto) {
    if (findSloganDto.status) {
      findSloganDto.status = Number(findSloganDto.status);
    }
    return await this.adminService.findSloganSum(findSloganDto);
  }

  // 标语查询
  @ApiOperation({ summary: "标语查询", description: "标语查询" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Get("findSlogan/page=:page")
  async findSlogan(@Param("page") page: string, @Query() findSloganDto: FindSloganDto) {
    if (!/^[0-9]*$/.test(page)) {
      return "abnormal";
    }
    if (findSloganDto.status) {
      findSloganDto.status = Number(findSloganDto.status);
    }
    findSloganDto.page = Number(page);
    return await this.adminService.findSlogan(findSloganDto);
  }

  // 标语详情
  @ApiOperation({ summary: "标语详情", description: "标语详情" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Get("findSloganOne/id=:sloganId")
  async findSloganOne(@Param("sloganId") sloganId: string) {
    return await this.adminService.findSloganOne(sloganId);
  }

  // 标语详情HTML
  @ApiOperation({ summary: "标语详情HTML", description: "标语详情HTML" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Get("findSloganHTML/id=:sloganId")
  async findSloganHTML(@Param("sloganId") sloganId: string, @Res() res: Response) {
    return await this.adminService.findSloganHTML(res, sloganId);
  }

  // 新建标语
  @ApiOperation({ summary: "新建标语", description: "新建标语" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Post("createSlogan")
  async createSlogan(@Body() createSloganDto: CreateSloganDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    // 获取数据
    createSloganDto.adminId = adminId;
    createSloganDto.adminName = adminName;
    return await this.adminService.createSlogan(createSloganDto);
  }

  // 编辑标语
  @ApiOperation({ summary: "编辑标语", description: "编辑标语" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Patch("updateSlogan")
  async updateSlogan(@Body() updateSloganDto: UpdateSloganDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    // 获取数据
    updateSloganDto.adminId = adminId;
    updateSloganDto.adminName = adminName;
    return await this.adminService.updateSlogan(updateSloganDto);
  }

  // 发布标语
  @ApiOperation({ summary: "发布标语", description: "发布标语" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Patch("publisSlogan")
  async publisSlogan(@Body() publisSloganDto: PublisSloganDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    // 获取数据
    publisSloganDto.adminId = adminId;
    publisSloganDto.adminName = adminName;
    return await this.adminService.publisSlogan(publisSloganDto);
  }

  // 删除标语
  @ApiOperation({ summary: "删除标语", description: "删除标语" })
  @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
  @Delete("delSlogan")
  async delSlogan(@Body() deleteSloganDto: DeleteSloganDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    // 获取数据
    deleteSloganDto.adminId = adminId;
    deleteSloganDto.adminName = adminName;
    return await this.adminService.delSlogan(deleteSloganDto);
  }
}
