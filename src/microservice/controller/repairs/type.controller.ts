import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTypeDto, UpdateTypeDto } from 'src/microservice/dto/repairs';
import { RepairsTypeService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@Controller('repairs/type')
export class RepairsTypeController {
    constructor(private readonly typeService: RepairsTypeService) { }

    // 创建新类型
    @ApiOperation({ summary: "创建工单类型", description: "创建维修工单的新类型---管理员" })
    @Post("createType")
    async createType(@Body() createTypeDto: CreateTypeDto) {
        return await this.typeService.createType(createTypeDto);
    }

    // 获取所有类型
    @ApiOperation({ summary: "获取工单类型", description: "获取所有维修工单的类型详细---管理员" })
    @Get("findTypeAll")
    async findAll() {
        return await this.typeService.findAll();
    }

    // 用户获取所有类型
    @ApiOperation({ summary: "获取工单类型", description: "获取所有维修工单的类型简略---用户" })
    @Get("findTypeUserAll")
    async findTypeUserAll() {
        return await this.typeService.findTypeUserAll()
    }

    // 修改类型
    @ApiOperation({ summary: "修改工单类型", description: "修改维修工单的类型---管理员" })
    @Patch('updateType')
    async updateType(@Body() updateTypeDto: UpdateTypeDto) {
        return await this.typeService.updateType(updateTypeDto);
    }

    // 删除类型
    @ApiOperation({ summary: "删除工单类型", description: "删除维修工单的类型---管理员" })
    @Delete('deleteType/id=:typeId')
    async deleteType(@Param() param: { typeId: string }) {
        return await this.typeService.deleteType(param);
    }
}
