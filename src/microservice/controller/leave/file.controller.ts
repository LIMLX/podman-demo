import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LeaveFileService } from "src/microservice/service";
import { Response } from "express";

@ApiTags("leave")
@Controller('leave/file')
export class LeaveFileController {
    constructor(private readonly fileService: LeaveFileService){}

    // 单文件上传
    @ApiOperation({summary:"单文件上传的接口", description:"上传单个文件"})
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile (@UploadedFile() file: Express.Multer.File) {
      file.buffer = Buffer.from(file.buffer)
  
      if(!file){
        return "sta"
      }
      return this.fileService.uploadFile(file)
    }
  
    // 文件删除
    @ApiOperation({summary:"单文件删除的接口", description:"单个文件删除"})
    @Delete('/delFile/name=:fileName')
    removeFile (@Param('fileName') fileName: string) {
  
      if(!fileName){
        return "sta"
      }
      return this.fileService.removeFile(fileName)
    }
  
    // 文件修改
    @ApiOperation({summary:"文件修改的接口", description:"文件修改(指定请假单存储文件修改)"})
    @Patch('/updateFile')
    updateFile (@Body() body:{fileName:string, uuid: string}) {
      return this.fileService.updateFile(body)
    }

    // 查看图片文件
    @Get('/:fileName')
    async getFiles(@Res() res: Response,@Param('fileName') fileName:string) {
      this.fileService.getFiles(res,fileName)
    }
}