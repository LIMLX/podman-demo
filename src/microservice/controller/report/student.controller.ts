import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from 'src/microservice/service/report';
import { CreateReportDto, UpdateReportDto } from 'src/microservice/dto/report/student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  // 学生报备创建
  @Post("createReport")
  async createReport(@Body() createReportDto: CreateReportDto) {
    return await this.studentService.createReport(createReportDto);
  }

  // 学生修改报备信息---仅在待审批状态---仅限本人操作
  @Patch("updateReport")
  async updateReport(@Body() updateReportDto: UpdateReportDto) {
    return await this.studentService.updateReport(updateReportDto);
  }

  // 学生的个人查询---分页
  @Get("findReport/page=:page")
  async findReport(@Param("page") page: string) {
    return await this.studentService.findReport(+page);
  }

  // 学生查询详细---学生个人---具有个人信息需配合users模块查询
  @Get("findReportOne/id=:id")
  async findReportOne(@Param("id") id: string) {
    return await this.studentService.findReportOne(id);
  }

  // 类型查询
  @Get("findType")
  async findType() {
    return await this.studentService.findType();
  }
}
