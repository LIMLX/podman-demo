import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { EmployeeRole, User } from "src/common";
import { EmployeeRoleGuard, StudentRoleGuard } from "src/common/guards";
import { CreateEmployeeDto, LoginEmloyeeDto, UpdateEmployeeDto, UpdateEmployeePswDto } from "src/microservice/dto";
import { UserEmployeeService } from "src/microservice/service/users";

@ApiTags('usersEmployee')
@UseGuards(EmployeeRoleGuard)
@Controller("users/employee")
export class UserEmployeeController {
  constructor(
    private readonly usersService: UserEmployeeService
  ) { }

  @ApiOperation({ summary: "职工登录接口", description: "同时进行数据库登录查询,并且返回jwt数据" })
  @Post("/loginEmployee")
  async loginEmployee(@Body() loginEmloyeeDto: LoginEmloyeeDto) {
    return await this.usersService.loginEmployee(loginEmloyeeDto)
  }

  @ApiOperation({ summary: "职工注册接口", description: "录入职工信息" })
  @Post("/signInEmployee")
  async signInEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.usersService.signInEmployee(createEmployeeDto)
  }

  @ApiOperation({ summary: "职工信息修改接口", description: "修改职工信息" })
  @Patch("/updateEmployee")
  async updateEmployee(@Body() updateEmployeeDto: UpdateEmployeeDto) {
    return await this.usersService.updateEmployee(updateEmployeeDto)
  }

  @ApiOperation({ summary: "职工密码修改接口", description: "修改职工密码" })
  @Patch("/updateEmployeePsw")
  async updateEmployeePsw(@Body() updateEmployeePswDto: UpdateEmployeePswDto) {
    return await this.usersService.updateEmployeePsw(updateEmployeePswDto)
  }

  @ApiOperation({ summary: "获取所有职工的基础信息", description: "职工基础信息获取" })
  @Get("/findEmployeeAll")
  async findEmployeeAll() {
    return await this.usersService.findEmployeeAll()
  }

  @Get('demo')
  @UseGuards(AuthGuard('jwt'))
  @EmployeeRole([{ module: "History", level: 1 }])
  async demo() {
    return "ok"
  }

  @Get('token')
  @UseGuards(AuthGuard('jwt'))
  async token(@User('type') user) {
    return user
  }
}