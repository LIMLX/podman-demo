import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { JWTDATA } from '../encryptions';
import { StudentData } from '../dto/userToken.dto';

@Injectable()
export class UserRoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly config: ConfigService,
        private readonly jwtData: JWTDATA
    ) { }

    // 角色权限守卫
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        // 用对应守卫的key，调用传递数据
        const roles: { module: string, level: number }[] = this.reflector.get<{ module: string, level: number }[]>(this.config.get('user'), context.getHandler());

        if (!roles) { // 未被装饰器装饰，直接放行
            return true;
        }

        // 装饰器未赋值，或者未进行规则处理，直接返回未授权
        if (!roles) {
            return false;
        }

        //整理守卫数据
        let module: string[] = [];
        let leave: number[] = [];

        // 总模块权限量
        let sum = 0;
        roles.forEach((data) => {
            sum++;
            module.push(data.module);
            leave.push(data.level);
        })


        //====================================JWT权限验证和token解密==================================
        // 获取前端传递参数值
        const req: Request = context.switchToHttp().getRequest();
        // 截取token数据，获得jwt
        if (req.headers.authorization === undefined || req.headers.authorization.indexOf('Bearer ') === -1) {
            return false;
        }
        const jwt = req.headers.authorization.split('Bearer ')[1];
        // jwt解密
        let userData: any;

        try {
            userData = this.jwtData.getJWT(jwt)
        } catch (error) {
            console.log('jwt解密错误');
            return false;
        }

        // 验证是否为超级管理员---超级管理员对所有权限具有使用权
        if (userData.turboAdmin) {
            if (userData.turboAdmin.startTime && userData.turboAdmin.endTime) {
                // 当管理员时间过期时进行阻止
                if (userData.turboAdmin.endTime <= new Date().getTime()) {
                    return false;
                }
                return true;
            }
        }

        // 当为user时,同时拥有学生---或者职工---管理员数据时，放行
        if (module[0] === "user" && userData.student && userData.student.studentId || module[0] === "user" && userData.employee && userData.employee.employeeId || module[0] === "user" && userData.admin) {
            return true;
        }

        // 当为管理员访问时,验证普通权限---根据上面传输的权限
        if (userData.admin) {
            // 当此角色有权限时
            if (userData.admin.module && userData.admin.module.length > 0) {
                // 获取用户jwt的数据
                let adminAuth = [];
                userData.admin.module.forEach((data: { moduleNum: string, moduleLevel: number }) => {
                    adminAuth[data.moduleNum] = data.moduleLevel;
                });
                // 当前守护权限值
                let flag = true;
                roles.forEach((data) => {
                    // 当有确定模块权限时，同时当adminAuth内有数据也就是有确认模块，同时等级大于约束等级时
                    if (!adminAuth[data.module] || adminAuth[data.module] < data.level) {
                        flag = false;
                    }
                })
                return flag;
            } else {
                return false;
            }
        }

        // 对比查找是否有模块权限
        let userAuth = [];
        userData.module.forEach((data: { moduleNum: string, operationLevel: number }) => {
            userAuth[data.moduleNum] = data.operationLevel;
        });
        let flag = true;
        roles.forEach((data) => {
            // 当有确定模块权限时，同时当userAuth内有数据也就是有确认模块，同时等级大于约束等级时
            if (!userAuth[data.module] || userAuth[data.module] < data.level) {
                flag = false;
                return;
            }
        })
        return flag;
    }
}
