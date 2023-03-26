import { Inject, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ClientProxy } from "@nestjs/microservices"
import { lastValueFrom, map } from "rxjs"
import { CreateEmployeeDto, LoginEmloyeeDto, UpdateEmployeeDto, UpdateEmployeePswDto } from "src/microservice/dto"

@Injectable()
export class UserEmployeeService {

  constructor(
        private readonly jwtService: JwtService,
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ){}

  // 职工登录
  async loginEmployee (loginEmloyeeDto : LoginEmloyeeDto) {
    const pattern = { cmd: "employee_login" };
    const data = loginEmloyeeDto


    let token : any

    let status = this.userService
    .send<any>(pattern,data)
    .pipe(
      map((message: any) => {
        if (message) {
          token = {token: this.jwtService.sign(message)}
          return token
        } else {
          return token = {"message": "Unauthorized"}
        }
      }
    ))

    try {
      await lastValueFrom(status)
    } catch (error) {
      console.error(error)
    }
    return token
  }

  // 创建新职工(注册)
  async signInEmployee (createEmployeeDto: CreateEmployeeDto) {
    const pattern = { cmd: "employee_create" };
    const data = createEmployeeDto

    let status = this.userService
    .send<any>(pattern,data)
    .pipe(
      map((message: any) => {
        return message
      }
    ))
    return status
  }

  // 修改职工信息
  async updateEmployee (updateEmployeeDto: UpdateEmployeeDto) {
    const pattern = { cmd: "employee_update" };
    const data = updateEmployeeDto

    let status = this.userService
    .send<any>(pattern,data)
    .pipe(
      map((message: any) => {
        return message
      }
    ))
    return status
  }

  // 修改职工密码
  async updateEmployeePsw (updateEmployeePswDto: UpdateEmployeePswDto) {
    const pattern = { cmd: "employee_updatePsw" };
    const data = updateEmployeePswDto

    let status = this.userService
    .send<any>(pattern,data)
    .pipe(
      map((message: any) => {
        return message
      }
    ))
    return status
  }

  // 获取所有职工的基础信息
  async findEmployeeAll () {
    const pattern = { cmd: "employee_findAll" };
    const data = {}

    let status = this.userService
    .send<any>(pattern,data)
    .pipe(
      map((message: any) => {
        return message
      }
    ))
    return status
  }
}