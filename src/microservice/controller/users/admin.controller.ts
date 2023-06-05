import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminRole, AdminRoleGuard } from "src/common";
import { AuthAdminDto, CreateAdminDto, DelAuthAdminDto, FindUserAuthDto, LoginDto } from "src/microservice/dto";
import { UserAdminService } from "src/microservice/service";

@ApiTags('usersAdmin')
@UseGuards(AdminRoleGuard)
@Controller("users/admin")
export class UserAdminController {
    constructor(
        private readonly usersService: UserAdminService
    ) { }

    // 创建管理员
    @Post("create")
    async create(@Body() createAdminDto: CreateAdminDto) {
        return await this.usersService.create(createAdminDto)
    }

    // 登录模块admin
    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return await this.usersService.login(loginDto)
    }

    // 模块admin授权
    @Post("authAdmin")
    async authAdmin(@Body() authAdmin: AuthAdminDto) {
        return await this.usersService.authAdmin(authAdmin)
    }

    // 撤销admin授权
    @Delete('delAuthAdmin')
    async delAuthAdmin(@Body() delAuthAdminDto: DelAuthAdminDto) {
        return await this.usersService.delAuthAdmin(delAuthAdminDto)
    }

    // 修改权限等级
    @Patch('updateAuthLevel')
    async updateAuthLevel(@Body() authAdmin: AuthAdminDto) {
        return await this.usersService.updateAuthLevel(authAdmin)
    }

    // 获取所有权限值
    @Get('findAuthAll')
    async findAuthAll() {
        return await this.usersService.findAuthAll()
    }

    // 查询当前角色是否有某种权限
    @Post('findUserAuth')
    async findUserAuth(@Body() findUserAuthDto: FindUserAuthDto) {
        return await this.usersService.findUserAuth(findUserAuthDto)
    }


    @AdminRole([{ admin: "History", level: 1 }])
    @Get('demo')
    async demo() {
        return 1
    }
}