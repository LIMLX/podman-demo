import { Inject, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ClientProxy } from "@nestjs/microservices"
import { map } from "rxjs"
import { EmployeeCreateDTO, EmployeeDTO } from "src/microservice/dto"

@Injectable()
export class UserEmployeeService {

    constructor(
        private readonly jwtService: JwtService,
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ){}

    login_employee (employeeDTO: EmployeeDTO) {
    const pattern = { cmd: "employee_validateUser" }

    let data = this.userService
    .send<EmployeeDTO>(pattern,employeeDTO)
    .pipe(
      map((message: any) => {
        if (message) {
          return {token: this.jwtService.sign({student: message})}
      } else {
        return {"message": "Unauthorized"}
      }
    }
    ))
    return data
  }

  sign_in_employee (employeeDTO: EmployeeCreateDTO) {
    const pattern = { cmd: "employee_signIn" }

    let status = this.userService
    .send<EmployeeCreateDTO>(pattern,employeeDTO)
    .pipe(
      map((message: any) => {
        return {message : message}
      }
    ))
    return status
  }
}