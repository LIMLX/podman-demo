import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { Response } from "express";

@Injectable()
export class RepairsFileService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }
    // 单文件上传
    async uploadFile(file: Express.Multer.File) {
        const pattern = { cmd: "repairs_file_uploadFile" };
        const data = file;
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 文件删除
    async removeFile(fileName: string, type: string) {
        const pattern = { cmd: "repairs_file_removeFile" };
        const data = { fileName: fileName, type: type };
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 文件查看
    async getFiles(res: Response, fileName: string, type: string) {
        const pattern = { cmd: "repairs_file_getFiles" };
        const data = { fileName: fileName, type: type }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => {
            if (message !== "Unknown resource") {
                res.sendFile(message, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            } else {
                res.status(400).send(message);
            }
        }))
        return status;
    }
}