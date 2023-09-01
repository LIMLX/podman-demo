import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Response } from "express";

@Injectable()
export class HistoryFileService {

  constructor(
    @Inject("HISTORY_SERVICE") private readonly historyService: ClientProxy
  ) { }

  // 文件上传
  async uploadFile(file: Express.Multer.File, oldFileName?: string) {
    const pattern = { cmd: "history_file_uploadFile" };
    const data = file;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 文件删除
  async removeFile(fileName: string, type?: string) {
    const pattern = { cmd: "history_file_removeFile" };
    const data = fileName;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 文件查看
  async getFiles(res: Response, fileName: string) {
    const pattern = { cmd: "history_file_getFiles" };
    const data = fileName;

    let status = this.historyService
      .send<any>(pattern, data)
      .subscribe(meassage => {
        if (meassage !== "Unknown resource") {
          res.sendFile(meassage, (err) => {
            if (err) {
              console.log(err)
            }
          })
        } else {
          res.status(400).send(meassage)
        }
      })
    return status;
  }
}
