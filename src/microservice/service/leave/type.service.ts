import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";

@Injectable()
export class LeaveTypeService {
  constructor(
    @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
  ) { }
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