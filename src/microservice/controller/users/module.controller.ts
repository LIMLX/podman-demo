import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Admin, AdminRole } from "src/common";
import { User } from "src/common/decorators/user.data";
import { AuthEmployeeDto, AuthStudentDto, CreateModuleDto, PrivateEmployeeAuthDto, PrivateStudentAuthDto, UpdateEmployeeAuthDto, UpdateEmployeePrivateDto, UpdateModuleDto, UpdateStudentAuthDto, UpdateStudentPrivateDto } from "src/microservice/dto";
import { DeleteAuthEmployeePrivateDto, DeleteAuthEmployeeRoleDto, DeleteAuthStudentPrivateDto, DeleteAuthStudentRoleDto } from "src/microservice/dto/users/module.dto/module/delete-module.dto";
import { UsersModuleService } from "src/microservice/service";

@ApiTags('模块权限')
@Controller('users/module')
export class UsersModuleController {
  constructor(private readonly moduleService: UsersModuleService) { }

  // 创建模块
  @ApiOperation({ summary: "模块创建接口", description: "创建新模块" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("/moduleCreate")
  async createModule(@Body() createModuleDto: CreateModuleDto) {
    return await this.moduleService.createModule(createModuleDto);
  }

  // 修改模块
  @ApiOperation({ summary: "模块修改接口", description: "修改模块" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Patch('/updateModule')
  async updateModule(@Body() updateModuleDto: UpdateModuleDto) {
    return await this.moduleService.updateModule(updateModuleDto);
  }

  // 删除模块
  @ApiOperation({ summary: "模块删除接口", description: "删除模块" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete('/deleteModule/id=:moduleId')
  async deleteModule(@Param("moduleId") moduleId: string) {
    return await this.moduleService.deleteModule(moduleId);
  }

  // 查询所有模块
  @ApiOperation({ summary: "查询所有模块接口", description: "获取所有模块的信息" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("/findMoudleAll")
  async findMoudleAll() {
    return await this.moduleService.findMoudleAll();
  }

  // --------------------------------------职工权限---------------------------------------

  // 模块给职工角色授权
  @ApiOperation({ summary: "职工模块授权接口", description: "模块给职工授权" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("/authEmployeeRole")
  async moduleEmployeeRoleAuth(@Body() authEmployeeDto: AuthEmployeeDto) {
    return await this.moduleService.moduleEmployeeRoleAuth(authEmployeeDto);
  }

  // 修改职工模块权限
  @ApiOperation({ summary: "职工模块权限修改接口", description: "修改职工模块权限" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Patch("/updateEmployeeAuth")
  async moduleEmployeeRoleUpdate(@Body() updateEmployeeAuthDto: UpdateEmployeeAuthDto) {
    return await this.moduleService.moduleEmployeeRoleUpdate(updateEmployeeAuthDto);
  }

  // 删除职工模块权限
  @ApiOperation({ summary: "职工模块权限删除接口", description: "删除职工模块的权限" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete("/deleltEmployeeAuth")
  async moduleEmployeeAuthdelelt(@Body() deleteAuthDto: DeleteAuthEmployeeRoleDto) {
    return await this.moduleService.moduleEmployeeAuthdelelt(deleteAuthDto);
  }

  // // 职工私有授权
  // @ApiOperation({ summary: "职工私有模块权限授权接口", description: "职工私有权限授权" })
  // @Post("/authEmployeePrivate")
  // async privateEmployeeAuth(@Body() authEmployeeDto: PrivateEmployeeAuthDto) {
  //   return await this.moduleService.privateEmployeeAuth(authEmployeeDto);
  // }

  // // 修改职工私有权限
  // @ApiOperation({ summary: "职工私有模块权限修改接口", description: "职工私有权限修改" })
  // @Patch("/updateEmployeePrivate")
  // async privateEmployeeAuthUpdate(@Body() updateEmployeeAuthDto: UpdateEmployeePrivateDto) {
  //   return await this.moduleService.privateEmployeeAuthUpdate(updateEmployeeAuthDto)
  // }

  // // 删除职工私有权限
  // @ApiOperation({ summary: "职工私有模块权限删除接口", description: "职工私有权限删除" })
  // @Delete("/deleltEmployeePrivate/id=:authId")
  // async privateEmployeeAuthdelelt(@Param() deleteAuthDto: DeleteAuthEmployeePrivateDto) {
  //   return await this.moduleService.privateEmployeeAuthdelelt(deleteAuthDto)
  // }


  // --------------------------------------学生权限---------------------------------------

  // 模块给学生角色授权
  @ApiOperation({ summary: "学生角色授权接口", description: "学生角色授权" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("/authStudentRole")
  async moduleStudentRoleAuth(@Body() authStudentDto: AuthStudentDto) {
    return await this.moduleService.moduleStudentRoleAuth(authStudentDto);
  }

  // 修改学生模块权限
  @ApiOperation({ summary: "学生角色模块权限修改接口", description: "修改学生角色在模块上的权限" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Patch("/updateStudentAuth")
  async moduleStudentRoleUpdate(@Body() updateStudentAuthDto: UpdateStudentAuthDto) {
    return await this.moduleService.moduleStudentRoleUpdate(updateStudentAuthDto);
  }

  // 删除学生模块权限
  @ApiOperation({ summary: "学生角色模块权限删除接口", description: "删除学生角色在模块上的权限" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete("/deleltStudentAuth")
  async moduleStudentAuthdelelt(@Body() deleteAuthDto: DeleteAuthStudentRoleDto) {
    return await this.moduleService.moduleStudentAuthdelelt(deleteAuthDto);
  }

  // //学生私有授权
  // @ApiOperation({ summary: "学生私有授权接口", description: "学生私有授权" })
  // @Post("/authStudentPrivate")
  // async privateStudentAuth(@Body() authStudentDto: PrivateStudentAuthDto) {
  //   return await this.moduleService.privateStudentAuth(authStudentDto)
  // }

  // // 修改学生私有权限
  // @ApiOperation({ summary: "学生私有模块权限修改接口", description: "修改学生私有模块权限" })
  // @Patch("/updateStudentPrivate")
  // async privateStudentUpdate(@Body() updateStudentAuthDto: UpdateStudentPrivateDto) {
  //   return await this.moduleService.privateStudentUpdate(updateStudentAuthDto)
  // }

  // // 删除学生私有权限
  // @ApiOperation({ summary: "学生私有授权删除接口", description: "删除学生私有模块权限" })
  // @Delete("/deleltStudentPrivate/id=:authId")
  // async privateStudentdelelt(@Param() deleteAuthDto: DeleteAuthStudentPrivateDto) {
  //   return await this.moduleService.privateStudentdelelt(deleteAuthDto)
  // }
}