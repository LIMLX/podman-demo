import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { UserDTO, signIn_UserDTO } from "src/common";

@Injectable()
export class UsersService {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
        ) {}

    login_student (userDTO: UserDTO) {
    const pattern = { cmd: "user_validateUser" };

    let userData = this.userService
    .send<UserDTO>(pattern,userDTO)
    .pipe(
      map((message: any) => {
        if (message) {
          return {token: this.jwtService.sign({student: message})}
      } else {
        return {"message": "Unauthorized"}
      }
    })
    )
    return userData
    }

    sign_in (userDTO: signIn_UserDTO) {
      const pattern = { cmd: "user_signIn" };

      let status = this.userService
      .send<UserDTO>(pattern,userDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
}