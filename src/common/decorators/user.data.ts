import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JWTDATA } from '../encryptions';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/*

   管道装饰器，可以进行需要的数据转换
   @Employee("data")
   data = "id"     返回职工id
   data = "module" 返回职工拥有的模块权限
   data = "name"   返回职工姓名
   data = "num"    返回职工,工号
   data = "sex"    返回职工性别

*/


export const User = createParamDecorator((data: "id" | "module" | "num" | "name" | "sex" | "type" | "phone", ctx: ExecutionContext) => {

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
    let userData: any;
    try {
        userData = jwtData.getJWT(jwt);
    } catch (error) {
        console.error('管道验证的jwt错误');
        return "abnormal";
    }
    // 判断是否是职工数据
    if (userData.employee) {
        const { employee, module } = userData;

        switch (data) {
            case "id": return employee.employeeId;
            case "module": return module;
            case "num": return employee.employeeNum;
            case "name": return employee.employeeName;
            case "sex": return employee.employeeSex
            case "type": return "employee";
        }
    }

    // 判断是否是学生数据
    if (userData.student) {
        const { student, module } = userData;

        switch (data) {
            case "id": return student.studentId;
            case "module": return module;
            case "num": return student.studentNum;
            case "name": return student.studentName;
            case "sex": return student.studentSex
            case "type": return "student";
        }
    }

    // 判断是否是维修工数据
    if (userData.maintainer) {
        const { maintainer } = userData
        switch (data) {
            case "id": return maintainer.maintainerId;
            case "num": return maintainer.maintainerNum;
            case "name": return maintainer.maintainerName;
            case "sex": return maintainer.maintainerSex;
            case "phone": return maintainer.maintainerPhone
            case "type": return "mtr";
        }
    }

    return "abnormal"
})