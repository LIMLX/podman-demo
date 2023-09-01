import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateReportDto, UpdateReportDto } from 'src/microservice/dto/report/student.dto';


@Injectable()
export class StudentService {
  constructor(
    @Inject("REPORT_SERVICE") private readonly reportService: ClientProxy
  ) { }

  // 学生报备创建
  async createReport(createReportDto: CreateReportDto) {
    const pattern = { cmd: "report_student_createReport" };
    const data = createReportDto;
    try {
      const status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 学生修改报备信息---仅在待审批状态
  async updateReport(updateReportDto: UpdateReportDto) {
    const pattern = { cmd: "report_student_updateReport" };
    const data = updateReportDto;
    try {
      const status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 学生的个人查询所有---分页
  async findReport(page: number) {
    const pattern = { cmd: "report_student_findReport" };
    const data = page;
    try {
      const reportData = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return reportData;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 类型查询
  async findType() {
    const pattern = { cmd: "report_student_findType" };
    const data = {};
    try {
      const typeData = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return typeData;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 学生查询详细---学生个人---具有个人信息需配合users模块查询
  async findReportOne(id: string) {
    const pattern = { cmd: "report_student_findReportOne" };
    const data = id;
    try {
      const reportData = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return reportData;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }
}
