import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeService } from 'src/microservice/service/report';
import { CreateTypeDto, UpdateTypeDto } from 'src/microservice/dto/report/tpye.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) { }

  // 查询所有类型
  @Get("findType")
  async findType() {
    return await this.typeService.findType();
  }

  // 创建新类型
  @Post("createType")
  async createType(@Body() createTypeDto: CreateTypeDto) {
    return await this.typeService.createType(createTypeDto);
  }

  // 修改类型
  @Patch("updateType")
  async updateType(@Body() updateTypeDto: UpdateTypeDto) {
    return await this.typeService.updateType(updateTypeDto);
  }

  // 删除类型
  @Delete("removeType/id=:id")
  async removeType(@Param("id") id: string) {
    return await this.typeService.removeType(id);
  }
}
