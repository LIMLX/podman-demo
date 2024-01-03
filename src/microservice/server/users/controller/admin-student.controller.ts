import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Admin, AdminRole, AdminRoleGuard } from "src/common";
import { CreateStudentDto, FindStudentDto, UpdateStudentDto, UpdateStudentPswDto } from "src/microservice/dto/users/admin-student.dto";
import { UserAdminStudentService } from "src/microservice/service/users";

@ApiTags('管理员学生模块')
@UseGuards(AdminRoleGuard)
@Controller('users/admin-student')
export class UserAdminStudentController {
    constructor(private readonly adminStudentService: UserAdminStudentService) { }


    // 查询学生
    @ApiOperation({ summary: "查询学生", description: "获取学生数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findStudent/page=:page")
    async findStudent(@Query() findStudentDto: FindStudentDto, @Param("page") page: string) {
        if (!/^[0-9]*$/.test(page)) {
            return "abnormal";
        }
        findStudentDto.page = Number(page);
        return await this.adminStudentService.findStudent(findStudentDto);
    }

    // 查询学生详情数据
    @ApiOperation({ summary: "查询学生详情数据", description: "获取学生详情数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findStudentOne/id=:studentId")
    async findStudentOne(@Param("studentId") studentId: string) {
        return await this.adminStudentService.findStudentOne(studentId);
    }

    // 查询学生当前筛选条件的总数量
    @ApiOperation({ summary: "查询学生当前筛选条件的总数量", description: "获取学生当前筛选条件的总数量" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findStudentSum")
    async findStudentSum(@Query() findStudentDto: FindStudentDto) {
        return await this.adminStudentService.findStudentSum(findStudentDto);
    }

    // 查询所有学院
    @ApiOperation({ summary: "查询所有学院", description: "查询所有学院" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findCampus")
    async findCampus() {
        return await this.adminStudentService.findCampus();
    }

    // 根据学院查询所处的班级
    @ApiOperation({ summary: "根据学院查询所处的班级", description: "根据学院查询所处的班级" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findCampusClass/id=:campusId")
    async findCampusClass(@Param("campusId") campusId: string) {
        return await this.adminStudentService.findCampusClass(campusId);
    }


    // 学生角色查询
    @ApiOperation({ summary: "学生角色查询", description: "学生角色查询" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findStudentRole")
    async findStudentRole(@Body() { role, like }: { role: string[], like: string }) {
        return await this.adminStudentService.findStudentRole(role, like);
    }

    // 管理员(模块)查询
    @ApiOperation({ summary: "管理员(模块)查询", description: "管理员(模块)查询" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findAdminRole")
    async findAdminRole(@Body() { role, like }: { role: string[], like: string }) {
        return await this.adminStudentService.findAdminRole(role, like);
    }

    // 创建学生
    @ApiOperation({ summary: "创建学生", description: "创建新学生数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Post("createStudent")
    async createStudent(@Body() createStudentDto: CreateStudentDto) {
        return await this.adminStudentService.createStudent(createStudentDto);
    }

    // 修改学生数据
    @ApiOperation({ summary: "修改学生数据", description: "修改学生数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Patch("updateStudent")
    async updateStudent(@Body() updateStudentDto: UpdateStudentDto) {
        return await this.adminStudentService.updateStudent(updateStudentDto);
    }

    // 授权班长
    @ApiOperation({ summary: "授权班长", description: "授权班长" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Patch("authMonitor/id=:id")
    async authMonitor(@Param("id") studentId: string) {
        return await this.adminStudentService.authMonitor(studentId);
    }

    // 添加学生(文件版)
    @ApiOperation({ summary: "添加学生(文件版)", description: "使用文件添加学生" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Post("createStudentExcel")
    @UseInterceptors(FileInterceptor('file'))
    async createStudentExcel(@UploadedFile() file: Express.Multer.File) {
        return await this.adminStudentService.createStudentExcel(file);
    }

    // 删除学生
    @ApiOperation({ summary: "删除学生", description: "删除学生" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Delete("delStudent/id=:studentId")
    async delStudent(@Param("studentId") studentId: string) {
        return await this.adminStudentService.delStudent(studentId);
    }

    // 修改学生密码
    @ApiOperation({ summary: "修改学生密码", description: "修改学生密码" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Patch("changePassword")
    async changePassword(@Body() updateStudentPswDto: UpdateStudentPswDto) {
        return await this.adminStudentService.changePassword(updateStudentPswDto);
    }
}