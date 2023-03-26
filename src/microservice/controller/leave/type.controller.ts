import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateSchoolTypeDto, CreateStatusDto, CreateTransportationDto, CreateTypeDto, DeleteSchoolTypeDto, DeleteStatusDto, DeleteTransportationDto, DeleteTypeDto, UpdateSchoolTypeDto, UpdateStatusDto, UpdateTransportationDto, UpdateTypeDto } from "src/microservice/dto/leave/type.dto";
import { LeaveTypeService } from "src/microservice/service/leave";

@ApiTags("leave")
@Controller('leave/type')
export class LeaveTypeController {
    constructor(private readonly typeService: LeaveTypeService) {}  
    // 创建请假类型
    @ApiOperation({summary:"创建请假类型的接口", description:"创建新的请假类型"})
    @Post('/typeCreate')
    async createType(@Body() createTypeDto: CreateTypeDto) {
      return await this.typeService.createType(createTypeDto);
    }
  
    // 获取请假所有类型
    @ApiOperation({summary:"查询所有请假类型的接口", description:"获取所有请假类型"})
    @Get('/typeAll')
    async findTypeAll() {
      return await this.typeService.findTypeAll();
    }
  
    // 修改请假类型
    @ApiOperation({summary:"修改请假类型的接口", description:"修改请假类型"})
    @Patch('/typeUpdate')
    async updateType(@Body() updateTypeDto: UpdateTypeDto) {
      return await this.typeService.updateType(updateTypeDto);
    }
  
    // 删除请假类型
    @ApiOperation({summary:"删除请假类型的接口", description:"删除请假类型"})
    @Delete('/typeDelete/id=:typeId')
    async removeType(@Param() deleteTypeDto:DeleteTypeDto) {
      return await this.typeService.removeType(deleteTypeDto);
    }
  
    // 创建离校类型
    @ApiOperation({summary:"创建离校类型的接口", description:"创建新的离校类型"})
    @Post('/typeSchoolCreate')
    async createSchoolType (@Body() createSchoolType: CreateSchoolTypeDto) {
      return await this.typeService.createSchoolType(createSchoolType)
    }
      
    // 查询返回所有离校类型
    @ApiOperation({summary:"查询所有离校类型的接口", description:"获取所有离校类型"})
    @Get('/typeSchoolAll')
    async findSchoolTypeAll () {
      return await this.typeService.findSchoolTypeAll()
    }
    
    // 修改离校类型
    @ApiOperation({summary:"修改离校类型的接口", description:"修改离校类型"})
    @Patch('/typeSchoolUpdate')
    async updateSchoolType (@Body() updateSchoolType: UpdateSchoolTypeDto) {
      return await this.typeService.updateSchoolType(updateSchoolType)
    }
    
    // 删除离校类型
    @ApiOperation({summary:"删除离校类型的接口", description:"删除离校类型"})
    @Delete('/typeSchoolDelete/id=:typeId')
    async removeSchoolType (@Param() deleteSchoolTypeDto:DeleteSchoolTypeDto) {
      return await this.typeService.removeSchoolType(deleteSchoolTypeDto)
    }
  
      // -----------------------------------状态-----------------------------------------】
    // 创建状态
    @ApiOperation({summary:"创建状态的接口", description:"创建新的状态"})
    @Post('/statusCreate')
    async createStatus (@Body() createStatus: CreateStatusDto) {
      return await this.typeService.createStatus(createStatus)
    }
  
    // 查询所有状态
    @ApiOperation({summary:"查询所有状态状态的接口", description:"获取所有状态"})
    @Get('/statusAll')
    async findStatusAll () {
      return await this.typeService.findStatusAll()
    }
    
    // 修改状态
    @ApiOperation({summary:"修改状态的接口", description:"修改状态"})
    @Patch('/statusUpdate')
    async updateStatus(@Body() updateStatus: UpdateStatusDto) {
      return await this.typeService.updateStatus(updateStatus)
    }
  
    // 删除状态
    @ApiOperation({summary:"删除状态的接口", description:"删除状态"})
    @Delete('/statusDelete/id=:statusId')
    async removeStatus (@Param() deleteStatusDto:DeleteStatusDto) {
      return await this.typeService.removeStatus(deleteStatusDto)
    }
  
    // -----------------------------------离校交通方式-----------------------------------------】
    // 创建离校方式
    @ApiOperation({summary:"创建离校方式的接口", description:"创建新的离校方式"})
    @Post('/transportationCreate')
    async createTransportation (@Body() createTransportation: CreateTransportationDto) {
      return await this.typeService.createTransportation(createTransportation)
    }
  
    // 查询所有离校方式
    @ApiOperation({summary:"查询所有离校方式的接口", description:"获取所有离校方式"})
    @Get('/transportationAll')
    async findTransportationAll () {
      return await this.typeService.findTransportationAll()
    }
    
    // 修改离校方式
    @ApiOperation({summary:"修改离校方式的接口", description:"修改离校方式"})
    @Patch('/transportationUpdate')
    async updateTransportation (@Body() updateTransportation: UpdateTransportationDto) {
      return await this.typeService.updateTransportation(updateTransportation)
    }
  
    // 删除离校方式
    @ApiOperation({summary:"删除离校方式的接口", description:"删除离校方式"})
    @Delete('/transportationDelete/id=:transportationId')
    async removeTransportation (@Param() deleteTransportationDto:DeleteTransportationDto) {
      return await this.typeService.removeTransportation(deleteTransportationDto)
    }
}