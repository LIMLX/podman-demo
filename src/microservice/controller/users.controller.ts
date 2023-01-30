import { Body, Controller, Get, Inject, Patch, Post, UseGuards } from "@nestjs/common";
import { CampusDTO_Create, ClassDTO_Create, EmployeeDTO, EmployeeDTO_Create, StudentRoleGuard, SchoolDTO_Create, StudentDTO, StudentDTO_Create } from "src/common";
import { StudentRole } from "src/common/decorators";
import { UsersService } from "../service";
import { ApiOperation } from "@nestjs/swagger";
import { RoleAuthCreateDTO, RoleCreateDTO, RoleDTO } from "src/common/dto/role";
import { ApplicationAutCreatehDTO, ApplicationCreateDTO, ApplicationDTO } from "src/common";
import { EmployeeRoleGuard } from "src/common/guards/roleEmployee.guard";
import { AdminRoleGuard } from "src/common/guards/roleAdmin.guard";


@Controller("users")
@UseGuards(StudentRoleGuard)
@UseGuards(EmployeeRoleGuard)
@UseGuards(AdminRoleGuard)
export class UserController {
  constructor(
    private readonly usersService: UsersService
    ) {}

  @ApiOperation({summary:"学生登录模块", description:"同时进行数据库登录查询，并且返回jwt数据"})
  @Post("/login")
  login_student(@Body() userDTO: StudentDTO) {
    return this.usersService.login_student(userDTO)
  }

  @ApiOperation({summary:"学生注册模块", description:"录入学生信息"})
  @Post("/signIn")
  signIn_student (@Body() userDTO: StudentDTO_Create) {
    return this.usersService.sign_in(userDTO)
  }

  @ApiOperation({summary:"学生信息修改模块", description:"修改学生信息"})
  @Patch("/update")
  update_student (@Body() userDTO: StudentDTO) {
    return this.usersService.update(userDTO)
  }

  @ApiOperation({summary:"职工登录模块", description:"同时进行数据库登录查询，并且返回jwt数据"})
  @Post("/loginEmployee")
  login_employee (@Body() employeeDTO: EmployeeDTO ) {
    return this.usersService.login_employee(employeeDTO)
  }

  @ApiOperation({summary:"职工注册模块", description:"录入职工信息"})
  @Post("/signInEmployee")
  signIn_employee (@Body() employeeDTO: EmployeeDTO_Create) {
    return this.usersService.sign_in_employee(employeeDTO)
  }

  @ApiOperation({summary:"获取校区数据模块", description:"返回所有校区数据"})
  @Get("/getCampusAll")
  campus_getAll () {
    return this.usersService.campus_getAll()
  }

  @ApiOperation({summary:"获取班级数据模块", description:"返回所有班级信息"})
  @Get("/getClassAll")
  class_getAll () {
    return this.usersService.class_getAll()
  }
  
  @ApiOperation({summary:"获取学校数据模块", description:"返回所有学校信息"})
  @Get("/getSchoolAll")
  school_getAll () {
    return this.usersService.school_getAll()
  }

  @ApiOperation({summary:"添加校区数据模块", description:"添加"})
  @Post("/campusAdd")
  campus_add (@Body() campusDTO: CampusDTO_Create) {
    return this.usersService.campus_add(campusDTO)
  }

  @ApiOperation({summary:"添加班级数据模块", description:"添加"})
  @Post("/classAdd")
  class_add (@Body() classDTO: ClassDTO_Create) {
    return this.usersService.class_add(classDTO)
  }

  @ApiOperation({summary:"添加学校数据模块", description:"添加"})
  @Post("/schoolAdd")
  school_add (@Body() schoolDTO: SchoolDTO_Create) {
    return this.usersService.school_add(schoolDTO)
  }

  // ==========================身份模块====================================
  @ApiOperation({summary:"查询所有角色数据模块", description:"返回所有角色信息"})
  @Get("/getRoleAll")
  role_getAll () {
    return this.usersService.role_getAll()
  }

  @ApiOperation({summary:"添加角色数据模块", description:"添加角色信息"})
  @Post("/roleAdd")
  role_add (@Body() roleDTO: RoleCreateDTO) {
    return this.usersService.role_add(roleDTO)
  }

  @ApiOperation({summary:"修改角色数据模块", description:"修改角色信息"})
  @Post("/roleUpdate")
  role_update (@Body() roleDTO: RoleDTO) {
    return this.usersService.role_update(roleDTO)
  }

  @ApiOperation({summary:"角色与用户授权模块", description:"授权"})
  @Post("/roleUserAuth")
  role_user_auth (@Body() roleUserAuthDTO : RoleAuthCreateDTO[]) {
    return this.usersService.role_user_auth(roleUserAuthDTO)
  }

  // ==========================应用模块====================================
  @ApiOperation({summary:"查询所有应用数据模块", description:"返回所有应用信息"})
  @Get("/getAppAll")
  app_getAll () {
    return this.usersService.app_getAll()
  }

  @ApiOperation({summary:"添加应用数据模块", description:"添加应用信息"})
  @Post("/appAdd")
  app_add (@Body() appAdd: ApplicationCreateDTO) {
    return this.usersService.app_add(appAdd)
  }

  @ApiOperation({summary:"修改应用数据模块", description:"修改应用信息"})
  @Post("/appUpdate")
  app_update (@Body() appDTO: ApplicationDTO) {
    return this.usersService.app_update(appDTO)
  }

  @ApiOperation({summary:"角色与应用授权模块", description:"授权"})
  @Post("/appRoleAuth")
  app_role_auth (@Body() appRoleAuth: ApplicationAutCreatehDTO[]) {
    return this.usersService.app_role_auth(appRoleAuth)
  }

  // @UseGuards(AuthGuard('jwt'))
  @StudentRole(['user'])
  @Post('/demo')
  demo () {
    return "ok"
  }
}