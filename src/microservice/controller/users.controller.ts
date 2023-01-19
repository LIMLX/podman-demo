import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { RoleGuard, UserDTO, signIn_UserDTO } from "src/common";
import { Roles } from "src/common/decorators";
import { UsersService } from "../service";

@Controller("users")
@UseGuards(RoleGuard)
export class UserController {
  constructor(
    private readonly usersService: UsersService
    ) {}

  @Post("/login")
  login_student(@Body() userDTO: UserDTO) {
    return this.usersService.login_student(userDTO)
  }

  @Post("/signIn")
  demo (@Body() userDTO: signIn_UserDTO) {
    return this.usersService.sign_in(userDTO)
  }
}