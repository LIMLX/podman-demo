import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { JWTDATA } from '../encryptions';

@Injectable()
export class RepairsMtrRoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly config: ConfigService,
        private readonly jwtData: JWTDATA
    ) { }

    // 角色权限守卫
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        // 用对应守卫的key，调用传递数据
        const roles = this.reflector.get(this.config.get('roles').repairsMtrKEY, context.getHandler());
        if (!roles) { // 未被装饰器装饰，直接放行
            return true;
        }

        //====================================JWT权限验证和token解密==================================
        // 获取前端传递参数值
        const req: Request = context.switchToHttp().getRequest();
        // 截取token数据，获得jwt
        if (req.headers.authorization === undefined || req.headers.authorization.indexOf('Bearer ') === -1) {
            return false
        }
        const jwt = req.headers.authorization.split('Bearer ')[1]
        // jwt解密
        let mtrData: any

        try {
            mtrData = this.jwtData.getJWT(jwt)
        } catch (error) {
            console.error('jwt解密错误')
            return false
        }

        // 判断
        if (mtrData.maintainer) {
            if (mtrData.maintainer.maintainerId && mtrData.maintainer.maintainerNum && mtrData.maintainer.maintainerName) {
                return true
            } else {
                return false
            }
        }

        return false
    }
}
