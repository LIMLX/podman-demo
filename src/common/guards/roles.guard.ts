import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { JWTDATA } from '../encryptions';
import { ModuleData } from '../decorators/role.module';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly config : ConfigService,
    private readonly jwtData : JWTDATA
    ) {}
  
  // 角色权限守卫
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    // 用对应守卫的key，调用传递数据
    const roles: String[] = this.reflector.get<string[]>(this.config.get('roles'), context.getHandler());

    if (!roles) { // 未被装饰器装饰，直接放行
      return true;
    }

    const moduleData = new ModuleData()

    // 权限别名
    const moduleAlias: string[] = moduleData.ModuleAlias
    // 权限真名
    const module: string[] = moduleData.Module
    // 发给验证守卫的权限真名
    let module_data = []

    for(let i = 0; i< module.length; i++) {
        if( roles.indexOf(module[i]) !== -1 ) {
            module_data.push(moduleAlias[i])
        }
    }

    if ( roles.indexOf('admin') !== -1) {
        module_data.push('admin')
    }

    console.log(module_data)

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

    //====================================Admin权限验证==================================
    // 如果带有admin，则访问的是admin权限
    if(roles.indexOf("admin") !== -1) {
      console.log("此权限验证得具有admin")

      if(!user.admin) {
        return false
      }

      // 模块权限验证
      if(!user.admin.appAuth) {
        return false
      }
  
      // Admin携带appAuth为传递值时放行
      for(let i = 0;i < user.admin.appAuth.length ; i++) {
        if(module_data.indexOf(user.admin.appAuth[i].app_id) !== -1) {
          return true
        }
      }
      return false
    }

    //====================================Student权限验证==================================
    // 判断Student权限是否携带验证
    if(!user.student.appAuth) {
      return false
    }

    // Student携带appAuth为传递值时放行
    for(let i = 0;i < user.student.appAuth.length ; i++) {
      if(module_data.indexOf(user.student.appAuth[i].app_id) !== -1) {
        return true
      }
    }

    return false;
  }
}
