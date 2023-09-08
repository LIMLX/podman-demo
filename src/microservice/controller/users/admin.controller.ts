import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminRole, AdminRoleGuard, Admin } from "src/common";
import { AuthAdminDto, CreateAdminDto, DelAuthAdminDto, FindUserAuthDto, FindUserOneDto, LoginDto } from "src/microservice/dto";
import { UserAdminService } from "src/microservice/service";

@ApiTags('管理员模块')
@UseGuards(AdminRoleGuard)
@Controller("users/admin")
export class UserAdminController {
    constructor(
        private readonly usersService: UserAdminService
    ) { }

    // 登录模块admin
    @ApiOperation({ summary: "登录模块管理员", description: "登录模块管理员" })
    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return await this.usersService.login(loginDto);
    }

    // 创建超级管理员
    @ApiOperation({ summary: "创建超级管理员", description: "创建超级管理员" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Post("create")
    async create(@Body() createAdminDto: CreateAdminDto) {
        return await this.usersService.create(createAdminDto);
    }

    // 模块admin授权
    @ApiOperation({ summary: "授权模块管理员", description: "授权模块管理员" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Post("authAdmin")
    async authAdmin(@Body() authAdmin: AuthAdminDto) {
        return await this.usersService.authAdmin(authAdmin);
    }

    // 撤销admin授权
    @ApiOperation({ summary: "撤销模块管理员授权", description: "撤销模块管理员授权" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Delete('delAuthAdmin')
    async delAuthAdmin(@Body() delAuthAdminDto: DelAuthAdminDto) {
        return await this.usersService.delAuthAdmin(delAuthAdminDto);
    }

    // 修改权限等级
    @ApiOperation({ summary: "修改权限等级", description: "修改权限等级" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Patch('updateAuthLevel')
    async updateAuthLevel(@Body() authAdmin: AuthAdminDto) {
        return await this.usersService.updateAuthLevel(authAdmin);
    }

    // 获取所有权限值
    @ApiOperation({ summary: "获取所有权限值", description: "获取所有权限值" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get('findAuthAll')
    async findAuthAll() {
        return await this.usersService.findAuthAll();
    }

    // 查询当前角色是否有某种权限
    @ApiOperation({ summary: "查询当前角色是否有某种权限", description: "查询当前角色是否有某种权限" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Post('findUserAuth')
    async findUserAuth(@Body() findUserAuthDto: FindUserAuthDto) {
        return await this.usersService.findUserAuth(findUserAuthDto);
    }

    // 获取所有拥有管理员权限的用户
    @ApiOperation({ summary: "获取拥有管理员权限的用户", description: "获取拥有管理员权限的用户(筛选)" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findModuleAdmin/module=:moduleId/page=:page")
    async findModuleAdmin(@Param("page") page: number, @Param("moduleId") moduleId: string) {
        return await this.usersService.findModuleAdmin(moduleId, page);
    }

    // 检查用户是否存在---并返回数据
    @ApiOperation({ summary: "检查用户是否存在", description: "检查用户是否存在---并返回数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Post("findUserOne")
    async findUserOne(@Body() findUserOneDto: FindUserOneDto) {
        return await this.usersService.findUserOne(findUserOneDto);
    }

    @AdminRole([{ admin: Admin.History, level: 1 }])
    @Get('demo')
    async demo() {
        return 1
    }
}