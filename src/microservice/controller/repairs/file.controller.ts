import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common';
import { AutoDeleteFileDto } from 'src/microservice/dto/repairs/file.dto';
import { RepairsFileService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@Controller('repairs/file')
export class RepairsFileController {
    constructor(private readonly fileService: RepairsFileService) { }

    // 单文件上传
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('repairsId') repairsId: string, @User('type') type: string, @User('num') userNum: string) {
        if (!file || !repairsId || !userNum) {
            return "abnormal"
        }
        return await this.fileService.uploadFile(file, repairsId, type, userNum)
    }

    // 文件删除
    @Delete('/delFile/fileName=:fileName/type=:type')
    async removeFile(@Param('fileName') fileName: string, @Param('type') type: string) {
        if (!fileName || !type) {
            return "abnormal"
        }
        return await this.fileService.removeFile(fileName, type)
    }

    // 查看图片文件
    @Get('getFile/fileName=:fileName')
    async getFiles(@Param('fileName') fileName: string) {
        if (!fileName) {
            return "abnormal"
        }
        return await this.fileService.getFiles(fileName)
    }

    // 当用户进行删除时点击取消填写工单后
    @Post('autoDeleteFile')
    async autoDeleteFile(@Body() { repairsId }: AutoDeleteFileDto) {
        return await this.fileService.autoDeleteFile(repairsId)
    }
}