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
    let studentData: StudentData;

    try {
      studentData = this.jwtData.getJWT(jwt)
    } catch (error) {
      console.log('jwt解密错误');
      return false;
    }

    // 验证是否为学生
    if (!studentData.student || !studentData.student.studentId) {
      return false;
    }

    // 当为user时,同时拥有学生数据时，放行
    if (module[0] === "user" && studentData.student && studentData.student.studentId) {
      return true;
    }

    if (studentData.student) {
      // 对比查找是否有模块权限
      let userAuth = [];
      studentData.module.forEach((data: { moduleNum: string, operationLevel: number }) => {
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
      return flag
    }
    return false;
  }
}
