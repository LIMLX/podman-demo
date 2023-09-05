import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthStudentRoleDto, CreateStudentDto, FindStudentDto, UpdateStudentDto, UpdateStudentPswDto } from "src/microservice/dto/users/admin-student.dto";
import { UserAdminStudentService } from "src/microservice/service/users";

@Controller('users/admin-student')
export class UserAdminStudentController {
    constructor(private readonly adminStudentService: UserAdminStudentService) { }

    // 查询学生
    @Get("findStudent/page=:page")
    async findStudent(@Query() findStudentDto: FindStudentDto, @Param("page") page: number) {
        findStudentDto.page = page;
        return await this.adminStudentService.findStudent(findStudentDto);
    }

    // 查询学生详情数据
    @Get("findStudentOne/id=:studentId")
    async findStudentOne(@Param("studentId") studentId: string) {
        return await this.adminStudentService.findStudentOne(studentId);
    }

    // 查询学生当前筛选条件的总数量
    @Get("findStudentSum")
    async findStudentSum(@Query() findStudentDto: FindStudentDto) {
        return await this.adminStudentService.findStudentSum(findStudentDto);
    }

    // 创建学生
    @Post("createStudent")
    async createStudent(@Body() createStudentDto: CreateStudentDto) {
        return await this.adminStudentService.createStudent(createStudentDto);
    }

    // 修改学生数据
    @Patch("updateStudent")
    async updateStudent(@Body() updateStudentDto: UpdateStudentDto) {
        return await this.adminStudentService.updateStudent(updateStudentDto);
    }

    // 授权班长
    @Patch("authMonitor/id=:id")
    async authMonitor(@Param("id") studentId: string) {
        return await this.adminStudentService.authMonitor(studentId);
    }

    // 添加学生(文件版)
    @Post("createStudentExcel")
    @UseInterceptors(FileInterceptor('file'))
    async createStudentExcel(@UploadedFile() file: Express.Multer.File) {
        return await this.adminStudentService.createStudentExcel(file);
    }

    // 删除学生
    @Delete("delStudent/id=:studentId")
    async delStudent(@Param("studentId") studentId: string) {
        return await this.adminStudentService.delStudent(studentId);
    }

    // 修改学生密码
    @Patch("changePassword")
    async changePassword(@Body() updateStudentPswDto: UpdateStudentPswDto) {
        return await this.adminStudentService.changePassword(updateStudentPswDto);
    }

    // 授权学生
    async authStudent(@Body() authStudentRoleDto: AuthStudentRoleDto) {
        return await this.adminStudentService.authStudent(authStudentRoleDto);
    }
}