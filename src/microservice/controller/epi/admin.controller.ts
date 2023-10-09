import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EpiClockAdminService } from 'src/microservice/service/epi';
import { AuditReportDto, CreateReportTypeDto, DelReportDto, DelReportTypeDto, FindClassDto, FindClassStuReportDto, FindClassStudentDto, UpdateClockDto, UpdateReportDto, UpdateReportTypeDto } from 'src/microservice/dto/epi/dto/admin.dto';
import { AdminData } from 'src/common';

@Controller('epi/admin')
export class EpiAdminController {
  constructor(private readonly adminService: EpiClockAdminService) { }

  // ------------------------------------------------------公共方法------------------------------------------------------
  // 获取所有学院数据
  @Get("findCampus")
  async findCampus() {
    return await this.adminService.findCampus();
  }

  // 获取用户数量
  @Get("findUserSum")
  async findUserSum() {
    return await this.adminService.findUserSum();
  }

  // ------------------------------------------------------打卡模块------------------------------------------------------
  // 打卡基础数据统计
  @Get("findClockData")
  async findClockData() {
    return await this.adminService.findClockData();
  }

  // 打卡基础数据趋势统计
  @Get("findClockTendency")
  async findClockTendency() {
    return await this.adminService.findClockTendency();
  }

  // 根据学院获取班级的数量
  @Get("findClassSum/campus=:campusId")
  async findClassSum(@Param("campusId") campusId: string, @Query("like") like: string) {
    const findClassDto = new FindClassDto();
    findClassDto.campusId = campusId;
    findClassDto.like = like;
    return await this.adminService.findClassSum(findClassDto);
  }

  // 获取根据学院获取班级下数据
  @Get("findClass/campus=:campusId/time=:time/page=:page")
  async findClass(@Param() findClassDto: FindClassDto, @Query("like") like: string) {
    if (!/^[0-9]*$/.test(findClassDto.page)) {
      return "abnormal";
    }
    findClassDto.page = Number(findClassDto.page);
    findClassDto.like = like;
    return await this.adminService.findClass(findClassDto);
  }

  // 获取某班级的学生总人数
  @Get("findStudentSum/class=:classId")
  async findStudentSum(@Param("classId") classId: string, @Query("like") like: string) {
    return await this.adminService.findStudentSum(classId, like);
  }

  // 获取某班级的打卡状况
  @Get("findClock/class=:classId/time=:time/page=:page")
  async findClock(@Param() findClassStudentDto: FindClassStudentDto, @Query("like") like: string) {
    if (!/^[0-9]*$/.test(findClassStudentDto.page)) {
      return "abnormal";
    }
    findClassStudentDto.page = Number(findClassStudentDto.page);
    findClassStudentDto.like = like;
    return await this.adminService.findClock(findClassStudentDto);
  }

  // 查看详细打卡情况
  @Get("findClockOne/clock=:clockId")
  async findClockOne(@Param("clockId") clockId: any) {
    try {
      clockId = Number(clockId);
    } catch (error) {
      return "abnormal";
    }
    return await this.adminService.findClockOne(clockId);
  }

  // 获取所有打卡类型选项
  @Get("findClockType")
  async findClockType() {
    return await this.adminService.findClockType();
  }

  // 修改打卡记录
  @Patch("updateClockDto")
  async updateClock(@Body() updateClockDto: UpdateClockDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    updateClockDto.adminId = adminId;
    updateClockDto.adminName = adminName;
    return await this.adminService.updateClock(updateClockDto);
  }

  // ------------------------------------------------------报备模块------------------------------------------------------
  // 外出报备基础数据统计
  @Get("findReportData")
  async findReportData() {
    return await this.adminService.findReportData();
  }

  // 获取根据学院获取班级下数据
  @Get("findReportClass/campus=:campusId")
  async findReportClass(@Param("campusId") campusId: string) {
    return await this.adminService.findReportClass(campusId);
  }

