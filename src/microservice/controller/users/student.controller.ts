import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { StudentRoleGuard } from "src/common"
import { CreateStudentDto, LoginStudentDto, UpdateStudentDto, UpdateStudentPswDto } from "src/microservice/dto"
import { UserStudentService } from "src/microservice/service/users"

@ApiTags('usersStudent')
@Controller("users/student")
@UseGuards(StudentRoleGuard)
export class UserStudentController {
    constructor(
        private readonly usersService: UserStudentService
    ) {}

    @ApiOperation({summary:"学生注册模块", description:"录入学生信息"})
    @Post("/signIn")
    createStudent (@Body() createStudentDto: CreateStudentDto) {
        return this.usersService.createStudent(createStudentDto)
    }

    @ApiOperation({summary:"学生登录模块", description:"同时进行数据库登录查询,并且返回jwt数据"})
    @Post("/login")
    async loginStudent(@Body() loginStudentDto : LoginStudentDto) {
        return await this.usersService.loginStudent(loginStudentDto) 
    }

    @ApiOperation({summary:"学生信息修改模块", description:"修改学生信息"})
    @Patch("/update")
    updateStudent (@Body() updateStudentDto: UpdateStudentDto) {
        return this.usersService.updateStudent(updateStudentDto)
    }

    @ApiOperation({summary:"学生信息修改密码", description:"修改学生密码"})
    @Patch("/updatePsw")
    updateStudentPsw (@Body() updateStudentPswDto: UpdateStudentPswDto) {
        return this.usersService.updateStudentPsw(updateStudentPswDto)
    }
    
}