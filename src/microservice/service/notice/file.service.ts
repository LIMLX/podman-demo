import { Inject, Injectable, Res } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Response } from "express";
import { map } from "rxjs";

@Injectable()
export class NoticeFileService {
    constructor(
        @Inject("NOTICE_SERVICE") private readonly noticeService: ClientProxy
    ) { }

    // 文件上传
    async uploadFile(file: Express.Multer.File, oldFileName?: string) {
        const pattern = { cmd: "notice_file_uploadFile" };
        const data = file;

        let status = this.noticeService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ));
        return status;
    }

    // 文件删除
    async removeFile(fileName: string, type?: string) {
        const pattern = { cmd: "notice_file_removeFile" };
        const data = fileName;

        let status = this.noticeService
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
        const pattern = { cmd: "notice_file_getFiles" };
        const data = fileName;

        let status = this.noticeService
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

    // 辅导员执行文件数据导出
    async dowFile(res: Response, fileSite: string, fileName: any) {
        const pattern = { cmd: "notice_file_dowFile" };
        const data = { fileSite: fileSite };
        this.noticeService
            .send<any>(pattern, data).subscribe(meassage => {
                if (meassage && meassage !== "abnormal" && meassage !== "Unknown resource") {
                    fileName = encodeURI(fileName);
                    res.setHeader('Content-Type', 'application/octet-stream');
                    res.setHeader('Content-Disposition', `attachment; filename=${fileName.toString("iso8859-1")}`);
                    res.sendFile(meassage, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send(meassage);
                        }
                    })
                } else {
                    res.status(400).send(meassage);
                }
            })
    }
}