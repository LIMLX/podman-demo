import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { CreateStudentDto, LoginStudentDto, UpdateStudentDto, UpdateStudentPswDto } from "src/microservice/dto";
import { Response } from "express";

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

  // 学生信息修改
  async updateStudent(updateStudentDto: UpdateStudentDto) {
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
  async updateStudentPsw(updateStudentPswDto: UpdateStudentPswDto) {
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

  // 修改头像
  async updateAvatar(file: Express.Multer.File, studentNum: string) {
    const pattern = { cmd: "student_updateAvatar" };
    const data = { file: file, studentNum: studentNum }

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return { message: message }
        }
        ))
    return status
  }
  // 学生数据查询
  async getStudentData(studentId: string) {
    const pattern = { cmd: "student_getStudentData" };
    const data = studentId

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return { message: message }
        }
        ))
    return status
  }

  //  头像文件查看
  async getStudentAvatar(res: Response, studentId: string) {
    const pattern = { cmd: "student_getStudentAvatar" };
    const data = studentId
    let status = this.userService.send<any>(pattern, data).pipe(map((message: any) => {
      if (message !== "Unknown resource") {
        res.sendFile(message, (err) => {
          if (err) {
            console.log(err)
          }
        })
      } else {
        res.status(400).send(message)
      }
    }))
    return status
  }
}