import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { StudentRoleGuard } from "src/common"
import { StudentCreateDTO, StudentDTO } from "src/microservice/dto"
import { UserStudentService } from "src/microservice/service/users"

@Controller("users/student")
@UseGuards(StudentRoleGuard)
export class UserStudentController {
    constructor(
        private readonly usersService: UserStudentService
    ) {}

    @ApiOperation({summary:"学生登录模块", description:"同时进行数据库登录查询，并且返回jwt数据"})
    @Post("/login")
    login_student(@Body() userDTO: StudentDTO) {
        return this.usersService.login_student(userDTO) 
    }
    @ApiOperation({summary:"学生注册模块", description:"录入学生信息"})
    @Post("/signIn")
    signIn_student (@Body() userDTO: StudentCreateDTO) {
        return this.usersService.sign_in(userDTO)
    }

    @ApiOperation({summary:"学生信息修改模块", description:"修改学生信息"})
    @Patch("/update")
    update_student (@Body() userDTO: StudentDTO) {
        return this.usersService.update(userDTO)
    }
}