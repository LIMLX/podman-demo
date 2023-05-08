import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RepairsAdminRoleGuard, RepiarsAdminRole } from 'src/common';
import { CreateAdminDto, LoginAdminDto, UpdateAdminDto } from 'src/microservice/dto/repairs';
import { RepairsAdminService } from 'src/microservice/service/repairs';

@ApiTags("admin")
@UseGuards(RepairsAdminRoleGuard)
@Controller('repairs/admin')
export class RepairsAdminController {
    constructor(private readonly adminService: RepairsAdminService) { }
    // 创建新管理员
    // @UseGuards(AuthGuard('jwt'))
    // @Post('createAdmin')
    // async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    //     return await this.adminService.createAdmin(createAdminDto);
    // }
    // 修改管理员
    @RepiarsAdminRole([])
    @UseGuards(AuthGuard('jwt'))
    @Patch('updateAdmin')
    async updateAdmin(@Body() updateAdminDto: UpdateAdminDto) {
        return await this.adminService.updateAdmin(updateAdminDto);
    }
    // 管理员登录
    @Post('loginAdmin')
    async loginAdmin(@Body() LoginDto: LoginAdminDto) {
        return await this.adminService.loginAdmin(LoginDto)
    }
    // 管理员的修改预计时间接口
    @UseGuards(AuthGuard('jwt'))
    @RepiarsAdminRole([])
    @Post('updateRepairsET')
    async updateRepairsET(@Body() { time, repairId }: { time: string, repairId: number }) {
        return await this.adminService.updateRepairsET(time, +repairId)
    }

    // 查询所有维修工信息----此操作为admin操作
    @ApiOperation({ summary: "查询维修工数据", description: "查询维修工详细数据---管理员" })
    @UseGuards(AuthGuard('jwt'))
    @RepiarsAdminRole([])
    @Get("findMaintainerAll")
    async findMaintainerAll() {
        return await this.adminService.findMaintainerAll()
    }

    // 管理员查询工单
    @UseGuards(AuthGuard('jwt'))
    @RepiarsAdminRole([])
    @Get('findRepairsAll/page=:page')
    async findRepairsAll(@Param() { page }: { page: string }) {
        return await this.adminService.findRepairsAll(+page)
    }
    // 管理员查询详细工单
    @UseGuards(AuthGuard('jwt'))
    @RepiarsAdminRole([])
    @Get('findRepairs/id=:repairId')
    async findRepairs(@Param() { repairId }: { repairId: string }) {
        return await this.adminService.findRepairs(+repairId)
    }
    // 管理员过滤查询
    @UseGuards(AuthGuard('jwt'))
    @RepiarsAdminRole([])
    @Get('findFilter/page=:page?type=:typeNum&status=:statusNum')
    async findFilter(@Param() { typeNum, statusNum, page }: { typeNum: string, statusNum: string, page: string }) {
        return await this.adminService.findFilter(typeNum, statusNum, +page)
    }
}