import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { JWTDATA } from '../encryptions';
import { StudentData } from '../dto/userToken.dto';

@Injectable()
export class StudentRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
    private readonly jwtData: JWTDATA
  ) { }

  // 角色权限守卫
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    // 用对应守卫的key，调用传递数据
    const roles: { module: string, level: number }[] = this.reflector.get<{ module: string, level: number }[]>(this.config.get('student'), context.getHandler());

    if (!roles) { // 未被装饰器装饰，直接放行
      return true;
    }

    // 装饰器未赋值，或者未进行规则处理，直接返回未授权
    if (!roles) {
      return false
    }

    //整理守卫数据
    let module: string[] = []
    let leave: number[] = []

    // 总模块权限量
    let sum = 0
    roles.forEach((data) => {
      sum++
      module.push(data.module)
      leave.push(data.level)
    })


    //====================================JWT权限验证和token解密==================================
    // 获取前端传递参数值
    const req: Request = context.switchToHttp().getRequest();
    // 截取token数据，获得jwt
    if (req.headers.authorization === undefined || req.headers.authorization.indexOf('Bearer ') === -1) {
      return false
    }
    const jwt = req.headers.authorization.split('Bearer ')[1]
    // jwt解密
    let studentData: StudentData

    try {
      studentData = this.jwtData.getJWT(jwt)
    } catch (error) {
      console.log('jwt解密错误')
      return false
    }
    // 对比查找是否有模块权限
    let indexOf: number
    studentData.module.forEach((data) => {
      indexOf = module.indexOf(data.moduleNum)
      if (indexOf >= 0) {
        // 判断权限等级是否高于或者等于
        if (data.operationLevel >= leave[indexOf]) {
          // 每当成功验证权限后减少需要的权限量
          sum--
        }
      }
    })

    // 当权限>0没有完全去除时权限验证失败
    if (sum > 0) {
      return false
    } else {
      return true
    }
  }
}
