import { Inject, Injectable, Res } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { Response } from "express";

@Injectable()
export class LeaveFileService{
    constructor(
        @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
    ){}

    // 单文件上传
    async uploadFile (file: Express.Multer.File) {
        const pattern = { cmd: "file_upload" };
        const data = file
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 文件删除
    async removeFile (fileName: string) {
        const pattern = { cmd: "file_delete" };
        const data = {fileName:fileName}
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 文件修改
    async updateFile (body:{fileName:string, uuid: string}) {
        const pattern = { cmd: "file_update" };
        const data = body
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }

    // 获取文件名及其地址，然后进行返回资源
    async getFiles(@Res() res: Response,fileName: string) {
        const pattern = { cmd: "file_getImage" };
        const payload = {fileName: fileName};
        
        this.leaveService
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
}