import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { Response } from "express";

@Injectable()
export class EpiFileService {
    constructor(@Inject("EPI_SERVICE") private readonly epiService: ClientProxy) { }
    // 单文件上传
    async uploadFile(file: Express.Multer.File) {
        const pattern = { cmd: "epi_file_uploadFile" };
        const data = file;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 文件删除
    async removeFile(fileName: string, type: string) {
        const pattern = { cmd: "epi_file_removeFile" };
        const data = { fileName: fileName, type: type };
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 文件查看
    async getFiles(res: Response, fileName: string, type: string) {
        const pattern = { cmd: "epi_file_getFiles" };
        const data = { fileName: fileName, type: type }
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => {
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