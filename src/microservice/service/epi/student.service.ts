import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateClockDto, CreateReportDto, UpdateReportDto } from 'src/microservice/dto/epi';
@Injectable()
export class EpiStudentService {
  constructor(
    @Inject("EPI_SERVICE") private readonly epiService: ClientProxy
  ) { }

  // 进行打卡
  async clockIn(createClockDto: CreateClockDto) {
    const pattern = { cmd: "ep_student_clockIn" };
    const data = createClockDto;
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }

  // 返回打卡记录(个人)
  async findClock(userId: string, time: string) {
    const pattern = { cmd: "ep_student_findClock" };
    const data = { userId: userId, time: time };
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }

  // 打卡时显示的多选框(类型)
  async findType() {
    const pattern = { cmd: "ep_student_findType" };
    const data = {};
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }

  // ----------------------------------------------报备模块-----------------------------------------------------------
  // 报备类型查询
  async findReportType() {
    const pattern = { cmd: "ep_student_findReportType" };
    const data = {};
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }

  // 学生报备创建
  async createReport(createReportDto: CreateReportDto) {
    const pattern = { cmd: "ep_student_createReport" };
    const data = createReportDto;
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }

  // 学生修改报备信息---仅在待审批状态---仅限本人操作
  async updateReport(updateReportDto: UpdateReportDto) {
    const pattern = { cmd: "ep_student_updateReport" };
    const data = updateReportDto;
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }

  // 删除个人报备
  async delReport(repairId: string, studentId: string, studentName: string) {
    const pattern = { cmd: "ep_student_delReport" };
    const data = { repairId: repairId, studentId: studentId, studentName: studentName };
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }

  // 报备记录查看
  async findReport(studentId: string, page: number) {
    const pattern = { cmd: "ep_student_findReport" };
    const data = { studentId: studentId, page: page };
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }

  // 报备记录详情查看
  async findReportOne(reportId: string) {
    const pattern = { cmd: "ep_student_findReportOne" };
    const data = { reportId: reportId };
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }

  // 获取学生基础数据
  async findStudent(studentId: string) {
    const pattern = { cmd: "ep_student_findStudent" };
    const data = { studentId: studentId };
    let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
    return status;
  }
}
