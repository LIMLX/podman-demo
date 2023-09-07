import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminRole, AdminRoleGuard } from "src/common";
import { AuthAdminDto, CreateAdminDto, DelAuthAdminDto, FindUserAuthDto, FindUserOneDto, LoginDto } from "src/microservice/dto";
import { UserAdminService } from "src/microservice/service";

@ApiTags('usersAdmin')
@UseGuards(AdminRoleGuard)
@Controller("users/admin")
export class UserAdminController {
    constructor(
        private readonly usersService: UserAdminService
    ) { }

    // 登录模块admin
    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return await this.usersService.login(loginDto);
    }

    // 创建超级管理员
    @Post("create")
    async create(@Body() createAdminDto: CreateAdminDto) {
        return await this.usersService.create(createAdminDto);
    }

    // 模块admin授权
    @Post("authAdmin")
    async authAdmin(@Body() authAdmin: AuthAdminDto) {
        return await this.usersService.authAdmin(authAdmin);
    }

    // 撤销admin授权
    @Delete('delAuthAdmin')
    async delAuthAdmin(@Body() delAuthAdminDto: DelAuthAdminDto) {
        return await this.usersService.delAuthAdmin(delAuthAdminDto);
    }

    // 修改权限等级
    @Patch('updateAuthLevel')
    async updateAuthLevel(@Body() authAdmin: AuthAdminDto) {
        return await this.usersService.updateAuthLevel(authAdmin);
    }

    // 获取所有权限值
    @Get('findAuthAll')
    async findAuthAll() {
        return await this.usersService.findAuthAll();
    }

    // 查询当前角色是否有某种权限
    @Post('findUserAuth')
    async findUserAuth(@Body() findUserAuthDto: FindUserAuthDto) {
        return await this.usersService.findUserAuth(findUserAuthDto);
    }

    // 获取所有拥有管理员权限的用户
    @Get("findModuleAdmin/module=:moduleId/page=:page")
    async findModuleAdmin(@Param("page") page: number, @Param("moduleId") moduleId: string) {
        return await this.usersService.findModuleAdmin(moduleId, page);
    }

    // 检查用户是否存在---并返回数据
    @Post("findUserOne")
    async findUserOne(@Body() findUserOneDto: FindUserOneDto) {
        return await this.usersService.findUserOne(findUserOneDto);
    }

    @AdminRole([{ admin: "History", level: 1 }])
    @Get('demo')
    async demo() {
        return 1
    }
}