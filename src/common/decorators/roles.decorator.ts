import { SetMetadata } from '@nestjs/common';

// 角色权限划分装饰器

// 学生角色
export const StudentRole = (roles: { module: string, level: number }[]) => {
    return SetMetadata("studentRole", roles)
}

// 职工角色
export const EmployeeRole = (roles: { module: string, level: number }[]) => {
    return SetMetadata("employeeRole", roles)
}

// 管理员角色
export const AdminRole = (roles: { admin: string, level: number }[]) => {
    return SetMetadata("adminRole", roles)
}

// 维修工角色
export const RepiarsMtrRole = (roles: string) => {
    return SetMetadata("repairsMtrRole", roles)
}