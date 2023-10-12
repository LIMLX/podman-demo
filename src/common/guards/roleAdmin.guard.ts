import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { JWTDATA } from '../encryptions';

@Injectable()
export class AdminRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
    private readonly jwtData: JWTDATA
  ) { }

  // 角色权限守卫
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    // 用对应守卫的key，调用传递数据
    const roles: { admin: string, level: number }[] = this.reflector.get<{ admin: string, level: number }[]>(this.config.get('roles').adminKEY, context.getHandler());

    if (!roles) { // 未被装饰器装饰，直接放行
      return true;
    }

    // 装饰器未赋值，或者未进行规则处理，直接返回未授权
    if (!roles || roles.length === 0) {
      return false;
    }

    //====================================JWT权限验证和token解密==================================
    // 获取前端传递参数值
    const req: Request = context.switchToHttp().getRequest();
    // 截取token数据，获得jwt
    if (req.headers.authorization === undefined || req.headers.authorization.indexOf('Bearer ') === -1) {
      return false;
    }
    const jwt = req.headers.authorization.split('Bearer ')[1];
    // jwt解密
    let admin: any;

    try {
      admin = this.jwtData.getJWT(jwt);
    } catch (error) {
      console.log('jwt解密错误');
      return false;
    }

    // 验证是否为超级管理员---超级管理员对所有权限具有使用权
    if (admin.turboAdmin) {
      if (admin.turboAdmin.startTime && admin.turboAdmin.endTime) {
        // 当管理员时间过期时进行阻止
        if (admin.turboAdmin.endTime <= new Date().getTime()) {
          return false;
        }
        return true;
      }
    }

    // 验证普通权限---根据上面传输的权限
    if (admin.admin) {
      // 当此角色有权限时
      if (admin.admin.module && admin.admin.module.length > 0) {
        // 获取用户jwt的数据
        let adminAuth = [];
        admin.admin.module.forEach((data: { moduleNum: string, moduleLevel: number }) => {
          adminAuth[data.moduleNum] = data.moduleLevel;
        });
        // 当前守护权限值
        let flag = true;
        roles.forEach((data) => {
          // 如果是基础权限
          if (data.admin === "admin") {
            flag = true;
            return;
          }
          // 当有确定模块权限时，同时当adminAuth内有数据也就是有确认模块，同时等级大于约束等级时
          if (!adminAuth[data.admin] || adminAuth[data.admin] < data.level) {
            flag = false;
            return;
          }
        })
        return flag;
      } else {
        return false;
      }
    }

    return false;
  }
}