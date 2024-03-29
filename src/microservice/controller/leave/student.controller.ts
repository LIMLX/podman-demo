import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Student, StudentRole, StudentRoleGuard, User } from "src/common";
import { CreateLeaveDto, CreateLeaveSchoolDto, CreateReturnDto, FindLeaveFilterDto, UpdateLeaveDto, UpdateLeaveSchoolDto, UpdateReturnDto } from "src/microservice/dto/leave/student.dto";
import { LeaveStudentService } from "src/microservice/service/leave";

@ApiTags("请假学生")
@Controller('leave/student')
@UseGuards(StudentRoleGuard)
export class LeaveStudentController {
  constructor(private readonly studentService: LeaveStudentService) { }
  // 查询详细请假单
  @ApiOperation({ summary: "点击查询详细请假单的接口", description: "获取更详细的请假单详细" })
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @Get('/leaveOne/id=:id')
  async findLeaveOne(@Param('id') id: string) {
    return await this.studentService.findLeaveOne(id);
  }

  // 查询详细离校单
  @ApiOperation({ summary: "点击查询详细离校单的接口", description: "获取更详细的离校单接口" })
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @Get('/leaveSchoolOne/id=:leaveSchoolId')
  async findLeaveSchoolOne(@Param("leaveSchoolId") leaveSchoolId: string) {
    return await this.studentService.findLeaveSchoolOne(leaveSchoolId);
  }

  // 查询详细返校单
  @ApiOperation({ summary: "点击查询详细返校单的接口", description: "获取更详细的返校单接口" })
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @Get('/returnSchoolOne/id=:returnSchoolId')
  async findReturnSchoolOne(@Param("returnSchoolId") returnSchoolId: string) {
    return await this.studentService.findReturnSchoolOne(returnSchoolId)
  }

