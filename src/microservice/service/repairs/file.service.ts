import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { Response } from "express";

@Injectable()
export class RepairsFileService {
    constructor(@Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy) { }
    // 单文件上传 返回文件名分别为---用户工号或学号-uuidv4-年月日-上传人员身份
    async uploadFile(file: Express.Multer.File, repairsId: string, type: string, userNum: string) {
        const pattern = { cmd: "repairs_upload_file" };
        const data = {
            file: file,
            repairsId: repairsId,
            type: type,
            userNum: userNum
        }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 文件删除
    async removeFile(fileName: string, type: string) {
        const pattern = { cmd: "repairs_delete_file" };
        const data = { fileName: fileName, type: type }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
    // 文件查看
    async getFiles(res: Response, fileName: string) {
        const pattern = { cmd: "repairs_find_file" };
        const data = { fileName: fileName }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => {
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
    // 当用户进行删除时点击取消填写工单后
    async autoDeleteFile(repairsId: string) {
        const pattern = { cmd: "repairs_cancel_file" };
        const data = { repairsId: repairsId }
        let status = this.repairsService.send<any>(pattern, data).pipe(map((message: any) => { return message }))
        return status
    }
}