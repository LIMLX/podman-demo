import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { EmployeeRole, User } from "src/common";
import { Employee, EmployeeRoleGuard } from "src/common/guards";
import { UpdateEmployeePswDto } from "src/microservice/dto";
import { UserEmployeeService } from "src/microservice/service/users";

@ApiTags('职工用户')
@UseGuards(EmployeeRoleGuard)
@Controller("users/employee")
export class UserEmployeeController {
  constructor(
    private readonly usersService: UserEmployeeService
  ) { }

  @ApiOperation({ summary: "职工密码修改接口", description: "修改职工密码" })
  @UseGuards(AuthGuard('jwt'))
  @EmployeeRole([{ module: Employee.User, level: 0 }])
  @Patch("/updateEmployeePsw")
  async updateEmployeePsw(@Body() updateEmployeePswDto: UpdateEmployeePswDto, @User("id") employeeId: string) {
    if (!employeeId || employeeId === "abnormal") {
      return "abnormal";
    }
    updateEmployeePswDto.employeeId = employeeId;
    return await this.usersService.updateEmployeePsw(updateEmployeePswDto);
  }
}