import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from 'src/common';
import { CreateClockDto, CreateReportDto, UpdateReportDto } from 'src/microservice/dto/epi/dto';
import { EpiStudentService } from 'src/microservice/service/epi';

@Controller('epi/student')
export class EpiStudentController {
  constructor(private readonly studentService: EpiStudentService) { }

  // ----------------------------------------------打卡-----------------------------------------------------------

  // 打卡时显示的多选框(类型)
  @Get("findType")
  async findType() {
    return await this.studentService.findType();
  }

  // 进行打卡
  @Post("clockIn")
  async clockIn(@Body() createClockDto: CreateClockDto, @User('id') userId: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal"

    }
    createClockDto.userId = userId;
    return await this.studentService.clockIn(createClockDto);
  }

  // 返回打卡记录(个人)
  @Get("findClock/time=:time")
  async findClock(@Param("time") time: string, @User('id') userId: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal"
    }
    return await this.studentService.findClock(userId, time);
  }

  // ----------------------------------------------报备模块-----------------------------------------------------------
  // 报备类型查询
  @Get("findReportType")
  async findReportType() {
    return await this.studentService.findReportType();
  }

  // 学生报备创建
  @Post("createReport")
  async createReport(@Body() createReportDto: CreateReportDto, @User("id") studentId: string, @User("name") studentName: string, @User("type") studentLevel: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal" || !studentLevel || studentLevel === "abnormal") {
      return "abnormal";
    }
    createReportDto.userId = studentId;
    createReportDto.userName = studentName;
    createReportDto.userLevel = studentLevel === "student" ? 0 : 1;
    return await this.studentService.createReport(createReportDto);
  }

  // 学生修改报备信息---仅在待审批状态---仅限本人操作
  @Patch("updateReport")
  async updateReport(@Body() updateReportDto: UpdateReportDto, @User("id") studentId: string, @User("name") studentName: string, @User("type") studentLevel: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal" || !studentLevel || studentLevel === "abnormal") {
      return "abnormal";
    }
    updateReportDto.userId = studentId;
    updateReportDto.userName = studentName;
    updateReportDto.userLevel = studentLevel === "student" ? 0 : 1;
    return await this.studentService.updateReport(updateReportDto);
  }

  // 删除个人报备
  @Delete("delReport/report=:reportId")
  async delReport(@Param("reportId") repairId: string, @User("id") studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.delReport(repairId, studentId, studentName);
  }

  // 报备记录查看
  @Get("findReport/page=:page")
  async findReport(@User("id") studentId: string, @Param("page") page: any) {
    if (!studentId || studentId === "abnormal") {
      return "abnormal";
    }
    if (!/^[0-9]*$/.test(page)) {
      return "abnormal";
    }
    page = Number(page);
    return await this.studentService.findReport(studentId, page);
  }

  // 报备记录查看
  @Get("findReportOne/report=:reportId")
  async findReportOne(@Param("reportId") reportId: string) {
    return await this.studentService.findReportOne(reportId);
  }

  // 获取学生基础数据
  @Get("findStudent")
  async findStudent(@User("id") studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.findStudent(studentId);
  }
}