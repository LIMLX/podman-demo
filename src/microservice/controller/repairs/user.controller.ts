import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User, UserEnum, UserRole, UserRoleGuard } from 'src/common';
import { CreateRepairsDto, UpdateRepairsDto } from 'src/microservice/dto/repairs/user.dto';
import { RepairsUserService } from 'src/microservice/service/repairs';

@ApiTags('报修用户')
@Controller('repairs/user')
@UseGuards(UserRoleGuard)
export class RepairsUserController {
  constructor(private readonly userService: RepairsUserService) { }

  // 获取类型颜色
  @ApiOperation({ summary: "获取类型颜色", description: "获取类型颜色" })
  @UserRole([{ module: UserEnum.Repairs, level: 1 }])
  @Get("findTypeColour")
  async findTypeColour() {
    return await this.userService.findTypeColour();
  }

  // 用户查询个人的维修单
  @ApiOperation({ summary: "用户查询个人的维修单", description: "用户查询个人的维修单" })
  @UserRole([{ module: UserEnum.Repairs, level: 1 }])
  @Get("findRepairs")
  async findRepairs(@User("id") userId: string, @Query("status") status: any) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    if (status === "" || status && !/^[-10-9]*$/.test(status)) {
      return "abnormal";
    }
    return await this.userService.findRepairs(userId, status);
  }

  // 查询详细维修单
  @ApiOperation({ summary: "查询详细维修单", description: "查询详细维修单" })
  @UserRole([{ module: UserEnum.Repairs, level: 1 }])
  @Get("findRepairsOne/id=:repairsId")
  async findRepairsOne(@User("id") userId: string, @Param("repairsId") repairsId: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    return await this.userService.findRepairsOne(userId, repairsId);
  }

  // 查询报修单--状态日志
  @ApiOperation({ summary: "查询报修单--状态日志", description: "查询报修单--状态日志" })
  @UserRole([{ module: UserEnum.Repairs, level: 1 }])
  @Get("findRepairsStatusLog/id=:repairsId")
  async findRepairsStatusLog(@Param("repairsId") repairId: string) {
    return await this.userService.findRepairsStatusLog(repairId);
  }

  // 获取报修类别
  @ApiOperation({ summary: "获取报修类别", description: "获取报修类别" })
  @UserRole([{ module: UserEnum.Repairs, level: 1 }])
  @Get("findType")
  async findType() {
    return await this.userService.findType();
  }

  // 获取宿舍楼栋
  @ApiOperation({ summary: "获取宿舍楼栋", description: "获取宿舍楼栋" })
  @UserRole([{ module: UserEnum.Repairs, level: 1 }])
  @Get("findBuilding")
  async findBuilding() {
    return await this.userService.findBuilding();
  }

  // 创建报修单
  @ApiOperation({ summary: "创建报修单", description: "创建报修单" })
  @UserRole([{ module: UserEnum.Repairs, level: 1 }])
  @Post("createRepairs")
  async createRepairs(@Body() createRepairsDto: CreateRepairsDto, @User("id") userId: string, @User("num") userNum: string, @User("name") userName: string, @User("type") userType: string) {
    if (!userId || userId === "abnormal" || !userNum || userNum === "abnormal" || !userType || userType === "abnormal" || !userName || userName === "abnormal") {
      return "abnormal";
    }
    createRepairsDto.userId = userId;
    createRepairsDto.userNum = userNum;
    createRepairsDto.userName = userName;
    createRepairsDto.userLevel = userType === "student" ? 0 : 1;
    return await this.userService.createRepairs(createRepairsDto);
  }

  // 撤回报修单
  @ApiOperation({ summary: "撤回报修单", description: "撤回报修单" })
  @UserRole([{ module: UserEnum.Repairs, level: 1 }])
  @Delete("revocationRepairs/id=:repairId")
  async revocationRepairs(@Param("repairId") repairId: string, @User("id") userId: string, @User("name") userName: string) {
    if (!userId || userId === "abnormal" || !userName || userName === "abnormal") {
      return "abnormal";
    }
    return await this.userService.revocationRepairs(repairId, userName, userId);
  }

  // 编辑报修单
  @ApiOperation({ summary: "编辑报修单", description: "编辑报修单" })
  @UserRole([{ module: UserEnum.Repairs, level: 1 }])
  @Patch("updateRepairs")
  async updateRepairs(@Body() updateRepairsDto: UpdateRepairsDto) {
    return await this.userService.updateRepairs(updateRepairsDto);
  }
}
