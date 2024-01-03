import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { map } from "rxjs"
import { UpdateEmployeePswDto } from "src/microservice/dto"

@Injectable()
export class UserEmployeeService {

  constructor(
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) { }

  // 修改职工密码
  async updateEmployeePsw(updateEmployeePswDto: UpdateEmployeePswDto) {
    const pattern = { cmd: "users_employee_employeeUpdatePsw" };
    const data = updateEmployeePswDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }
}