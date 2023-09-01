import { Inject, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ClientProxy } from "@nestjs/microservices"
import { lastValueFrom, map } from "rxjs"
import { CreateEmployeeDto, LoginEmloyeeDto, UpdateEmployeeDto, UpdateEmployeePswDto } from "src/microservice/dto"

@Injectable()
export class UserEmployeeService {

  constructor(
    private readonly jwtService: JwtService,
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) { }

  // 修改职工密码
  async updateEmployeePsw(updateEmployeePswDto: UpdateEmployeePswDto) {
    const pattern = { cmd: "employee_updatePsw" };
    const data = updateEmployeePswDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }
}