import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Res, Query, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RepairsFileService } from 'src/microservice/service/repairs';
import { Response } from "express";
import { UserEnum, UserRole, UserRoleGuard } from 'src/common';

@ApiTags('报修文件')
@Controller('repairs/file')
@UseGuards(UserRoleGuard)
export class RepairsFileController {
    constructor(private readonly fileService: RepairsFileService) { }

    // 单文件上传
    @ApiOperation({ summary: "单文件上传的接口", description: "上传单个文件" })
    @UserRole([{ module: UserEnum.Repairs, level: 1 }])
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            return "文件上传错误";
        }
        // 验证大小
        if (file.size) {
            // 1.5MB
            if (file.size >= (1.5 * 1024 * 1024)) {
                return "大小超过1.5MB";
            }
        }
        return await this.fileService.uploadFile(file);
    }

    // 文件删除
    @ApiOperation({ summary: "单文件删除的接口", description: "单个文件删除" })
    @UserRole([{ module: UserEnum.Repairs, level: 1 }])
    @Delete('/delFile/fileName=:fileName')
    async removeFile(@Param('fileName') fileName: string, @Query("type") type: string) {
        if (!fileName) {
            return "abnormal"
        }
        if (!fileName.includes('.') || !fileName.includes('-')) {
            return "abnormal"
        }
        return await this.fileService.removeFile(fileName, type)
    }

    // 查看图片文件
    @ApiOperation({ summary: "查看图片文件", description: "查看图片文件" })
    @UserRole([{ module: UserEnum.Repairs, level: 1 }])
    @Get('getFile/fileName=:fileName')
    async getFiles(@Res() res: Response, @Param('fileName') fileName: string, @Query('type') type: string) {
        if (!fileName) {
            return "abnormal";
        }
        return await this.fileService.getFiles(res, fileName, type);
    }
}