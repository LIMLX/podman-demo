import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtStrategy } from "src/auth/strategies";
import { CreateSchoolTypeDto, CreateStatusDto, CreateTransportationDto, CreateTypeDto, DeleteSchoolTypeDto, DeleteStatusDto, DeleteTransportationDto, DeleteTypeDto, UpdateSchoolTypeDto, UpdateStatusDto, UpdateTransportationDto, UpdateTypeDto } from "src/microservice/dto/leave/type.dto";
import { LeaveTypeService } from "src/microservice/service/leave";

@ApiTags("leave")
@Controller('leave/type')
export class LeaveTypeController {
  constructor(private readonly typeService: LeaveTypeService) { }

  // 创建离校类型
  @ApiOperation({ summary: "创建离校类型的接口", description: "创建新的离校类型" })
  @Post('/typeSchoolCreate')
  async createSchoolType(@Body() createSchoolType: CreateSchoolTypeDto) {
    return await this.typeService.createSchoolType(createSchoolType)
  }

  // 查询返回所有离校类型
  @ApiOperation({ summary: "查询所有离校类型的接口", description: "获取所有离校类型" })
  @Get('/typeSchoolAll')
  async findSchoolTypeAll() {
    return await this.typeService.findSchoolTypeAll()
  }

  // 修改离校类型
  @ApiOperation({ summary: "修改离校类型的接口", description: "修改离校类型" })
  @Patch('/typeSchoolUpdate')
  async updateSchoolType(@Body() updateSchoolType: UpdateSchoolTypeDto) {
    return await this.typeService.updateSchoolType(updateSchoolType)
  }

  // 删除离校类型
  @ApiOperation({ summary: "删除离校类型的接口", description: "删除离校类型" })
  @Delete('/typeSchoolDelete/id=:typeId')
  async removeSchoolType(@Param() deleteSchoolTypeDto: DeleteSchoolTypeDto) {
    return await this.typeService.removeSchoolType(deleteSchoolTypeDto)
  }

  // -----------------------------------状态-----------------------------------------】
  // 创建状态
  @ApiOperation({ summary: "创建状态的接口", description: "创建新的状态" })
  @Post('/statusCreate')
  async createStatus(@Body() createStatus: CreateStatusDto) {
    return await this.typeService.createStatus(createStatus)
  }

  // 查询所有状态
  @ApiOperation({ summary: "查询所有状态状态的接口", description: "获取所有状态" })
  @Get('/statusAll')
  async findStatusAll() {
    return await this.typeService.findStatusAll()
  }

  // 修改状态
  @ApiOperation({ summary: "修改状态的接口", description: "修改状态" })
  @Patch('/statusUpdate')
  async updateStatus(@Body() updateStatus: UpdateStatusDto) {
    return await this.typeService.updateStatus(updateStatus)
  }

  // 删除状态
  @ApiOperation({ summary: "删除状态的接口", description: "删除状态" })
  @Delete('/statusDelete/id=:statusId')
  async removeStatus(@Param() deleteStatusDto: DeleteStatusDto) {
    return await this.typeService.removeStatus(deleteStatusDto)
  }

  // -----------------------------------离校交通方式-----------------------------------------】
  // 创建离校方式
  @ApiOperation({ summary: "创建离校方式的接口", description: "创建新的离校方式" })
  @Post('/transportationCreate')
  async createTransportation(@Body() createTransportation: CreateTransportationDto) {
    return await this.typeService.createTransportation(createTransportation)
  }

  // 查询所有离校方式
  @ApiOperation({ summary: "查询所有离校方式的接口", description: "获取所有离校方式" })
  @Get('/transportationAll')
  async findTransportationAll() {
    return await this.typeService.findTransportationAll()
  }

  // 修改离校方式
  @ApiOperation({ summary: "修改离校方式的接口", description: "修改离校方式" })
  @Patch('/transportationUpdate')
  async updateTransportation(@Body() updateTransportation: UpdateTransportationDto) {
    return await this.typeService.updateTransportation(updateTransportation)
  }

  // 删除离校方式
  @ApiOperation({ summary: "删除离校方式的接口", description: "删除离校方式" })
  @Delete('/transportationDelete/id=:transportationId')
  async removeTransportation(@Param() deleteTransportationDto: DeleteTransportationDto) {
    return await this.typeService.removeTransportation(deleteTransportationDto)
  }

  // -----------------------------------用户端获取接口-----------------------------------------
  // 用户获取公共状态值
  @ApiOperation({ summary: "用户获取公共状态值", description: "用户状态值获取方式" })
  @Get('/getStatus')
  async findUserStatus() {
    return await this.typeService.findUserStatus();
  }

  // 用户获取离校类型值
  @ApiOperation({ summary: "用户获取离校类型值的接口", description: "用户获取离校类型值" })
  @Get('getLeaveSchoolType')
  async findUserLeaveSchoolType() {
    return await this.typeService.findUserLeaveSchoolType();
  }

  // 用户获取交通方式
  @ApiOperation({ summary: "用户获取交通方式的接口", description: "用户获取交通方式" })
  @Get('/getTransp')
  async findUserTransp() {
    return await this.typeService.findUserTransp();
  }
}