  // 获取某班级的报备总数
  @Get("findClassStuReportSum/campus=:campusId/time=:time")
  async findClassStuReportSum(@Param() findClassStuReportDto: FindClassStuReportDto, @Query() { status, typeId, like, classId }: { status: string, typeId: string, like: string, classId: string }) {
    if (status && status !== "-1" && status !== "1" && status !== "2") {
      return "参数错误";
    }
    if (status) {
      findClassStuReportDto.status = Number(status);
    }
    findClassStuReportDto.typeId = typeId;
    findClassStuReportDto.like = like;
    findClassStuReportDto.classId = classId;
    return await this.adminService.findClassStuReportSum(findClassStuReportDto);
  }

  // 获取某班级的报备情况
  @Get("findClassStuReport/campus=:campusId/time=:time/page=:page")
  async findClassStuReport(@Param() findClassStuReportDto: FindClassStuReportDto, @Query() { status, typeId, like, classId }: { status: string, typeId: string, like: string, classId: string }) {
    if (!/^[0-9]*$/.test(findClassStuReportDto.page)) {
      return "abnormal";
    }
    if (status && status !== "-1" && status !== "1" && status !== "2") {
      return "参数错误";
    }
    findClassStuReportDto.page = Number(findClassStuReportDto.page);
    if (status) {
      findClassStuReportDto.status = Number(status);
    }
    findClassStuReportDto.typeId = typeId;
    findClassStuReportDto.like = like;
    findClassStuReportDto.classId = classId;
    return await this.adminService.findClassStuReport(findClassStuReportDto);
  }

  // 外出报备编辑详情
  @Get("findClassStuReportOne/report=:reportId")
  async findClassStuReportOne(@Param("reportId") reportId: string) {
    return await this.adminService.findClassStuReportOne(reportId);
  }

  // 报备详情记录查看
  @Get("findReportOne/report=:reportId")
  async findReportOne(@Param("reportId") reportId: string) {
    return await this.adminService.findReportOne(reportId);
  }

  // 编辑报备单
  @Patch("updateReport")
  async updateReport(@Body() updateReportDto: UpdateReportDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    updateReportDto.adminId = adminId;
    updateReportDto.adminName = adminName;
    return await this.adminService.updateReport(updateReportDto);
  }

  // 删除报备单
  @Delete("delReport")
  async delReport(@Body() delReportDto: DelReportDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    delReportDto.adminId = adminId;
    delReportDto.adminName = adminName;
    return await this.adminService.delReport(delReportDto);
  }

  // 审核报备单
  @Patch("auditReport")
  async auditReport(@Body() auditReportDto: AuditReportDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    auditReportDto.adminId = adminId;
    auditReportDto.adminName = adminName;
    return await this.adminService.auditReport(auditReportDto);
  }

  // 查看报备单类型
  @Get("findReportType")
  async findReportType() {
    return await this.adminService.findReportType();
  }

  // 创建报备单类型
  @Post("createReportType")
  async createReportType(@Body() createReportTypeDto: CreateReportTypeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    createReportTypeDto.adminId = adminId;
    createReportTypeDto.adminName = adminName;
    return await this.adminService.createReportType(createReportTypeDto);
  }

  // 修改报备单类型
  @Patch("updateReportType")
  async updateReportType(@Body() updateReportTypeDto: UpdateReportTypeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    updateReportTypeDto.adminId = adminId;
    updateReportTypeDto.adminName = adminName;
    return await this.adminService.updateReportType(updateReportTypeDto);
  }

  // 删除报备单类型
  @Delete("delReportType/type=:typeId")
  async delReportType(@Param() delReportTypeDto: DelReportTypeDto, @AdminData("id") adminId: string, @AdminData("name") adminName: string) {
    if (!adminId || adminId === "abnormal" || !adminName || adminName === "abnormal") {
      return "abnormal";
    }
    delReportTypeDto.adminId = adminId;
    delReportTypeDto.adminName = adminName;
    return await this.adminService.delReportType(delReportTypeDto);
  }
}
