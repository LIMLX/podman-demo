import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// 角色权限划分装饰器
export const Roles = (roles: string[])=> {
    
    // 权限别名
    const modules = ["users"]
    // 权限真名
    const module_name = ["demo"]
    // 发给验证守卫的权限真名
    let module_data = []

    for(let i = 0; i< modules.length ; i++) {
        if( roles.includes(modules[i]) ) {
            module_data.push(module_name[i])
        }
    }

    return SetMetadata("roles",module_data)
}