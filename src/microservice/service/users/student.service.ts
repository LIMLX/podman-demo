import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { StudentCreateDTO, StudentDTO } from "src/microservice/dto";

@Injectable()
export class UserStudentService {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
        ) {}

    login_student (userDTO: StudentDTO) {
    const pattern = { cmd: "student_validateUser" };

    let userData = this.userService
    .send<StudentDTO>(pattern,userDTO)
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

    sign_in (userDTO: StudentCreateDTO) {
      const pattern = { cmd: "student_signIn" };

      let status = this.userService
      .send<StudentCreateDTO>(pattern,userDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }

    update (userDTO: StudentDTO) {
      const pattern = { cmd: "student_update" };

      let status = this.userService
      .send<StudentDTO>(pattern,userDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
}