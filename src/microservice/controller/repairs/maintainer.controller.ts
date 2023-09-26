import { Controller, Get, Post, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RepairsMtrRoleGuard, RepiarsMtrRole, User } from 'src/common';
import { FindAppRepairsDto, FindRepairsDto, FulfilRepairsDto, MaintainerLoginDto, SendBackRepairsDto, TransferRepairsDto } from 'src/microservice/dto/repairs/maintainer.dto';
import { RepairsMaintainerService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@UseGuards(RepairsMtrRoleGuard)
@Controller('repairs/maintainer')
export class RepairsMaintainerController {
    constructor(private readonly maintainerService: RepairsMaintainerService) { }

    // 维修工登录
    @Post("login")
    async maintainerLogin(@Body() maintainerLoginDto: MaintainerLoginDto) {
        return await this.maintainerService.maintainerLogin(maintainerLoginDto);
    }

    // 查询自己负责的维修单
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
    @Get("findRepairsOne/id=:repairsId")
    async findRepairsOne(@Param("repairsId") repairsId: string) {
        return await this.maintainerService.findRepairsOne(repairsId);
    }

    // 查询报修单--状态日志
    @Get("findRepairsStatusLog/id=:repairsId")
    async findRepairsStatusLog(@Param("repairsId") repairId: string) {
        return await this.maintainerService.findRepairsStatusLog(repairId);
    }

    // 获取其他维修工数据
    @Get("findMtr")
    async findMtr(@User("id") mtrId: string) {
        if (!mtrId || mtrId === "abnormal") {
            return "abnormal";
        }
        return await this.maintainerService.findMtr(mtrId);
    }

    // 退单
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
    @Get("findAppRepairs")
    async findAppRepairs(@Query() findAppRepairsDto: FindAppRepairsDto, @User("id") userId: string) {
        if (!userId || userId === "abnormal") {
            return "abnormal";
        }
        findAppRepairsDto.mtrId = userId;
        return await this.maintainerService.findAppRepairs(findAppRepairsDto);
    }

    // app进行查询详情操作
    @Get("findAppRepairsOne/id=:repairsId")
    async findAppRepairsOne(@Param("repairsId") repairsId: string, @Query("updateTime") updateTime: Date) {
        return await this.maintainerService.findAppRepairsOne(repairsId, updateTime);
    }
}
