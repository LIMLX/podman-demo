import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateOperationDto, UpdateOperationDto } from "src/microservice/dto";
import { UsersOperationService } from "src/microservice/service";

@ApiTags('操作权限')
@Controller('users/operation')
export class UsersOperationController {
  constructor(private readonly operationService: UsersOperationService) { }

  // 创建操作权限
  @ApiOperation({ summary: "权限创建接口", description: "创建新权限" })
  @Post('/operationCreate')
  async createOperation(@Body() createOperationDto: CreateOperationDto) {
    return await this.operationService.createOperation(createOperationDto);
  }

  // 获取所有操作权限
  @ApiOperation({ summary: "权限查询接口", description: "查询权限信息" })
  @Get("/findOperationAll")
  async findOperationAll() {
    return await this.operationService.findOperationAll()
  }

  // 修改操作权限
  @ApiOperation({ summary: "权限修改接口", description: "修改权限" })
  @Patch('/operationUpdate')
  async updateOperation(@Body() updateOperationDto: UpdateOperationDto) {
    return await this.operationService.updateOperation(updateOperationDto)
  }
}