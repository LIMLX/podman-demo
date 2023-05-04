import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/common";
import { BodyLeaveOneDto, BodyLeaveSchoolOneDto, CreateLeaveDto, CreateLeaveSchoolDto, FindLeaveFilterDto, FindLeavePagingDto, UpdateLeaveDto, UpdateLeaveSchoolDto } from "src/microservice/dto/leave/student.dto";
import { LeaveStudentService } from "src/microservice/service/leave";

@ApiTags("leave")
@Controller('leave/student')
export class LeaveStudentController {
  constructor(private readonly studentService: LeaveStudentService) { }
  // 查询详细请假单
  @ApiOperation({ summary: "点击查询详细请假单的接口", description: "获取更详细的请假单详细" })
  @Get('/leaveOne/id=:id')
  async findLeaveOne(@Param('id') id: string, @Body() { uuid }: BodyLeaveOneDto) {
    return await this.studentService.findLeaveOne(+id, uuid);
  }

  // 查询详细离校单
  @ApiOperation({ summary: "点击查询详细离校单的接口", description: "获取更详细的离校单接口" })
  @Get('/leaveSchoolOne/id=:leaveSchoolId')
  async findLeaveSchoolOne(@Param("leaveSchoolId") leaveSchoolId: string, @Body() { uuid }: BodyLeaveSchoolOneDto) {
    return await this.studentService.findLeaveSchoolOne(+leaveSchoolId, uuid)
  }

  // 查询个人所有请假单和离校单
  @ApiOperation({ summary: "学生普通查询的接口", description: "需要bearerAuth--获取学生个人的单" })
  @Get('/leaveAll/page=:page')
  async findLeaveAll(@User('id') id: string, @Param("page") page: string) {
    if (!id || id === "abnormal") {
      return id
    }
    return await this.studentService.findLeaveAll(id, +page);
  }

  // 个人请假单筛选
  @ApiOperation({ summary: "学生筛选查询的接口", description: "需要bearerAuth--获取学生筛选后的单" })
  @Post('/leaveFileter')
  async findLeaveFileter(@Body() findLeaveFileter: FindLeaveFilterDto, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.findLeaveFileter(studentId, findLeaveFileter)
  }

  // 班长筛选查询
  @ApiOperation({ summary: "班长筛选查询的接口", description: "需要bearerAuth--获取班长所在班级内成员筛选后的单" })
  @Post('/leavePresidentFileter')
  async findLeavePresidentFileter(@Body() findLeaveFileter: FindLeaveFilterDto, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.findLeavePresidentFileter(studentId, findLeaveFileter)
  }

  // 班长的查询,所有请假单
  @ApiOperation({ summary: "班长普通查询的接口", description: "需要bearerAuth--获取班长所在班级学生的单" })
  @Get('/leavePresidentAll/page=:page')
  async findLeavePresidentAll(@Param("page") page: string, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.findLeavePresidentAll(studentId, +page)
  }

  // 班长模糊搜索
  @ApiOperation({ summary: "班长模糊查询的接口", description: "需要bearerAuth--获取对标题和姓名进行模糊查询的单" })
  @Get('/leavePresidentLike/like=:like')
  async findLeavePresidentLike(@User('id') studentId: string, @Param('like') like: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.findLeavePresidentLike(studentId, like)
  }

  // --------------------------------------数据操作----------------------------------------------------

  // 请假单创建
  @ApiOperation({ summary: "学生创建请假单的接口", description: "学生创建新的请假单" })
  @Post('/leaveCreate')
  async createLeave(@Body() createLeaveDto: CreateLeaveDto, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.createLeave(studentId, createLeaveDto);
  }

  // 修改请假单
  @ApiOperation({ summary: "学生修改请假单的接口", description: "学生修改请假单" })
  @Patch('/leaveUpdate')
  async updateLeave(@Body() updateLeaveDto: UpdateLeaveDto, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.updateLeave(studentId, updateLeaveDto);
  }

  // 删除请假单(伪)
  @ApiOperation({ summary: "学生删除请假单(伪)的接口", description: "学生删除请假单(伪)" })
  @Delete('/leaveDelete/id=:id')
  async removeLeave(@Param('id') id: string, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.removeLeave(+id, studentId);
  }

  // ----------------------------------------离校单----------------------------------------------------

  // 创建离校单
  @ApiOperation({ summary: "学生创建离校单的接口", description: "学生创建新的离校单" })
  @Post('/leaveSchoolCreate')
  async createLeaveSchool(@Body() createLeaveSchoolDto: CreateLeaveSchoolDto, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.createLeaveSchool(studentId, createLeaveSchoolDto)
  }

  // 修改离校单
  @ApiOperation({ summary: "学生修改离校单的接口", description: "学生修改离校单" })
  @Patch('/leaveSchoolUpdate')
  async updateLeaveSchool(@Body() updateLeaveSchoolDto: UpdateLeaveSchoolDto, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.updateLeaveSchool(studentId, updateLeaveSchoolDto)
  }

  // 删除离校单(伪)
  @ApiOperation({ summary: "学生删除离校单(伪)的接口", description: "学生删除离校单(伪)" })
  @Delete('/leaveSchoolDelete/id=:id')
  async removeLeaveSchool(@Param("id") leaveSchoolId: string, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return studentId
    }
    return await this.studentService.removeLeaveSchool(+leaveSchoolId, studentId)
  }
}