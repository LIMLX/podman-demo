import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthEmployeeRoleDto, AuthStudentRoleDto, CreateRoleDto, DeleteRoleDto, UpdateRoleDto } from "src/microservice/dto";
import { UsersRoleService } from "src/microservice/service";

@ApiTags('usersRole')
@Controller('users/role')
export class UsersRoleController {
    constructor(private readonly usersService:UsersRoleService){}

    @ApiOperation({summary:"角色创建接口", description:"创建新角色"})
    @Post("/createRole")
    async createRole(@Body() createRoleDto: CreateRoleDto) {
        return await this.usersService.createRole(createRoleDto);
    }

    @ApiOperation({summary:"角色修改接口", description:"修改角色"})
    @Patch("/updateRole")
    async updateRole(@Body() updateRoledto: UpdateRoleDto) {
        return await this.usersService.updateRole(updateRoledto)
    } 

    @ApiOperation({summary:"角色删除接口", description:"删除角色"})
    @Delete("/deleteRole/id=:roleId")
    async deleteRole (@Param() deleteRoleDto : DeleteRoleDto) {
      return await this.usersService.deleteRole(deleteRoleDto)
    }

    @ApiOperation({summary:"职工角色授权", description:"给职工授权角色"})
    @Post("/authEmployeeRole")
    async roleEmployeeAuth (@Body() authEmployeeRoleDto: AuthEmployeeRoleDto) {
      return await this.usersService.roleEmployeeAuth(authEmployeeRoleDto)
    }

    @ApiOperation({summary:"学生角色授权", description:"给学生授权角色"})
    @Post("/authStudentRole")
    async roleStudentAuth (@Body() authStudentRoleDto: AuthStudentRoleDto) {
      return await this.usersService.roleStudentAuth(authStudentRoleDto)
    }  

    @ApiOperation({summary:"获取所有职工角色信息接口", description:"获取所有职工角色信息"})
    @Get('/findRoleEmployeeAll')
    async findRoleEmployeeAll () {
      return await this.usersService.findRoleEmployeeAll()
    }
  
    @ApiOperation({summary:"获取所有学生角色信息接口", description:"获取所有学生角色信息"})
    @Get('findRoleStudentAll')
    async findRoleStudentAll () {
      return await this.usersService.findRoleStudentAll()
    }
}