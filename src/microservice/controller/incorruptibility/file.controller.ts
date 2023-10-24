import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Admin, AdminRole, AdminRoleGuard, UserEnum, UserRole, UserRoleGuard } from "src/common";
import { IncorruptibilityFileService } from "src/microservice/service";

@ApiTags('爱廉说文件')
@UseGuards(UserRoleGuard)
@UseGuards(AdminRoleGuard)
@Controller("incorruptibility/file")
export class IncorruptibilityFileController {
    constructor(private readonly fileService: IncorruptibilityFileService) { }

    // 文件上传
    @ApiOperation({ summary: "文件上传", description: "文件上传" })
    @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
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
    @ApiOperation({ summary: "文件删除", description: "文件删除" })
    @AdminRole([{ admin: Admin.Incorruptibility, level: 1 }])
    @Delete('/delFile/name=:fileName')
    async removeFile(@Param("fileName") fileName: string) {
        if (!fileName) {
            return "参数错误"
        }
        return await this.fileService.removeFile(fileName);
    }

    // 查看文件
    @ApiOperation({ summary: "查看文件", description: "查看文件" })
    @UserRole([{ module: UserEnum.Incorruptibility, level: 1 }])
    @Get('getFile/fileName=:fileName')
    async getFile(@Res() res: Response, @Param("fileName") fileName: string) {
        return await this.fileService.getFiles(res, fileName);
    }
}