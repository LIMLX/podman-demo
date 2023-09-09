import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { UpdateStudentPswDto } from "src/microservice/dto";
import { Response } from "express";

@Injectable()
export class UserStudentService {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) { }

  // 学生密码修改
  async updateStudentPsw(updateStudentPswDto: UpdateStudentPswDto) {
    const pattern = { cmd: "users_student_studentUpdatePsw" };
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
    const pattern = { cmd: "users_student_updateAvatar" };
    const data = { file: file, studentNum: studentNum };

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
    const pattern = { cmd: "users_student_getStudentData" };
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
    const pattern = { cmd: "users_student_getStudentAvatar" };
    const data = studentId
    let status = this.userService.send<any>(pattern, data).pipe(map((message: any) => {
      if (message !== "Unknown resource") {
        res.sendFile(message, (err) => {
          if (err) {
            console.log(err);
          }
        })
      } else {
        res.status(400).send(message);
      }
    }))
    return status;
  }
}