  // 查询个人所有请假单和离校单
  @ApiOperation({ summary: "学生普通查询的接口", description: "需要bearerAuth--获取学生个人的单" })
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @Get('/leaveAll/page=:page')
  async findLeaveAll(@User('id') studentId: string, @Param("page") page: string) {
    if (!studentId || studentId === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.findLeaveAll(studentId, +page);
  }

  // 个人请假单筛选
  @ApiOperation({ summary: "学生筛选查询的接口", description: "需要bearerAuth--获取学生筛选后的单" })
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @Post('/leaveFileter')
  async findLeaveFileter(@Body() findLeaveFileter: FindLeaveFilterDto, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.findLeaveFileter(studentId, findLeaveFileter);
  }

  // 班长筛选查询
  @ApiOperation({ summary: "班长筛选查询的接口", description: "需要bearerAuth--获取班长所在班级内成员筛选后的单" })
  @StudentRole([{ module: Student.Leave, level: 2 }])
  @Post('/leavePresidentFileter')
  async findLeavePresidentFileter(@Body() findLeaveFileter: FindLeaveFilterDto, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.findLeavePresidentFileter(studentId, findLeaveFileter);
  }

  // 班长的查询,所有请假单
  @ApiOperation({ summary: "班长普通查询的接口", description: "需要bearerAuth--获取班长所在班级学生的单" })
  @StudentRole([{ module: Student.Leave, level: 2 }])
  @Get('/leavePresidentAll/page=:page')
  async findLeavePresidentAll(@Param("page") page: string, @User('id') studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.findLeavePresidentAll(studentId, +page);
  }

  // 班长模糊搜索
  @ApiOperation({ summary: "班长模糊查询的接口", description: "需要bearerAuth--获取对标题和姓名进行模糊查询的单" })
  @StudentRole([{ module: Student.Leave, level: 2 }])
  @Get('/leavePresidentLike/like=:like')
  async findLeavePresidentLike(@User('id') studentId: string, @Param('like') like: string) {
    if (!studentId || studentId === "abnormal") {
      return "abnormal"
    }
    return await this.studentService.findLeavePresidentLike(studentId, like)
  }

  // 获取学生的所负责的辅导员
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "获取学生的所负责的辅导员", description: "获取学生的所负责的辅导员" })
  @Get("getAssistant")
  async getAssistant(@User("id") studentId: string) {
    if (!studentId || studentId === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.getAssistant(studentId);
  }

  // --------------------------------------数据操作----------------------------------------------------

  // 请假单创建
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "学生创建请假单的接口", description: "学生创建新的请假单" })
  @Post('/leaveCreate')
  async createLeave(@Body() createLeaveDto: CreateLeaveDto, @User('id') studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    createLeaveDto.userId = studentId;
    createLeaveDto.userName = studentName;
    return await this.studentService.createLeave(createLeaveDto);
  }

  // 修改请假单
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "学生修改请假单的接口", description: "学生修改请假单" })
  @Patch('/leaveUpdate')
  async updateLeave(@Body() updateLeaveDto: UpdateLeaveDto, @User('id') studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    updateLeaveDto.userId = studentId;
    updateLeaveDto.userName = studentName;
    return await this.studentService.updateLeave(updateLeaveDto);
  }

  // 删除请假单(伪)
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "学生删除请假单(伪)的接口", description: "学生删除请假单(伪)" })
  @Delete('/leaveDelete/id=:id')
  async removeLeave(@Param('id') id: string, @User('id') studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.removeLeave(+id, studentId, studentName);
  }

  // ----------------------------------------离校单----------------------------------------------------

  // 创建离校单
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "学生创建离校单的接口", description: "学生创建新的离校单" })
  @Post('/leaveSchoolCreate')
  async createLeaveSchool(@Body() createLeaveSchoolDto: CreateLeaveSchoolDto, @User('id') studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    createLeaveSchoolDto.leaveUserId = studentId;
    createLeaveSchoolDto.leaveUserName = studentName;
    return await this.studentService.createLeaveSchool(createLeaveSchoolDto);
  }

  // 修改离校单
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "学生修改离校单的接口", description: "学生修改离校单" })
  @Patch('/leaveSchoolUpdate')
  async updateLeaveSchool(@Body() updateLeaveSchoolDto: UpdateLeaveSchoolDto, @User('id') studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    updateLeaveSchoolDto.leaveUserId = studentId;
    updateLeaveSchoolDto.leaveUserName = studentName;
    return await this.studentService.updateLeaveSchool(updateLeaveSchoolDto);
  }

  // 删除离校单(伪)
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "学生删除离校单(伪)的接口", description: "学生删除离校单(伪)" })
  @Delete('/leaveSchoolDelete/id=:id')
  async removeLeaveSchool(@Param("id") leaveSchoolId: string, @User('id') studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.removeLeaveSchool(leaveSchoolId, studentId, studentName);
  }

  // ----------------------------------------返校单----------------------------------------------------

  // 创建返校单
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "学生创建返校单的接口", description: "学生创建返校单" })
  @Post('/returnSchoolCreate')
  async createReturnSchool(@Body() createDto: CreateReturnDto, @User('id') studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    createDto.userId = studentId;
    createDto.userName = studentName;
    return await this.studentService.createReturnSchool(createDto);
  }

  // 修改返校单
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "学生修改返校单的接口", description: "学生修改返校单" })
  @Patch('returnSchoolUpdate')
  async updateReturnSchool(@Body() updateDto: UpdateReturnDto, @User('id') studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    updateDto.userId = studentId;
    updateDto.userName = studentName;
    return await this.studentService.updateReturnSchool(updateDto);
  }

  // 删除返校单(伪)
  @StudentRole([{ module: Student.Leave, level: 1 }])
  @ApiOperation({ summary: "学生删除返校单(伪)的接口", description: "学生删除返校单(伪)" })
  @Delete('returnSchoolDelete/id=:id')
  async reomveReturnSchool(@Param('id') id: string, @User('id') studentId: string, @User("name") studentName: string) {
    if (!studentId || studentId === "abnormal" || !studentName || studentName === "abnormal") {
      return "abnormal";
    }
    return await this.studentService.reomveReturnSchool(id, studentId, studentName);
  }
}