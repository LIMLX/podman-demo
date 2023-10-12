import { Controller, Post, UseInterceptors, UploadedFile, Get, Delete, Param, Res, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { HistoryFileService } from 'src/microservice/service/history';
import { Response } from 'express'
import { UserEnum, UserRole, UserRoleGuard } from 'src/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('党史文件')
@Controller('history/file')
@UseGuards(UserRoleGuard)
export class HistoryFileController {
  constructor(private readonly fileService: HistoryFileService) { }

  // 文件上传
  @ApiOperation({ summary: "单文件上传的接口", description: "上传单个文件" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
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
  @ApiOperation({ summary: "单文件删除的接口", description: "删除单个文件" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Delete('/delFile/name=:fileName')
  async removeFile(@Param("fileName") fileName: string) {
    if (!fileName) {
      return "参数错误"
    }
    return await this.fileService.removeFile(fileName);
  }

  // 查看文件
  @ApiOperation({ summary: "查看文件", description: "查看文件" })
  @UserRole([{ module: UserEnum.History, level: 1 }])
  @Get('getFile/fileName=:fileName')
  async getFile(@Res() res: Response, @Param("fileName") fileName: string) {
    return await this.fileService.getFiles(res, fileName);
  }
}