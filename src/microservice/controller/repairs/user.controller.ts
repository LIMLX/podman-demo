import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User } from 'src/common';
import { CreateRepairsDto, UpdateRepairsDto } from 'src/microservice/dto/repairs/user.dto';
import { RepairsUserService } from 'src/microservice/service/repairs';


@Controller('repairs/user')
export class RepairsUserController {
  constructor(private readonly userService: RepairsUserService) { }
  // 用户查询个人的维修单
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
  @Get("findRepairsOne/id=:repairsId")
  async findRepairsOne(@User("id") userId: string, @Param("repairsId") repairsId: string) {
    if (!userId || userId === "abnormal") {
      return "abnormal";
    }
    return await this.userService.findRepairsOne(userId, repairsId);
  }

  // 查询报修单--状态日志
  @Get("findRepairsStatusLog/id=:repairsId")
  async findRepairsStatusLog(@Param("repairsId") repairId: string) {
    return await this.userService.findRepairsStatusLog(repairId);
  }

  // 创建报修单
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
  @Delete("revocationRepairs/id=:repairId")
  async revocationRepairs(@Param("repairId") repairId: string, @User("id") userId: string, @User("name") userName: string) {
    if (!userId || userId === "abnormal" || !userName || userName === "abnormal") {
      return "abnormal";
    }
    return await this.userService.revocationRepairs(repairId, userName, userId);
  }

  // 编辑报修单
  @Patch("updateRepairs")
  async updateRepairs(@Body() updateRepairsDto: UpdateRepairsDto) {
    return await this.userService.updateRepairs(updateRepairsDto);
  }
}
