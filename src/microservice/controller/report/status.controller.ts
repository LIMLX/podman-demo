import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from 'src/microservice/service/report/status.service';
import { CreateStatusDto, UpdateStatusDto } from 'src/microservice/dto/report/status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  // 查询所有状态
  @Get("findStatus")
  async findStatus() {
    return await this.statusService.findStatus();
  }

  // 创建状态
  @Post("createStatus")
  async createStatus(@Body() createStatusDto: CreateStatusDto) {
    return await this.statusService.createStatus(createStatusDto);
  }

  // 修改状态
  @Patch("updateStatus")
  async updateStatus(@Body() updateStatus: UpdateStatusDto) {
    return await this.statusService.updateStatus(updateStatus);
  }

  // 删除状态
  @Delete("removeStatus/id=:id")
  async removeStatus(@Param("id") id: string) {
    return await this.statusService.removeStatus(id);
  }
}
