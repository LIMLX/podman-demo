import { Controller, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LeaveTypeService } from "src/microservice/service/leave";

@ApiTags("leave")
@Controller('leave/type')
export class LeaveTypeController {
  constructor(private readonly typeService: LeaveTypeService) { }

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