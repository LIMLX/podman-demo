import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApplicationAutCreatehDTO, ApplicationCreateDTO, ApplicationDTO, RoleAuthCreateDTO, RoleCreateDTO, RoleDTO } from "src/microservice/dto";
import { UserAuthService } from "src/microservice/service/users";

@Controller("users/auth")
export class UserAuthController {
    constructor(
        private readonly usersService: UserAuthService
    
        ) {}

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
}