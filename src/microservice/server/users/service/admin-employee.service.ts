import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateEmployeeDto, UpdateClassAssistantDto, UpdateClassTeacherDto, UpdateEmployeeDto, UpdateEmployeePswDto } from "src/microservice/dto/users/admin-employee.dto";

@Injectable()
export class UserAdminEmployeeService {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ) { }
    // 查询职工
    async findEmployee(departmentId: string, search: string, page: number) {
        const pattern = { cmd: "users_adminEmployee_findEmployee" };
        const data = { departmentId: departmentId, search: search, page: page };

        const employeeData = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return employeeData;
    }

    // 查询职工详情数据
    async findEmployeeOne(employeeId: string) {
        const pattern = { cmd: "users_adminEmployee_findEmployeeOne" };
        const data = employeeId;

        const employeeData = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return employeeData;
    }

    // 查询职工当前筛选条件下的总数量
    async findEmployeeSum(departmentId: string, search: string) {
        const pattern = { cmd: "users_adminEmployee_findEmployeeSum" };
        const data = { departmentId: departmentId, search: search };
        const employeeData = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return employeeData;
    }

    // 查询部门
    async findDepartment() {
        const pattern = { cmd: "users_adminEmployee_findDepartment" };
        const data = {};

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    // 职工角色查询
    async findEmployeeRole(role: string[], like: string) {
        const pattern = { cmd: "users_adminEmployee_findEmployeeRole" };
        const data = { role: role, like: like };

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    // 管理员(模块)查询
    async findAdminRole(role: string[], like: string) {
        const pattern = { cmd: "users_adminEmployee_findAdminRole" };
        const data = { role: role, like: like };

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    // 创建职工
    async createEmployee(createEmployeeDto: CreateEmployeeDto) {
        const pattern = { cmd: "users_adminEmployee_createEmployee" };
        const data = createEmployeeDto;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    // 修改职工信息
    async updateEmployee(updateEmployeeDto: UpdateEmployeeDto) {
        const pattern = { cmd: "users_adminEmployee_updateEmployee" };
        const data = updateEmployeeDto;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    async createEmployeeExcel(file: Express.Multer.File) {

        // 定义指定文件格式为excel后缀
        const allowedMimeTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return "错误文件格式---仅支持excel文件";
        }
        const pattern = { cmd: "users_adminEmployee_createEmployeeExcel" };
        const data = file;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    // 离职/复职
    async transfer(employeeId: string) {
        const pattern = { cmd: "users_adminEmployee_transfer" };
        const data = employeeId;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    // 删除职工
    async delEmployee(employeeId: string) {
        const pattern = { cmd: "users_adminEmployee_delEmployee" };
        const data = employeeId;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    // 修改职工密码
    async changePassword(updateEmployeePswDto: UpdateEmployeePswDto) {
        const pattern = { cmd: "users_adminEmployee_changePassword" };
        const data = updateEmployeePswDto;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    // 授权班级辅导员
    async updateClassAssistant(updateClass: UpdateClassAssistantDto) {
        const pattern = { cmd: "users_adminEmployee_assistantUpdate" };
        const data = updateClass;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }

    // 授权班主任
    async updateClassTeacher(updateClass: UpdateClassTeacherDto) {
        const pattern = { cmd: "users_adminEmployee_classTeacher" };
        const data = updateClass;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message;
                }
                ))
        return status;
    }
}