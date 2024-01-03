import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminRoleGuard, StudentRoleGuard, User, UserEnum, UserRole, UserRoleGuard } from "src/common";
import { LoginDto } from "src/microservice/dto/users/user.dto";
import { UsersService } from "../service";

@ApiTags('用户公共接口')
@Controller('users/user')
@UseGuards(UserRoleGuard)
export class UserController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @ApiOperation({ summary: "用户登录接口", description: "用户(职工/学生)登录" })
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.usersService.login(loginDto);
    }

    // 用户获取有权限模块的数据
    @ApiOperation({ summary: "用户获取有权限模块的数据", description: "用户获取有权限模块的数据" })
    @UserRole([{ module: UserEnum.User, level: 0 }])
    @Get('/findUserModule')
    async findUserModule(@User("module") module: any) {
        return await this.usersService.findUserModule(module);
    }
}