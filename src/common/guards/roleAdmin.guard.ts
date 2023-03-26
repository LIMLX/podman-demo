import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { JWTDATA } from '../encryptions';
import { ModuleData } from '../decorators/role.module';

@Injectable()
export class AdminRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly config : ConfigService,
    private readonly jwtData : JWTDATA
    ) {}
  
  // 角色权限守卫
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    // 用对应守卫的key，调用传递数据
    const roles: String[] = this.reflector.get<string[]>(this.config.get('employee'), context.getHandler());

    if (!roles) { // 未被装饰器装饰，直接放行
      return true;
    }


    // 装饰器未赋值，或者未进行规则处理，直接返回未授权
    if(!roles || roles.length === 0) {
      return false
    }

    
    
    //====================================JWT权限验证和token解密==================================
    // 获取前端传递参数值
    const req: Request = context.switchToHttp().getRequest();
    // 截取token数据，获得jwt
    if(req.headers.authorization === undefined || req.headers.authorization.indexOf('Bearer ') === -1) {
      return false
    }
    const jwt = req.headers.authorization.split('Bearer ')[1]
    // jwt解密
    let user : any

    try{
      user = this.jwtData.getJWT(jwt)
    } catch (error){
      console.log('jwt解密错误')
      return false
    }

    return false;
  }
}