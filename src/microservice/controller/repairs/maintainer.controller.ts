import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common';
import { AuthMaintainerBuildingDto, AuthMaintainerTypeDto, CreateMaintainerDto, DelMaintainerBuildingDto, DelMaintainerTypeDto, FulfilRepairsDto, LoginMaintainerDto, OrderReceivingDto, ReturnRepairDto, TransferRepairDto, UpdateMaintainerDto } from 'src/microservice/dto/repairs';
import { RepairsMaintainerService } from 'src/microservice/service/repairs';

@ApiTags("repairs")
@Controller('repairs/maintainer')
export class RepairsMaintainerController {
    constructor(private readonly maintainerService: RepairsMaintainerService) { }

    // 维修工创建
    @ApiOperation({ summary: "维修工创建", description: "创建新的维修工---管理员" })
    @Post("createMaintainer")
    async createMaintainer(@Body() createMaintainerDto: CreateMaintainerDto) {
        return await this.maintainerService.createMaintainer(createMaintainerDto);
    }

    // 维修工登录
    @ApiOperation({ summary: "维修工登录", description: "维修工登录，返回token---维修工" })
    @Post("loginMaintainer")
    async loginMaintainer(@Body() loginMaintainerDto: LoginMaintainerDto) {
        return await this.maintainerService.loginMaintainer(loginMaintainerDto)
    }

    // 维修工基础信息修改
    @ApiOperation({ summary: "修改维修工数据", description: "修改维修工详细数据---管理员" })
    @Post("updateMaintainer")
    async updateMaintainer(@Body() updateMaintainerDto: UpdateMaintainerDto) {
        return await this.maintainerService.updateMaintainer(updateMaintainerDto)
    }

    // 授权给维修工负责楼栋
    @ApiOperation({ summary: "授权维修工管理楼栋", description: "维修工楼栋授权---管理员" })
    @Post('authMaintainerBuilding')
    async authMaintainerBuilding(@Body() { maintainerId, buildingId }: AuthMaintainerBuildingDto) {
        return await this.maintainerService.authMaintainerBuilding(maintainerId, buildingId)
    }

    // 维修工授权擅长类型
    @ApiOperation({ summary: "维修工工种授权", description: "授权给维修工工种---管理员" })
    @Post('authMaintainerType')
    async authMaintainerType(@Body() { maintainerId, typeId }: AuthMaintainerTypeDto) {
        return await this.maintainerService.authMaintainerType(maintainerId, typeId)
    }

    // 删除(撤销)负责楼栋
    @ApiOperation({ summary: "维修工管理楼栋权限撤销", description: "维修工楼栋权限撤销---管理员" })
    @Post("deleteMtrBuilding")
    async deleteMtrBuilding(@Body() { maintainerId, buildingId }: DelMaintainerBuildingDto) {
        return await this.maintainerService.deleteMtrBuilding(maintainerId, buildingId)
    }

    // 删除(撤销)负责类型
    @ApiOperation({ summary: "维修工工种权限撤销", description: "维修工工种权限撤销---管理员" })
    @Post("deleteMtrType")
    async deleteMtrType(@Body() { maintainerId, typeId }: DelMaintainerTypeDto) {
        return await this.maintainerService.deleteMtrType(maintainerId, typeId)
    }

    // 查询所有维修工信息----此操作为admin操作
    @ApiOperation({ summary: "查询维修工数据", description: "查询维修工详细数据---管理员" })
    @Get("findMaintainerAll")
    async findMaintainerAll() {
        return await this.maintainerService.findMaintainerAll()
    }

    // 查询所有维修工信息----此操作为users操作
    @ApiOperation({ summary: "查询维修工", description: "查询维修工简略数据---用户" })
    @Get('findMtrUserAll')
    async findMtrUserAll() {
        return await this.maintainerService.findMtrUserAll()
    }

    // 维修工查询自己负责的所有工单
    @ApiOperation({ summary: "维修工查询自己负责的工单", description: "获取当前维修工负责的工单---维修工" })
    @Get('findRepairsAll/page=:page')
    async findRepairsAll(@User('id') maintainerId: string, @Param('page') page: number) {
        if (!maintainerId || maintainerId === "abnormal") {
            return "abnormal"
        }
        console.log(maintainerId)
        return await this.maintainerService.findRepairsAll(maintainerId, page)
    }

    // 维修工查询过滤后的所有工单
    @ApiOperation({ summary: "维修工过滤查询自己负责的工单", description: "获取过滤当前维修工负责的工单---维修工" })
    @Get('findRepairsFilterAll/page=:page')
    async findRepairsFilterAll(@User('id') maintainerId: string, @Param('page') page: number, @Query() { type, status, time }: { type: string, status: string, time: string }) {
        if (!maintainerId || maintainerId === "abnormal") {
            return "abnormal"
        }
        return await this.maintainerService.findRepairsWaitFilterAll(maintainerId, +type, +status, time, page)
    }

    // 维修工转单
    @ApiOperation({ summary: "维修工转单工单", description: "维修工转单工单---维修工" })
    @Post('transferRepair')
    async transferRepair(@User('id') maintainerId: string, @Body() transferRepair: TransferRepairDto) {
        if (!maintainerId || maintainerId === "abnormal") {
            return "abnormal"
        }
        transferRepair.maintainerId = maintainerId
        return await this.maintainerService.transferRepair(transferRepair)
    }

    // 维修工退单
    @ApiOperation({ summary: "维修工退单工单", description: "维修工退单工单---维修工" })
    @Post('returnRepair')
    async returnRepair(@User('id') maintainerId: string, @Body() returnRepair: ReturnRepairDto) {
        if (!maintainerId || maintainerId === "abnormal") {
            return "abnormal"
        }
        returnRepair.maintainerId = maintainerId
        return await this.maintainerService.returnRepair(returnRepair)
    }

    // 维修工完单(交单)
    @ApiOperation({ summary: "维修工完成工单", description: "维修工完成工单---维修工" })
    @Post("fulfilRepairs")
    async fulfilRepairs(@User('id') maintainerId: string, @Body() fulfilRepairs: FulfilRepairsDto) {
        if (!maintainerId || maintainerId === "abnormal") {
            return "abnormal"
        }
        fulfilRepairs.maintainerId = maintainerId
        return await this.maintainerService.fulfilRepairs(fulfilRepairs)
    }
}
