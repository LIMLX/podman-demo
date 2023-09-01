import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileService } from 'src/microservice/service/report';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from "express";

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  // 单文件上传(提供临时存储文件目录) --- 初次创建
  @Post("upload")
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    file.buffer = Buffer.from(file.buffer)
    if (!file) {
      return "文件上传错误"
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
  @Get('getFile/fileName=:fileName/type=:type')
  async getFile(@Param() { fileName, type }: { fileName: string, type: string }, @Res() res: Response) {
    return await this.fileService.getFiles(res, fileName, type);
  }
}
