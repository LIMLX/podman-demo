import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UserAdminEmployeeService } from 'src/microservice/service/users';
import { CreateEmployeeDto, UpdateClassAssistantDto, UpdateClassTeacherDto, UpdateEmployeeDto, UpdateEmployeePswDto } from 'src/microservice/dto/users/admin-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Admin, AdminRole, AdminRoleGuard } from 'src/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('管理员职工模块')
@UseGuards(AdminRoleGuard)
@Controller('users/admin-employee')
export class UserAdminEmployeeController {
    constructor(private readonly adminEmployeeService: UserAdminEmployeeService) { }

    // 查询职工
    @ApiOperation({ summary: "查询职工", description: "获取职工数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findEmployee/page=:page")
    async findEmployee(@Query() { departmentId, search }: { departmentId: string, search: string }, @Param("page") page: number) {
        return await this.adminEmployeeService.findEmployee(departmentId, search, page);
    }

    // 查询职工详情数据
    @ApiOperation({ summary: "查询职工详情数据", description: "查询职工详情数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findEmployeeOne/id=:employeeId")
    async findEmployeeOne(@Param("employeeId") employeeId: string) {
        return await this.adminEmployeeService.findEmployeeOne(employeeId);
    }

    // 查询职工当前筛选条件下的总数量
    @ApiOperation({ summary: "查询职工总数量", description: "查询职工当前筛选条件下的总数量" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Get("findEmployeeSum")
    async findEmployeeSum(@Query() { departmentId, search }: { departmentId: string, search: string }) {
        return await this.adminEmployeeService.findEmployeeSum(departmentId, search);
    }

    // 创建职工
    @ApiOperation({ summary: "创建职工", description: "创建新职工数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Post("createEmployee")
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return await this.adminEmployeeService.createEmployee(createEmployeeDto);
    }

    // 修改职工信息
    @ApiOperation({ summary: "修改职工", description: "修改当前职工的数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Patch("updateEmployee")
    async updateEmployee(@Body() updateEmployeeDto: UpdateEmployeeDto) {
        return await this.adminEmployeeService.updateEmployee(updateEmployeeDto);
    }

    // 删除职工
    @ApiOperation({ summary: "删除职工", description: "删除当前职工数据" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Delete("delEmployee/id=:employeeId")
    async delEmployee(@Param("employeeId") employeeId: string) {
        return await this.adminEmployeeService.delEmployee(employeeId);
    }

    // 修改职工密码
    @ApiOperation({ summary: "修改职工密码", description: "修改指定职工的密码" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Patch("changePassword")
    async changePassword(@Body() updateEmployeePswDto: UpdateEmployeePswDto) {
        return await this.adminEmployeeService.changePassword(updateEmployeePswDto);
    }

    // 添加职工(文件版)
    @ApiOperation({ summary: "添加职工(文件版)", description: "上传指定格式的文件添加职工" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Post("createEmployeeExcel")
    @UseInterceptors(FileInterceptor('file'))
    async createEmployeeExcel(@UploadedFile() file: Express.Multer.File) {
        return await this.adminEmployeeService.createEmployeeExcel(file);
    }

    // 离职/复职
    @ApiOperation({ summary: "职工离职/复职", description: "调用后改变职工离职/复职" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Patch("transfer/id=:id")
    async transfer(@Param("id") employeeId: string) {
        return await this.adminEmployeeService.transfer(employeeId);
    }

    // 授权班级辅导员
    @ApiOperation({ summary: "授权班级辅导员", description: "给班级授权辅导员" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Patch("classAssistant")
    async updateClassAssistant(@Body() updateClass: UpdateClassAssistantDto) {
        return await this.adminEmployeeService.updateClassAssistant(updateClass);
    }

    // 授权班主任
    @ApiOperation({ summary: "授权班主任", description: "给班级授权班主任" })
    @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
    @Patch("classTeacher")
    async updateClassTeacher(@Body() updateClass: UpdateClassTeacherDto) {
        return await this.adminEmployeeService.updateClassTeacher(updateClass);
    }
}
