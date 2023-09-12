import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from 'express';
import { JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { JWTDATA } from "../encryptions";

export const AdminData = createParamDecorator((data: "id" | "module" | "num" | "name" | "role", ctx: ExecutionContext) => {
    const config = new ConfigService();
    const request = ctx.switchToHttp().getRequest<Request>();

    // 配置option
    const options: JwtModuleOptions = {
        secret: config.get('JWT_ENC'),
        signOptions: { expiresIn: config.get('JWT_TIME') }
    }
    // 创建jwtService
    const jwtService = new JwtService(options);
    // 注入到构造函数内(
    const jwtData = new JWTDATA(jwtService);
    // 提取前端携带的token
    if (!request.headers.authorization) {
        return undefined;
    }
    let jwt: any;
    try {
        jwt = request.headers.authorization.split('Bearer ')[1];
    } catch (error) {
        console.log(error);
        return "abnormal";
    }
    // 解密jwt
    let adminData: any;
    try {
        adminData = jwtData.getJWT(jwt);
    } catch (error) {
        console.error('管道验证的jwt错误');
        return "abnormal";
    }

    // 当为超级管理员时
    if (adminData.turboAdmin) {
        const turbo = "TurboSnail";
        switch (data) {
            case "id": return turbo;
            case "num": return turbo;
            case "name": return turbo;
            case "role": return turbo;
            case "module": return turbo;
        }
    }

    // 验证是否为admin
    if (adminData.admin) {
        if (adminData.admin.role === "employee") {
            switch (data) {
                case "id": return adminData.admin.employeeId;
                case "num": return adminData.admin.employeeNum;
                case "name": return adminData.admin.employeeName;
                case "role": return adminData.admin.role;
                case "module": return adminData.admin.module;
            }
        }

        if (adminData.admin.role === "student") {
            switch (data) {
                case "id": return adminData.admin.studentId;
                case "num": return adminData.admin.studentNum;
                case "name": return adminData.admin.studentName;
                case "role": return adminData.admin.role;
                case "module": return adminData.admin.module;
            }
        }
    }
    return "abnormal";
})