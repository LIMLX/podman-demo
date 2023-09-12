import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateLeaveDto, CreateLeaveSchoolDto, CreateReturnDto, FindLeaveFilterDto, FindLeavePagingDto, UpdateLeaveDto, UpdateLeaveSchoolDto, UpdateReturnDto } from "src/microservice/dto/leave/student.dto";

@Injectable()
export class LeaveStudentService {
  constructor(
    @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
  ) { }
  // 查询详细请假单
  async findLeaveOne(id: string) {
    const pattern = { cmd: "leave_student_leaveOne" };
    const data = id

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 查询详细离校单
  async findLeaveSchoolOne(leaveSchoolId: string) {
    const pattern = { cmd: "leave_student_leaveSchoolOne" };
    const data = leaveSchoolId

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 查询个人所有请假单和离校单
  async findLeaveAll(id: string, page: number) {
    const pattern = { cmd: "leave_student_leaveAll" };
    const data = { id: id, page: page }

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 查询详细返校单
  async findReturnSchoolOne(returnSchoolId: string) {
    const pattern = { cmd: "leave_student_returnSchoolOne" };
    const data = returnSchoolId

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 个人请假单筛选
  async findLeaveFileter(studentId: string, findLeaveFileter: FindLeaveFilterDto) {
    const pattern = { cmd: "leave_student_leaveFileter" };
    findLeaveFileter.studentId = studentId
    const data = findLeaveFileter

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 班长筛选查询
  async findLeavePresidentFileter(studentId: string, findLeaveFileter: FindLeaveFilterDto) {
    const pattern = { cmd: "leave_student_leavePresidentFileter" };
    findLeaveFileter.studentId = studentId
    const data = findLeaveFileter

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 班长的查询,所有请假单
  async findLeavePresidentAll(studentId: string, page: number) {
    const pattern = { cmd: "leave_student_leavePresidentAll" };
    const data = { studentId: studentId, page: page }

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 班长模糊搜索
  async findLeavePresidentLike(studentId: string, like: string) {
    const pattern = { cmd: "leave_student_leavePresidentLike" };
    const data = { studentId: studentId, like: like }

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }
  // 获取学生的所负责的辅导员
  async getAssistant(studentId: string) {
    const pattern = { cmd: "leave_student_getAssistant" };
    const data = studentId;

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // --------------------------------------数据操作----------------------------------------------------

  // 请假单创建
  async createLeave(createLeaveDto: CreateLeaveDto) {
    const pattern = { cmd: "leave_student_leaveCreate" };
    const data = createLeaveDto

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改请假单
  async updateLeave(updateLeaveDto: UpdateLeaveDto) {
    const pattern = { cmd: "leave_student_leaveUpdate" };
    const data = updateLeaveDto

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除请假单(伪)
  async removeLeave(id: number, studentId: string, studentName: string) {
    const pattern = { cmd: "leave_student_leaveDelete" };
    const data = { id: id, studentId: studentId, studentName: studentName }

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // ----------------------------------------离校单----------------------------------------------------

  // 创建离校单
  async createLeaveSchool(createLeaveSchoolDto: CreateLeaveSchoolDto) {
    const pattern = { cmd: "leave_student_leaveSchoolCreate" };
    const data = createLeaveSchoolDto;

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改离校单
  async updateLeaveSchool(updateLeaveSchoolDto: UpdateLeaveSchoolDto) {
    const pattern = { cmd: "leave_student_leaveSchoolUpdate" };
    const data = updateLeaveSchoolDto;

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除离校单(伪)
  async removeLeaveSchool(leaveSchoolId: string, studentId: string, studentName: string) {
    const pattern = { cmd: "leave_student_leaveSchoolDelete" };
    const data = { leaveSchoolId: leaveSchoolId, studentId: studentId, studentName: studentName }

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status;
  }

  // ----------------------------------------返校单----------------------------------------------------

  // 创建返校单
  async createReturnSchool(createDto: CreateReturnDto) {
    const pattern = { cmd: "leave_student_returnSchoolCreate" };
    const data = createDto

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改返校单
  async updateReturnSchool(updateDto: UpdateReturnDto) {
    const pattern = { cmd: "leave_student_returnSchoolUpdate" };
    const data = updateDto;

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除返校单(伪)
  async reomveReturnSchool(id: string, studentId: string, studentName: string) {
    const pattern = { cmd: "leave_student_returnSchoolDelete" };
    const data = { id: id, studentId: studentId, studentName: studentName }

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status;
  }
}