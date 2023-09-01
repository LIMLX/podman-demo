import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserAdminEmployeeService } from 'src/microservice/service/users';
import { AuthEmployeeRoleDto, CreateEmployeeDto, UpdateClassAssistantDto, UpdateClassTeacherDto, UpdateEmployeeDto } from 'src/microservice/dto/users/admin-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users/admin-employee')
export class UserAdminEmployeeController {
    constructor(private readonly adminEmployeeService: UserAdminEmployeeService) { }

    // 查询职工
    @Get("findEmployee/page=:page")
    async findEmployee(@Query() { departmentId, search }: { departmentId: string, search: string }, @Param("page") page: number) {
        return await this.adminEmployeeService.findEmployee(departmentId, search, page);
    }

    // 创建职工
    @Post("createEmployee")
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return await this.adminEmployeeService.createEmployee(createEmployeeDto);
    }

    // 修改职工信息
    @Patch("updateEmployee")
    async updateEmployee(@Body() updateEmployeeDto: UpdateEmployeeDto) {
        return await this.adminEmployeeService.updateEmployee(updateEmployeeDto);
    }

    // 删除职工
    @Post("delEmployee")
    async delEmployee(@Body("employeeId") employeeId: string) {
        return await this.adminEmployeeService.delEmployee(employeeId);
    }

    // 添加学生(文件版)
    @Post("createEmployeeExcel")
    @UseInterceptors(FileInterceptor('file'))
    async createEmployeeExcel(@UploadedFile() file: Express.Multer.File) {
        return await this.adminEmployeeService.createEmployeeExcel(file);
    }

    // 离职/复职
    @Get("transfer/id=:id")
    async transfer(@Param("id") employeeId: string) {
        return await this.adminEmployeeService.transfer(employeeId);
    }

    // 授权给教师角色
    async authEmployee(@Body() authEmployeeRoleDto: AuthEmployeeRoleDto) {
        return await this.adminEmployeeService.authEmployee(authEmployeeRoleDto);
    }

    // 授权班级辅导员
    @Patch("classAssistant")
    async updateClassAssistant(@Body() updateClass: UpdateClassAssistantDto) {
        return await this.adminEmployeeService.updateClassAssistant(updateClass);
    }

    // 授权班主任
    @Patch("classTeacher")
    async updateClassTeacher(@Body() updateClass: UpdateClassTeacherDto) {
        return await this.adminEmployeeService.updateClassTeacher(updateClass);
    }
}