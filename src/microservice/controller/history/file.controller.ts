import { Controller, Post, UseInterceptors, UploadedFile, Get, Delete, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { HistoryFileService } from 'src/microservice/service/history';
import { Response } from 'express'

@Controller('history/file')
export class HistoryFileController {
  constructor(private readonly fileService: HistoryFileService) { }

  // 文件上传
  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return "文件上传错误";
    }
    // 验证1.5mb上传
    if (file.size >= 1024 * 1024 * 1.5) {
      return "文件大小大于1.5MB";
    }
    return await this.fileService.uploadFile(file);
  }

  // 文件删除
  @Delete('/delFile/name=:fileName')
  async removeFile(@Param("fileName") fileName: string) {
    if (!fileName) {
      return "参数错误"
    }
    return await this.fileService.removeFile(fileName);
  }

  // 查看文件
  @Get('getFile/fileName=:fileName')
  async getFile(@Res() res: Response, @Param("fileName") fileName: string) {
    return await this.fileService.getFiles(res, fileName);
  }
}