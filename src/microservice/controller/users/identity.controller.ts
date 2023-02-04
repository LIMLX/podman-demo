import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { CampusCreateDTO, ClassCreateDTO, SchoolCreateDTO } from "src/microservice/dto";
import { UserIdentityService } from "src/microservice/service/users";

@Controller("users/identity")
export class UserIdentityController {
    constructor(
        private readonly usersService: UserIdentityService
    ) {}
  
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
    campus_add (@Body() campusDTO: CampusCreateDTO) {
      return this.usersService.campus_add(campusDTO)
    }
  
    @ApiOperation({summary:"添加班级数据模块", description:"添加"})
    @Post("/classAdd")
    class_add (@Body() classDTO: ClassCreateDTO) {
      return this.usersService.class_add(classDTO)
    }
  
    @ApiOperation({summary:"添加学校数据模块", description:"添加"})
    @Post("/schoolAdd")
    school_add (@Body() schoolDTO: SchoolCreateDTO) {
      return this.usersService.school_add(schoolDTO)
    }
}