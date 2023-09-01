import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { EmployeeRoleGuard } from "src/common/guards";
import { UpdateEmployeePswDto } from "src/microservice/dto";
import { UserEmployeeService } from "src/microservice/service/users";

@ApiTags('usersEmployee')
@UseGuards(EmployeeRoleGuard)
@Controller("users/employee")
export class UserEmployeeController {
  constructor(
    private readonly usersService: UserEmployeeService
  ) { }

  @ApiOperation({ summary: "职工密码修改接口", description: "修改职工密码" })
  @Patch("/updateEmployeePsw")
  async updateEmployeePsw(@Body() updateEmployeePswDto: UpdateEmployeePswDto) {
    return await this.usersService.updateEmployeePsw(updateEmployeePswDto)
  }
}