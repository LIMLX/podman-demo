import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { RoleGuard, UserDTO, signIn_UserDTO } from "src/common";
import { Roles } from "src/common/decorators";
import { UsersService } from "../service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("users")
@UseGuards(RoleGuard)
export class UserController {
  constructor(
    private readonly usersService: UsersService
    ) {}

  @ApiOperation({summary:"登录模块", description:"调用时会使用local策略，同时进行数据库登录查询，并且返回jwt数据"})
  @Post("/login")
  login_student(@Body() userDTO: UserDTO) {
    return this.usersService.login_student(userDTO)
  }

  @ApiOperation({summary:"注册模块", description:"录入学生消息"})
  @Post("/signIn")
  demo (@Body() userDTO: signIn_UserDTO) {
    return this.usersService.sign_in(userDTO)
  }
}