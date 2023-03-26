import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'
import { JWTDATA } from '../encryptions';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { EmployeeData } from '../dto/userToken.dto';
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


export const User  = createParamDecorator((data : any,ctx: ExecutionContext) => {
    
    const config = new ConfigService()
    const request = ctx.switchToHttp().getRequest<Request>();
    // 获取jwt密钥
    const jwtKey = config.get('JWT_ENC')
    // 获取过期时间
    const jwtTime = config.get('JWT_TIME')

    // 配置option
    const options : JwtModuleOptions = {
        secret: jwtKey,
        signOptions:{expiresIn:jwtTime}
    }
    // 创建jwtService
    const jwtService = new JwtService(options)
    // 注入到构造函数内(
    const jwtData = new JWTDATA(jwtService)
    // 提取前端携带的token
    let jwt : any
    try {
        jwt = request.headers.authorization.split('Bearer ')[1];
    } catch (error) {
        console.log(error)
        return "abnormal"
    }
    // 解密jwt
    let userData : any
    try {
        userData = jwtData.getJWT(jwt)
    } catch (error) {
        console.error('管道验证的jwt错误')
        return "abnormal"
    }

    // 判断是否是职工数据
    if (userData.employee) {
        const {employee,module} = userData

        switch(data) {
            case "id" : return  employee.employeeId;
            case "module" : return module;
            case "num" : return employee.employeeNum;
            case "name" : return employee.employeeName;
            case "sex" : return employee.employeeSex
        }
    }
    
    // 判断是否是学生数据
    if (userData.student) {
        const {student,module} = userData

        switch(data) {
            case "id" : return  student.studentId;
            case "module" : return module;
            case "num" : return student.studentNum;
            case "name" : return student.studentName;
            case "sex" : return student.studentSex
        }
    }

    return "abnormal"
})