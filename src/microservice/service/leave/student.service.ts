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
    const pattern = { cmd: "student_leaveOne" };
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
    const pattern = { cmd: "student_leaveSchoolOne" };
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
    const pattern = { cmd: "student_leaveAll" };
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
    const pattern = { cmd: "student_returnSchoolOne" };
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
    const pattern = { cmd: "student_leaveFileter" };
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
    const pattern = { cmd: "student_leavePresidentFileter" };
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
    const pattern = { cmd: "student_leavePresidentAll" };
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
    const pattern = { cmd: "student_leavePresidentLike" };
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

  // --------------------------------------数据操作----------------------------------------------------

  // 请假单创建
  async createLeave(userUUID: string, createLeaveDto: CreateLeaveDto) {
    const pattern = { cmd: "student_leaveCreate" };
    createLeaveDto.userUUID = userUUID
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
  async updateLeave(userUUID: string, updateLeaveDto: UpdateLeaveDto) {
    const pattern = { cmd: "student_leaveUpdate" };
    updateLeaveDto.userUUID = userUUID
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
  async removeLeave(id: number, studentId: string) {
    const pattern = { cmd: "student_leaveDelete" };
    const data = { id: id, studentId: studentId }

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
  async createLeaveSchool(studentId: string, createLeaveSchoolDto: CreateLeaveSchoolDto) {
    const pattern = { cmd: "student_leaveSchoolCreate" };
    createLeaveSchoolDto.leaveUserId = studentId
    const data = createLeaveSchoolDto

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
  async updateLeaveSchool(studentId: string, updateLeaveSchoolDto: UpdateLeaveSchoolDto) {
    const pattern = { cmd: "student_leaveSchoolUpdate" };
    updateLeaveSchoolDto.leaveUserId = studentId
    const data = updateLeaveSchoolDto

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
  async removeLeaveSchool(leaveSchoolId: string, studentId: string) {
    const pattern = { cmd: "student_leaveSchoolDelete" };
    const data = { leaveSchoolId: leaveSchoolId, studentId: studentId }

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // ----------------------------------------返校单----------------------------------------------------

  // 创建返校单
  async createReturnSchool(createDto: CreateReturnDto) {
    const pattern = { cmd: "student_returnSchoolCreate" };
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
    const pattern = { cmd: "student_returnSchoolUpdate" };
    const data = updateDto

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
  async reomveReturnSchool(id: string, studentId: string) {
    const pattern = { cmd: "student_returnSchoolDelete" };
    const data = { id: id, studentId: studentId }

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }
}