import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin, AdminRole, AdminRoleGuard } from 'src/common';
import { CreateClockTypeDto } from 'src/microservice/dto/epi';
import { EpiClockTypeService } from 'src/microservice/service/epi';

@ApiTags('防疫打卡')
@Controller('epi/clockType')
@UseGuards(AdminRoleGuard)
export class EpiClockTypeController {
    constructor(private readonly clockTypeService: EpiClockTypeService) { }

    // 创建新类型
    @ApiOperation({ summary: "创建新类型", description: "创建新类型" })
    @AdminRole([{ admin: Admin.Epi, level: 1 }])
    @Post("createType")
    async createType(@Body() createClockTypeDto: CreateClockTypeDto) {
        return await this.clockTypeService.createType(createClockTypeDto);
    }

    // 查询所有类型
    @ApiOperation({ summary: "查询所有类型", description: "查询所有类型" })
    @UseGuards(AuthGuard('jwt'))
    @Get("findAll")
    async findTypeAll() {
        return await this.clockTypeService.findTypeAll();
    }

    // 修改数据
    @ApiOperation({ summary: "修改数据", description: "修改数据" })
    @AdminRole([{ admin: Admin.Epi, level: 1 }])
    @Patch('updateType')
    async updateType(@Body() updateTypeDto: CreateClockTypeDto) {
        return await this.clockTypeService.updateType(updateTypeDto);
    }

    // 删除数据
    @ApiOperation({ summary: "删除数据", description: "删除数据" })
    @AdminRole([{ admin: Admin.Epi, level: 1 }])
    @Delete('delete/type=:typeId')
    async deleteType(@Param("typeId") typeId: string) {
        return await this.clockTypeService.deleteType(typeId);
    }
}
