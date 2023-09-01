import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Response } from "express";

@Injectable()
export class FileService {
  constructor(
    @Inject("REPORT_SERVICE") private readonly reportService: ClientProxy
  ) { }

  // 单文件上传---暂存于临时目录
  async uploadFile(file: Express.Multer.File) {
    const pattern = { cmd: "report_file_uploadFile" };
    const data = file;
    try {
      const status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 文件删除
  async removeFile(fileNum: string) {
    const pattern = { cmd: "report_file_removeFile" };
    const data = fileNum;
    try {
      const status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 文件查看
  async getFiles(res: Response, fileNum: string, type: string) {
    const pattern = { cmd: "report_file_getFiles" };
    const data = { fileName: fileNum, type: type }
    let status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => {
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
    return status;
  }
}
