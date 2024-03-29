import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { AuthAdminDto, CreateAdminDto, DelAuthAdminDto, FindUserAuthDto, FindUserOneDto, LoginDto } from "src/microservice/dto";

@Injectable()
export class UserAdminService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ) { }
    // 创建管理员
    async create(createAdminDto: CreateAdminDto) {
        const pattern = { cmd: "users_admin_create" };
        const data = createAdminDto;

        let status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return { message: message };
                }
                ))
        return status;
    }

    // 获取当前管理员基础信息
    async findAdminData(adminId: string, adminNum: string, adminName: string, organization: string, module: any) {
        return {
            adminId: adminId,
            adminNum: adminNum,
            adminName: adminName,
            organization: organization,
            module: module
        };
    }

    // 登录模块admin
    async login(loginDto: LoginDto) {
        const pattern = { cmd: "users_admin_login" };
        const data = loginDto;
        let token: any;

        const observable = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    if (message && message !== "login error" && message !== "abnormal") {
                        token = { token: this.jwtService.sign(message) };
                        return token;
                    } else if (message === "login error" || message === "abnormal") {
                        token = "账号或密码错误";
                    } else {
                        return token = { "message": "Unauthorized" };
                    }
                }))

        // 异步执行获取查询的数据
        try {
            await lastValueFrom(observable);
        } catch (error) {
            console.error(error);
        }

        return token;
    }

    // 模块admin授权
    async authAdmin(authAdmin: AuthAdminDto) {
        const pattern = { cmd: "users_admin_auth" };
        const data = authAdmin;

        let status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return { message: message };
                }
                ))

        return status;
    }

    // 撤销admin授权
    async delAuthAdmin(delAuthAdminDto: DelAuthAdminDto) {
        const pattern = { cmd: "users_admin_delAuth" };
        const data = delAuthAdminDto;

        let status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return { message: message };
                }
                ))

        return status;
    }

    // 修改权限等级
    async updateAuthLevel(authAdmin: AuthAdminDto) {
        const pattern = { cmd: "users_admin_updateAuth" };
        const data = authAdmin;

        let status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return { message: message };
                }
                ))

        return status;
    }

    // 获取所有权限值
    async findAuthAll() {
        const pattern = { cmd: "users_admin_findAuthAll" };
        const data = {};

        let status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return { message: message };
                }
                ))

        return status;
    }

    // 查询当前角色是否有某种权限
    async findUserAuth(findUserAuthDto: FindUserAuthDto) {
        const pattern = { cmd: "users_admin_findUserAuth" };
        const data = findUserAuthDto;

        let status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return { message: message };
                }
                ))

        return status;
    }

    // 获取所有拥有管理员权限的用户
    async findModuleAdmin(moduleId: string, page: number) {
        const pattern = { cmd: "users_admin_findModuleAdmin" };
        const data = { moduleId: moduleId, page: page };

        let status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return { message: message };
                }
                ))

        return status;
    }

    // 检查用户是否存在---并返回数据
    async findUserOne(findUserOneDto: FindUserOneDto) {
        const pattern = { cmd: "users_admin_findUserOne" };
        const data = findUserOneDto;

        let status = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    return { message: message };
                }
                ))

        return status;
    }
}