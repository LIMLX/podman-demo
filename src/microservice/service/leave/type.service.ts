import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateSchoolTypeDto, CreateStatusDto, CreateTransportationDto, CreateTypeDto, DeleteSchoolTypeDto, DeleteStatusDto, DeleteTransportationDto, DeleteTypeDto, UpdateSchoolTypeDto, UpdateStatusDto, UpdateTransportationDto, UpdateTypeDto } from "src/microservice/dto/leave/type.dto";

@Injectable()
export class LeaveTypeService {
  constructor(
    @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
  ) { }

  // 创建离校类型
  async createSchoolType(createSchoolType: CreateSchoolTypeDto) {
    const pattern = { cmd: "leave_type_typeSchoolCreate" };
    const data = createSchoolType

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 查询返回所有离校类型
  async findSchoolTypeAll() {
    const pattern = { cmd: "leave_type_findSchoolAll" };
    const data = {}

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改离校类型
  async updateSchoolType(updateSchoolType: UpdateSchoolTypeDto) {
    const pattern = { cmd: "leave_type_schoolUpdate" };
    const data = updateSchoolType

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除离校类型
  async removeSchoolType(deleteSchoolTypeDto: DeleteSchoolTypeDto) {
    const pattern = { cmd: "leave_type_schoolDelete" };
    const data = deleteSchoolTypeDto

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // -----------------------------------状态-----------------------------------------】
  // 创建状态
  async createStatus(createStatus: CreateStatusDto) {
    const pattern = { cmd: "leave_type_statusCreate" };
    const data = createStatus

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 查询所有状态
  async findStatusAll() {
    const pattern = { cmd: "leave_type_findStatusAll" };
    const data = {}

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改状态
  async updateStatus(updateStatus: UpdateStatusDto) {
    const pattern = { cmd: "leave_type_statusUpdate" };
    const data = updateStatus

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除状态
  async removeStatus(deleteStatusDto: DeleteStatusDto) {
    const pattern = { cmd: "leave_type_statusDelete" };
    const data = deleteStatusDto

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // -----------------------------------离校交通方式-----------------------------------------】
  // 创建离校方式
  async createTransportation(createTransportation: CreateTransportationDto) {
    const pattern = { cmd: "leave_type_transportationCreate" };
    const data = createTransportation

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 查询所有离校方式
  async findTransportationAll() {
    const pattern = { cmd: "leave_type_findTransportationAll" };
    const data = {}

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改离校方式
  async updateTransportation(updateTransportation: UpdateTransportationDto) {
    const pattern = { cmd: "leave_type_transportationUpdate" };
    const data = updateTransportation

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除离校方式
  async removeTransportation(deleteTransportationDto: DeleteTransportationDto) {
    const pattern = { cmd: "leave_type_transportationDelete" };
    const data = deleteTransportationDto

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // -----------------------------------用户端获取接口-----------------------------------------

  // 用户获取公共状态值
  async findUserStatus() {
    const pattern = { cmd: "leave_user_getStatus" };
    const data = {}

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 用户获取离校类型值
  async findUserLeaveSchoolType() {
    const pattern = { cmd: "leave_user_getLeaveSchoolType" };
    const data = {}

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 用户获取交通方式
  async findUserTransp() {
    const pattern = { cmd: "leave_user_getTransp" };
    const data = {}

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