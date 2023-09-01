import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { AuthStudentRoleDto, CreateStudentDto, FindStudentDto, UpdateStudentDto } from "src/microservice/dto/users/admin-student.dto";

@Injectable()
export class UserAdminStudentService {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ) { }
    // 查询学生
    async findStudent(findStudentDto: FindStudentDto) {
        const pattern = { cmd: "users_adminStudent_findStudent" };
        const data = findStudentDto

        const studentData = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return studentData;
    }

    // 创建学生
    async createStudent(reateStudentDto: CreateStudentDto) {
        const pattern = { cmd: "users_adminStudent_createStudent" };
        const data = reateStudentDto;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status;
    }

    // 修改学生数据
    async updateStudent(updateStudentDto: UpdateStudentDto) {
        const pattern = { cmd: "users_adminStudent_updateStudent" };
        const data = updateStudentDto;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status;
    }

    // 授权班长
    async authMonitor(studentId: string) {
        const pattern = { cmd: "users_adminStudent_authMonitor" };
        const data = studentId;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status;
    }

    // 添加学生(文件版)
    async createStudentExcel(file: Express.Multer.File) {


        // 定义指定文件格式为excel后缀
        const allowedMimeTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return "错误文件格式---仅支持excel文件";
        }
        const pattern = { cmd: "users_adminStudent_createStudentExcel" };
        const data = file;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status;
    }

    // 删除学生
    async delStudent(studentId: string) {
        const pattern = { cmd: "users_adminStudent_delStudent" };
        const data = studentId;

        const status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return message
                }
                ))
        return status;
    }

    // 授权学生
    async authStudent(authStudentRoleDto: AuthStudentRoleDto) {

    }
}