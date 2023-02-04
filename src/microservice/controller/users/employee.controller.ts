import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { EmployeeCreateDTO, EmployeeDTO } from "src/microservice/dto";
import { UserEmployeeService } from "src/microservice/service/users";

@Controller("users/employee")
export class UserEmployeeController {
    constructor(
        private readonly usersService: UserEmployeeService
    ) {}
    
    @ApiOperation({summary:"职工登录模块", description:"同时进行数据库登录查询，并且返回jwt数据"})
    @Post("/loginEmployee")
    login_employee (@Body() employeeDTO: EmployeeDTO ) {
      return this.usersService.login_employee(employeeDTO)
    }
  
    @ApiOperation({summary:"职工注册模块", description:"录入职工信息"})
    @Post("/signInEmployee")
    signIn_employee (@Body() employeeDTO: EmployeeCreateDTO) {
      return this.usersService.sign_in_employee(employeeDTO)
    }
}