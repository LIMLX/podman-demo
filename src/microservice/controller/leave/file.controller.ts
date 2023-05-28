import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LeaveFileService } from "src/microservice/service";
import { Response } from "express";

@ApiTags("leave")
@Controller('leave/file')
export class LeaveFileController {
  constructor(private readonly fileService: LeaveFileService) { }

  // 单文件上传
  @ApiOperation({ summary: "单文件上传的接口", description: "上传单个文件" })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return "sta"
    }
    return await this.fileService.uploadFile(file)
  }

  // 文件删除
  @ApiOperation({ summary: "单文件删除的接口", description: "单个文件删除" })
  @Get('/delFile/name=:fileName')
  async removeFile(@Param('fileName') fileName: string) {
    if (!fileName) {
      return "sta"
    }
    return await this.fileService.removeFile(fileName)
  }

  // 查看图片文件
  @Get('/fileName=:fileName/type=:type')
  async getFiles(@Res() res: Response, @Param('fileName') fileName: string, @Param('type') type: string) {
    return this.fileService.getFiles(res, fileName, type)
  }
}