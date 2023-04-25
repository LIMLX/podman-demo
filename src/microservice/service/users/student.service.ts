import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { CreateStudentDto, LoginStudentDto, UpdateStudentDto, UpdateStudentPswDto } from "src/microservice/dto";

@Injectable()
export class UserStudentService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) { }

  // 创建新学生(注册)
  createStudent(createStudentDto: CreateStudentDto) {
    const pattern = { cmd: "student_signIn" };
    const data = createStudentDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return { message: message }
        }
        ))

    return status
  }

  // 学生登录模块
  async loginStudent(loginStudentDto: LoginStudentDto) {
    const pattern = { cmd: "student_login" };
    const data = loginStudentDto
    let token: object

    const observable = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          if (message && message !== "login error" && message !== "abnormal") {
            token = { token: this.jwtService.sign(message) }
            return token
          } else {
            return token = { "message": "Unauthorized" }
          }
        }))

    // 异步执行获取查询的数据
    try {
      await lastValueFrom(observable)
    } catch (error) {
      console.error(error)
    }

    return token
  }

  // 学生信息修改
  updateStudent(updateStudentDto: UpdateStudentDto) {
    const pattern = { cmd: "student_update" };
    const data = updateStudentDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return { message: message }
        }
        ))

    return status
  }

  // 学生密码修改
  updateStudentPsw(updateStudentPswDto: UpdateStudentPswDto) {
    const pattern = { cmd: "student_update_password" };
    const data = updateStudentPswDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return { message: message }
        }
        ))
    return status
  }
}