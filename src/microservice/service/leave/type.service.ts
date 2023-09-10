import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateSchoolTypeDto, CreateStatusDto, CreateTransportationDto, CreateTypeDto, DeleteSchoolTypeDto, DeleteStatusDto, DeleteTransportationDto, DeleteTypeDto, UpdateSchoolTypeDto, UpdateStatusDto, UpdateTransportationDto, UpdateTypeDto } from "src/microservice/dto/leave/type.dto";

@Injectable()
export class LeaveTypeService {
  constructor(
    @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
  ) { }
  // 创建请假类型
  async createType(createTypeDto: CreateTypeDto) {
    const pattern = { cmd: "type_create" };
    const data = createTypeDto

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 获取请假所有类型
  async findTypeAll() {
    const pattern = { cmd: "type_findAll" };
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

  // 修改请假类型
  async updateType(updateTypeDto: UpdateTypeDto) {
    const pattern = { cmd: "type_update" };
    const data = updateTypeDto

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除请假类型
  async removeType(deleteTypeDto: DeleteTypeDto) {
    const pattern = { cmd: "type_delete" };
    const data = deleteTypeDto

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 创建离校类型
  async createSchoolType(createSchoolType: CreateSchoolTypeDto) {
    const pattern = { cmd: "type_schoolCreate" };
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
    const pattern = { cmd: "type_findSchoolAll" };
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
    const pattern = { cmd: "type_schoolUpdate" };
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
    const pattern = { cmd: "type_schoolDelete" };
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
    const pattern = { cmd: "type_statusCreate" };
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
    const pattern = { cmd: "type_findStatusAll" };
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
    const pattern = { cmd: "type_statusUpdate" };
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
    const pattern = { cmd: "type_statusDelete" };
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
    const pattern = { cmd: "type_transportationCreate" };
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
    const pattern = { cmd: "type_findTransportationAll" };
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
    const pattern = { cmd: "type_transportationUpdate" };
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
    const pattern = { cmd: "type_transportationDelete" };
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
    const pattern = { cmd: "user_getStatus" };
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
    const pattern = { cmd: "user_getLeaveSchoolType" };
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
    const pattern = { cmd: "user_getTransp" };
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