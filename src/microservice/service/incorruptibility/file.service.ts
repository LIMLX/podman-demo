import { Inject, Injectable, Res } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Response } from "express";
import { map } from "rxjs";

@Injectable()
export class IncorruptibilityFileService {
    constructor(
        @Inject("INCORRUPTIBILITY_SERVICE") private readonly incorruptibilityService: ClientProxy
    ) { }

    // 文件上传
    async uploadFile(file: Express.Multer.File, oldFileName?: string) {
        const pattern = { cmd: "incorruptibility_file_uploadFile" };
        const data = file;

        let status = this.incorruptibilityService
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
        const pattern = { cmd: "incorruptibility_file_removeFile" };
        const data = fileName;

        let status = this.incorruptibilityService
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
        const pattern = { cmd: "incorruptibility_file_getFiles" };
        const data = fileName;

        let status = this.incorruptibilityService
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