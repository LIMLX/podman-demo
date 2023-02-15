import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Response } from "express";
import { NoticeFileService } from "src/microservice/service";

@Controller("notice/file")
export class NoticeFileController {
    constructor(private readonly noticeFile: NoticeFileService){}

    @Get('/:fileName')
    async getFiles(@Res() res: Response,@Param() params) {
        this.noticeFile.getFiles(res,params.fileName)
    }

    @Get('/download/:fileName')
    async dowFiles(@Res() res: Response,@Param() params) {
        this.noticeFile.dowFiles(res,params.fileName)
    }
    
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFiles (@UploadedFile() file: Express.Multer.File) {
        if(!file) {
            return "abnormal"
        }
        return this.noticeFile.uploadFiles(file)
    }
}