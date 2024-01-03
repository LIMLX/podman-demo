import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Admin, AdminRole, AdminRoleGuard } from "src/common";
import { AuthEmployeeRoleDto, AuthRoleDto, AuthStudentRoleDto, CreateAdminUserDto, CreateRoleDto, DeleteRoleDto, FindAdminUserDto, FindEmployeeDto, UpdateAdminUserDto, UpdateRoleDto } from "src/microservice/dto";
import { UsersRoleService } from "src/microservice/service";

@ApiTags('角色')
@UseGuards(AdminRoleGuard)
@Controller('users/role')
export class UsersRoleController {
  constructor(private readonly usersService: UsersRoleService) { }

  @ApiOperation({ summary: "角色创建接口", description: "创建新角色" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("/createRole")
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.usersService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: "角色修改接口", description: "修改角色" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Patch("/updateRole")
  async updateRole(@Body() updateRoledto: UpdateRoleDto) {
    return await this.usersService.updateRole(updateRoledto)
  }

  @ApiOperation({ summary: "角色删除接口", description: "删除角色" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete("/deleteRole")
  async deleteRole(@Body() deleteRoleDto: DeleteRoleDto) {
    return await this.usersService.deleteRole(deleteRoleDto)
  }

  @ApiOperation({ summary: "授权职工角色模块权限", description: "授权职工角色模块权限" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("authEmployeeRole")
  async authEmployeeRole(@Body() authRoleDto: AuthRoleDto) {
    return await this.usersService.authEmployeeRole(authRoleDto);
  }

  @ApiOperation({ summary: "删除/撤销职工角色权限", description: "删除/撤销职工角色权限" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete("delEmployeeRole")
  async delEmployeeRole(@Body() authRoleDto: AuthRoleDto) {
    return await this.usersService.delEmployeeRole(authRoleDto);
  }

  @ApiOperation({ summary: "职工角色授权", description: "给职工授权角色" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("authEmployee")
  async authEmployee(@Body() authEmployeeRoleDto: AuthEmployeeRoleDto) {
    return await this.usersService.authEmployee(authEmployeeRoleDto)
  }

  // 授权学生角色模块权限
  @ApiOperation({ summary: "授权学生角色模块权限", description: "授权学生角色模块权限" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("authStudentRole")
  async authStudentRole(@Body() authRoleDto: AuthRoleDto) {
    return await this.usersService.authStudentRole(authRoleDto);
  }

  // 删除/撤销学生角色权限
  @ApiOperation({ summary: "删除/撤销学生角色权限", description: "删除/撤销学生角色权限" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete("delStudentRole")
  async delStudentRole(@Body() authRoleDto: AuthRoleDto) {
    return await this.usersService.delStudentRole(authRoleDto);
  }

  @ApiOperation({ summary: "学生角色授权", description: "给学生授权角色" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("authStudent")
  async roleStudentAuth(@Body() authStudentRoleDto: AuthStudentRoleDto) {
    return await this.usersService.authStudent(authStudentRoleDto);
  }

  @ApiOperation({ summary: "获取所有职工角色信息接口", description: "获取所有职工角色信息" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get('/findRoleEmployeeAll')
  async findRoleEmployeeAll() {
    return await this.usersService.findRoleEmployeeAll();
  }

  @ApiOperation({ summary: "获取职工角色下的职工信息接口", description: "获取职工角色下的职工信息" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findEmployee/role=:roleId/page=:page")
  async findEmployee(@Param() findEmployeeDto: FindEmployeeDto, @Query("like") like: string) {
    if (!/^[0-9]*$/.test(findEmployeeDto.page)) {
      return "abnormal";
    }
    findEmployeeDto.page = Number(findEmployeeDto.page);
    findEmployeeDto.like = like;
    return await this.usersService.findEmployee(findEmployeeDto);
  }

  @ApiOperation({ summary: "获取某个职工角色下的模块权限等级", description: "获取某个职工角色下的模块权限等级" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findEmployeeModule/role=:roleId")
  async findEmployeeModule(@Param("roleId") roleId: string) {
    return await this.usersService.findEmployeeModule(roleId);
  }

  // 根据工号/姓名查询职工
  @ApiOperation({ summary: "根据工号/姓名查询职工", description: "根据工号/姓名查询职工" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findEmployeeAdd")
  async findEmployeeAdd(@Query("like") like: string) {
    return await this.usersService.findEmployeeAdd(like);
  }

  @ApiOperation({ summary: "获取职工角色下的职工总数量接口", description: "获取职工角色下的职工总数量" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findEmployeeSum/role=:roleId")
  async findEmployeeSum(@Param("roleId") roleId: string, @Query("like") like: string) {
    return await this.usersService.findEmployeeSum(roleId, like);
  }

  @ApiOperation({ summary: "获取所有学生角色信息接口", description: "获取所有学生角色信息" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get('findRoleStudentAll')
  async findRoleStudentAll() {
    return await this.usersService.findRoleStudentAll();
  }

  @ApiOperation({ summary: "获取某个学生角色下的模块权限等级", description: "获取某个学生角色下的模块权限等级" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get('findStudentModule/role=:roleId')
  async findStudentModule(@Param("roleId") roleId: string) {
    return await this.usersService.findStudentModule(roleId);
  }

  @ApiOperation({ summary: "获取学生角色下的学生信息接口", description: "获取学生角色下的学生信息" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findStudent/role=:roleId/page=:page")
  async findStudent(@Param() { roleId, page }: { roleId: string, page: number }, @Query("like") like: string) {
    return await this.usersService.findStudent(roleId, like, page);
  }

  @ApiOperation({ summary: "获取学生角色下的学生总数量接口", description: "获取学生角色下的学生总数量" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findStudentSum/role=:roleId")
  async findStudentSum(@Param("roleId") roleId: string, @Query("like") like: string) {
    return await this.usersService.findStudentSum(roleId, like);
  }

  @ApiOperation({ summary: "根据学号/姓名获取学生数据", description: "根据学号/姓名获取学生数据" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findStudentAdd")
  async findStudentAdd(@Query("like") like: string) {
    return await this.usersService.findStudentAdd(like);
  }

  @ApiOperation({ summary: "获取所有管理员类", description: "获取所有管理员类" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findAdminType")
  async findAdminType() {
    return await this.usersService.findAdminType();
  }

  @ApiOperation({ summary: "获取管理员下的用户数据", description: "获取管理员下的用户数据" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findAdminUser/role=:moduleId/page=:page")
  async findAdminUser(@Param("moduleId") moduleId: string, @Param("page") page: string, @Query() findAdminUserDto: FindAdminUserDto) {
    findAdminUserDto.moduleId = moduleId;
    if (!/^[0-9]*$/.test(page)) {
      return "abnormal";
    }
    findAdminUserDto.page = Number(page);
    return await this.usersService.findAdminUser(findAdminUserDto);
  }

  @ApiOperation({ summary: "获取管理员下的用户数量", description: "获取管理员下的用户数量" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findAdminUserSum/role=:moduleId")
  async findAdminUserSum(@Param("moduleId") moduleId: string, @Query() findAdminUserDto: FindAdminUserDto) {
    findAdminUserDto.moduleId = moduleId;
    return await this.usersService.findAdminUserSum(findAdminUserDto);
  }

  @ApiOperation({ summary: "创建新管理员", description: "创建新管理员" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("createAdminUser")
  async createAdminUser(@Body() createAdminUserDto: CreateAdminUserDto) {
    return await this.usersService.createAdminUser(createAdminUserDto);
  }

  @ApiOperation({ summary: "编辑管理员权限", description: "编辑管理员权限" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Patch("updateAdminUser")
  async updateAdminUser(@Body() updateAdminUserDto: UpdateAdminUserDto) {
    return await this.usersService.updateAdminUser(updateAdminUserDto);
  }

  @ApiOperation({ summary: "删除管理员", description: "删除管理员" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete("delAdminUserDto/module=:moduleId/user=:userId")
  async delAdminUser(@Param() { moduleId, userId }: { moduleId: string, userId: string }) {
    return await this.usersService.delAdminUser(moduleId, userId);
  }

  @ApiOperation({ summary: "获取所有模块", description: "获取所有模块" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findMoudle")
  async findMoudle() {
    return await this.usersService.findMoudle();
  }

  @ApiOperation({ summary: "获取所有权限等级", description: "获取所有权限等级" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findOperation")
  async findOperation() {
    return await this.usersService.findOperation();
  }
}