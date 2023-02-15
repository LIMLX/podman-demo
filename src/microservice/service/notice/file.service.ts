import { Inject, Injectable, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { Response } from "express";
import { map } from "rxjs";

@Injectable()
export class NoticeFileService {
    constructor(
        private readonly config: ConfigService,
        @Inject("NOTICE_SERVICE") private readonly noticeService: ClientProxy
    ){}
    
    // 获取文件名及其地址，然后进行返回资源
    async getFiles(@Res() res: Response,fileName: string) {
        const pattern = { cmd: "notice_files_get" };
        const payload = {fileName: fileName};
        this.noticeService
        .send<any>(pattern, payload)
        .subscribe(meassage => {
            if(meassage !== "Unknown resource") {
                res.sendFile(meassage,(err) => {
                    if(err) {
                        console.log(err)
                    }
                })
            } else {
                res.status(400).send(meassage)
            }
        })
    }

    // 下载文件名及其地址
    async dowFiles(@Res() res: Response,fileName: string) {
        const pattern = { cmd: "notice_files_get" };
        const payload = {fileName: fileName};
        this.noticeService
        .send<any>(pattern, payload)
        .subscribe(meassage => {
            if(meassage !== "Unknown resource") {
                res.download(meassage,(err) => {
                    if(err) {
                        console.log(err)
                    }
                })
            } else {
                res.status(400).send(meassage)
            }
        })
    }

    // 上传文件
    async uploadFiles(file: Express.Multer.File) {
        const pattern = { cmd: "notice_files_upload" };
        const payload = file;
        const path = this.noticeService
        .send<any>(pattern, payload)
        .pipe(map((massage: string) => {
            return massage
        }
        ))
        return path
    }
}