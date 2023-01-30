import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleData } from './role.module';

// 角色权限划分装饰器
export const Roles = (roles: string[])=> {
    return SetMetadata("roles",roles)
}