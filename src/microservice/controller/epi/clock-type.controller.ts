import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateClockTypeDto } from 'src/microservice/dto/epi';
import { EpiClockTypeService } from 'src/microservice/service/epi';

@Controller('epi/clockType')
export class EpiClockTypeController {
    constructor(private readonly clockTypeService: EpiClockTypeService) { }

    // 创建新类型
    @Post("createType")
    async createType(@Body() createClockTypeDto: CreateClockTypeDto) {
        return await this.clockTypeService.createType(createClockTypeDto);
    }

    // 查询所有类型
    @Get("findAll")
    async findTypeAll() {
        return await this.clockTypeService.findTypeAll()
    }

    // 修改数据
    @Patch('updateType')
    async updateType(@Body() updateTypeDto: CreateClockTypeDto) {
        return await this.clockTypeService.updateType(updateTypeDto)
    }

    // 删除数据
    @Delete('delete/type=:typeId')
    async deleteType(@Param() { typeId }: { typeId: string }) {
        return await this.clockTypeService.deleteType(typeId)
    }
}
