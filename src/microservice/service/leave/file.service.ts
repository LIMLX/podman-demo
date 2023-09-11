import { Inject, Injectable, Res } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { Response } from "express";

@Injectable()
export class LeaveFileService {
  constructor(
    @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
  ) { }

  // 单文件上传
  async uploadFile(file: Express.Multer.File) {
    const pattern = { cmd: "leave_file_upload" };
    const data = file

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 文件删除
  async removeFile(fileName: string) {
    const pattern = { cmd: "leave_file_delete" };
    const data = fileName

    let status = this.leaveService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 获取文件名及其地址，然后进行返回资源
  async getFiles(@Res() res: Response, fileName: string, type: string) {
    const pattern = { cmd: "leave_file_getImage" };
    const payload = { fileName: fileName, type: type };

    this.leaveService
      .send<any>(pattern, payload)
      .subscribe(meassage => {
        if (meassage !== "Unknown resource") {
          res.sendFile(meassage, (err) => {
            if (err) {
              console.log(err)
              res.status(400).send(meassage);
            }
          })
        } else {
          res.status(400).send(meassage);
        }
      })
  }

  async demo() {
    const pattern = { cmd: "leave_division_demo" };
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