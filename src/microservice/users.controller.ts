import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";
import { map } from "rxjs";
import { UserDTO } from "src/common";

@Controller("users")
export class UserController {
  constructor(
    private readonly jwtService: JwtService,
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ) {}

  @Post("/login")
  login(@Body() userDTO: UserDTO) {
    const pattern = { cmd: "user_validateUser" };

    let demo = this.userService
    .send<Object>(pattern,userDTO)
    .pipe(
      map((message: any) => {if (message) {
        return {token: this.jwtService.sign({student: message})}
      } else {
        return {"message": "Unauthorized"}
      }
    })
    ) 

    return demo
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("/demo")
  demo () {
    return "jwt验证通过"
  }
}