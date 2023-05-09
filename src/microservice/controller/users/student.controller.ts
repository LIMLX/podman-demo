import { Body, Controller, Get, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { StudentRoleGuard, User } from "src/common"
import { CreateStudentDto, LoginStudentDto, UpdateStudentDto, UpdateStudentPswDto } from "src/microservice/dto"
import { UserStudentService } from "src/microservice/service/users"
import { Response } from "express";

@ApiTags('usersStudent')
@Controller("users/student")
@UseGuards(StudentRoleGuard)
export class UserStudentController {
    constructor(
        private readonly usersService: UserStudentService
    ) { }

    @ApiOperation({ summary: "学生注册模块", description: "录入学生信息" })
    @Post("/signIn")
    createStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.usersService.createStudent(createStudentDto)
    }

    @ApiOperation({ summary: "学生登录模块", description: "同时进行数据库登录查询,并且返回jwt数据" })
    @Post("/login")
    async loginStudent(@Body() loginStudentDto: LoginStudentDto) {
        return await this.usersService.loginStudent(loginStudentDto)
    }

    @ApiOperation({ summary: "学生信息修改模块", description: "修改学生信息" })
    @Patch("/update")
    async updateStudent(@Body() updateStudentDto: UpdateStudentDto) {
        return await this.usersService.updateStudent(updateStudentDto)
    }

    @ApiOperation({ summary: "学生信息修改密码", description: "修改学生密码" })
    @Patch("/updatePsw")
    async updateStudentPsw(@Body() updateStudentPswDto: UpdateStudentPswDto) {
        return await this.usersService.updateStudentPsw(updateStudentPswDto)
    }

    @ApiOperation({ summary: "学生修改头像", description: "学生修改头像" })
    @Post('/updateAvatar')
    @UseInterceptors(FileInterceptor('studentAvatar'))
    async updateAvatar(@UploadedFile() file: Express.Multer.File, @User('num') stuentNum: string) {
        // 判断是否为学生上传文件
        if (!stuentNum || stuentNum === "abnormal") {
            return "abnormal"
        }
        // 判断是否进行文件上传
        if (!file) {
            return "暂无文件上传"
        }

        // 验证是否为图片格式
        const imageRegex = /\.(jpg|jpeg|png|gif)$/i;
        if (!imageRegex.test(file.originalname)) {
            return "格式错误--仅支持jpg, jpeg, png, gif图片"
        }
        // 验证大小
        if (file.size) {
            // 1.5MB
            if (file.size >= (1.5 * 1024 * 1024)) {
                return "大小超过1.5MB"
            }
        }
        return await this.usersService.updateAvatar(file, stuentNum)
    }

    @ApiOperation({ summary: "获取单个学生的详情数据", description: "学生详情数据查询" })
    @Get('getStudentData')
    async getStudentData(@User('id') studentId: string) {
        // 验证数据身份
        if (!studentId || studentId === "abnormal") {
            return "abnormal"
        }
        return await this.usersService.getStudentData(studentId)
    }

    @ApiOperation({ summary: "获取单个学生的详情数据", description: "学生详情数据查询" })
    @Get('getStudentAvatar')
    async getStudentAvatar(@Res() res: Response, @User('id') studentId: string) {
        // 验证数据身份
        if (!studentId || studentId === "abnormal") {
            return "abnormal"
        }
        return await this.usersService.getStudentAvatar(res, studentId)
    }
}