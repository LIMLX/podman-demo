import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "src/microservice/dto/users/user.dto";
import { UsersService } from "src/microservice/service/users/user.service";

@ApiTags('用户公共接口')
@Controller('users/user')
export class UserController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @ApiOperation({ summary: "用户登录接口", description: "用户(职工/学生)登录" })
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.usersService.login(loginDto);
    }
}