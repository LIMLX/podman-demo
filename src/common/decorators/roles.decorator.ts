import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService()

// 角色权限划分装饰器
export const Roles = (roles: string[])=> SetMetadata(config.get('role'),roles)
