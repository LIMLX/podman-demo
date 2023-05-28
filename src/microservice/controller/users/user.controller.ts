import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "src/microservice/dto/users/user.dto";
import { UsersService } from "src/microservice/service/users/user.service";

@Controller('users/user')
export class UserController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.usersService.login(loginDto)
    }
}