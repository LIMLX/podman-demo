import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthEmployeeRoleDto, AuthStudentRoleDto, CreateRoleDto, DeleteRoleDto, UpdateRoleDto } from "src/microservice/dto";
import { UsersRoleService } from "src/microservice/service";

@ApiTags('角色')
@Controller('users/role')
export class UsersRoleController {
  constructor(private readonly usersService: UsersRoleService) { }

  @ApiOperation({ summary: "角色创建接口", description: "创建新角色" })
  @Post("/createRole")
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.usersService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: "角色修改接口", description: "修改角色" })
  @Patch("/updateRole")
  async updateRole(@Body() updateRoledto: UpdateRoleDto) {
    return await this.usersService.updateRole(updateRoledto)
  }

  @ApiOperation({ summary: "角色删除接口", description: "删除角色" })
  @Delete("/deleteRole")
  async deleteRole(@Body() deleteRoleDto: DeleteRoleDto) {
    return await this.usersService.deleteRole(deleteRoleDto)
  }

  @ApiOperation({ summary: "职工角色授权", description: "给职工授权角色" })
  @Post("/authEmployeeRole")
  async roleEmployeeAuth(@Body() authEmployeeRoleDto: AuthEmployeeRoleDto) {
    return await this.usersService.roleEmployeeAuth(authEmployeeRoleDto)
  }

  @ApiOperation({ summary: "学生角色授权", description: "给学生授权角色" })
  @Post("/authStudentRole")
  async roleStudentAuth(@Body() authStudentRoleDto: AuthStudentRoleDto) {
    return await this.usersService.roleStudentAuth(authStudentRoleDto);
  }

  @ApiOperation({ summary: "获取所有职工角色信息接口", description: "获取所有职工角色信息" })
  @Get('/findRoleEmployeeAll')
  async findRoleEmployeeAll() {
    return await this.usersService.findRoleEmployeeAll();
  }

  @ApiOperation({ summary: "获取职工角色下的职工信息接口", description: "获取职工角色下的职工信息" })
  @Get("findEmployee/role=:roleId/page=:page")
  async findEmployee(@Param() { roleId, page }: { roleId: string, page: number }) {
    return await this.usersService.findEmployee(roleId, page);
  }

  @ApiOperation({ summary: "获取某个职工角色下的模块权限等级", description: "获取某个职工角色下的模块权限等级" })
  @Get("findEmployeeModule/role=:roleId")
  async findEmployeeModule(@Param("roleId") roleId: string) {
    return await this.usersService.findEmployeeModule(roleId);
  }

  @ApiOperation({ summary: "获取职工角色下的职工总数量接口", description: "获取职工角色下的职工总数量" })
  @Get("findEmployeeSum/role=:roleId")
  async findEmployeeSum(@Param("roleId") roleId: string) {
    return await this.usersService.findEmployeeSum(roleId);
  }

  @ApiOperation({ summary: "获取所有学生角色信息接口", description: "获取所有学生角色信息" })
  @Get('findRoleStudentAll')
  async findRoleStudentAll() {
    return await this.usersService.findRoleStudentAll();
  }

  @ApiOperation({ summary: "获取某个学生角色下的模块权限等级", description: "获取某个学生角色下的模块权限等级" })
  @Get('findStudentModule/role=:roleId')
  async findStudentModule(@Param("roleId") roleId: string) {
    return await this.usersService.findStudentModule(roleId);
  }

  @ApiOperation({ summary: "获取学生角色下的职工信息接口", description: "获取学生角色下的职工信息" })
  @Get("findStudent/role=:roleId/page=:page")
  async findStudent(@Param() { roleId, page }: { roleId: string, page: number }) {
    return await this.usersService.findStudent(roleId, page);
  }

  @ApiOperation({ summary: "获取学生角色下的学生总数量接口", description: "获取学生角色下的学生总数量" })
  @Get("findStudentSum/role=:roleId")
  async findStudentSum(@Param("roleId") roleId: string) {
    return await this.usersService.findStudentSum(roleId);
  }
}