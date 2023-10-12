import { Controller, Get, Post, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RepairsMtrRoleGuard, RepiarsMtrRole, User } from 'src/common';
import { FindAppRepairsDto, FindRepairsDto, FulfilRepairsDto, MaintainerLoginDto, SendBackRepairsDto, TransferRepairsDto } from 'src/microservice/dto/repairs/maintainer.dto';
import { RepairsMaintainerService } from 'src/microservice/service/repairs';

@ApiTags('报修维修工')
@UseGuards(RepairsMtrRoleGuard)
@Controller('repairs/maintainer')
export class RepairsMaintainerController {
    constructor(private readonly maintainerService: RepairsMaintainerService) { }

    // 维修工登录
    @ApiOperation({ summary: "维修工登录", description: "维修工登录" })
    @Post("login")
    async maintainerLogin(@Body() maintainerLoginDto: MaintainerLoginDto) {
        return await this.maintainerService.maintainerLogin(maintainerLoginDto);
    }

    // 获取类型颜色
    @ApiOperation({ summary: "获取类型颜色", description: "获取类型颜色" })
    @RepiarsMtrRole("mtr")
    @Get("findTypeColour")
    async findTypeColour() {
        return await this.maintainerService.findTypeColour();
    }

    // 查询自己负责的维修单
    @ApiOperation({ summary: "查询自己负责的维修单", description: "查询自己负责的维修单" })
    @RepiarsMtrRole("mtr")
    @Get("findRepairs/page=:page")
    async findRepairs(@Param("page") page: string, @Query() findRepairsDto: FindRepairsDto, @User("id") mtrId: string) {
        if (!mtrId || mtrId === "abnormal") {
            return "abnormal";
        }
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findRepairsDto.page = Number(page);
        if (findRepairsDto.time) {
            findRepairsDto.time = Number(findRepairsDto.time);
        }
        findRepairsDto.mtrId = mtrId;
        if (findRepairsDto.status === 0 || findRepairsDto.status === "0" || findRepairsDto.status) {
            findRepairsDto.status = Number(findRepairsDto.status);
        }
        return await this.maintainerService.findRepairs(findRepairsDto);
    }

    // 查询详细维修单
    @ApiOperation({ summary: "查询详细维修单", description: "查询详细维修单" })
    @RepiarsMtrRole("mtr")
    @Get("findRepairsOne/id=:repairsId")
    async findRepairsOne(@Param("repairsId") repairsId: string) {
        return await this.maintainerService.findRepairsOne(repairsId);
    }

    // 查询报修单--状态日志
    @ApiOperation({ summary: "查询报修单--状态日志", description: "查询报修单--状态日志" })
    @RepiarsMtrRole("mtr")
    @Get("findRepairsStatusLog/id=:repairsId")
    async findRepairsStatusLog(@Param("repairsId") repairId: string) {
        return await this.maintainerService.findRepairsStatusLog(repairId);
    }

    // 获取其他维修工数据
    @ApiOperation({ summary: "获取其他维修工数据", description: "获取其他维修工数据" })
    @RepiarsMtrRole("mtr")
    @Get("findMtr")
    async findMtr(@User("id") mtrId: string) {
        if (!mtrId || mtrId === "abnormal") {
            return "abnormal";
        }
        return await this.maintainerService.findMtr(mtrId);
    }

    // 退单
    @ApiOperation({ summary: "退单", description: "退单" })
    @RepiarsMtrRole("mtr")
    @Patch("sendBackRepairs")
    async sendBackRepairs(@Body() sendBackRepairsDto: SendBackRepairsDto, @User("id") userId: string, @User("name") userName: string) {
        if (!userId || userId === "abnormal" || !userName || userName === "abnormal") {
            return "abnormal";
        }
        sendBackRepairsDto.userId = userId;
        sendBackRepairsDto.userName = userName;
        return await this.maintainerService.sendBackRepairs(sendBackRepairsDto);
    }

    // 转单
    @ApiOperation({ summary: "转单", description: "转单" })
    @RepiarsMtrRole("mtr")
    @Patch("transferRepairs")
    async transferRepairs(@Body() transferRepairsDto: TransferRepairsDto, @User("id") userId: string, @User("name") userName: string) {
        if (!userId || userId === "abnormal" || !userName || userName === "abnormal") {
            return "abnormal";
        }
        transferRepairsDto.mtrId = userId;
        transferRepairsDto.mtrName = userName;
        return await this.maintainerService.transferRepairs(transferRepairsDto);
    }

    // 完单
    @ApiOperation({ summary: "完单", description: "完单" })
    @RepiarsMtrRole("mtr")
    @Patch("fulfilRepairs")
    async fulfilRepairs(@Body() fulfilRepairsDto: FulfilRepairsDto, @User("id") userId: string, @User("name") userName: string) {
        if (!userId || userId === "abnormal" || !userName || userName === "abnormal") {
            return "abnormal";
        }
        fulfilRepairsDto.userId = userId;
        fulfilRepairsDto.userName = userName;
        return await this.maintainerService.fulfilRepairs(fulfilRepairsDto);
    }

    // app进行查询操作
    @ApiOperation({ summary: "app进行查询操作", description: "app进行查询操作" })
    @RepiarsMtrRole("mtr")
    @Get("findAppRepairs")
    async findAppRepairs(@Query() findAppRepairsDto: FindAppRepairsDto, @User("id") userId: string) {
        if (!userId || userId === "abnormal") {
            return "abnormal";
        }
        findAppRepairsDto.mtrId = userId;
        return await this.maintainerService.findAppRepairs(findAppRepairsDto);
    }

    // app进行查询详情操作
    @ApiOperation({ summary: "app进行查询详情操作", description: "app进行查询详情操作" })
    @RepiarsMtrRole("mtr")
    @Get("findAppRepairsOne/id=:repairsId")
    async findAppRepairsOne(@Param("repairsId") repairsId: string, @Query("updateTime") updateTime: Date) {
        return await this.maintainerService.findAppRepairsOne(repairsId, updateTime);
    }
}
