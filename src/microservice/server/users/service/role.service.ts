import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { AuthEmployeeRoleDto, AuthRoleDto, AuthStudentRoleDto, CreateAdminUserDto, CreateRoleDto, DeleteRoleDto, FindAdminUserDto, FindEmployeeDto, UpdateAdminUserDto, UpdateRoleDto } from "src/microservice/dto";

@Injectable()
export class UsersRoleService {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) { }

  // 创建角色
  async createRole(createRoleDto: CreateRoleDto) {
    const pattern = { cmd: "users_role_create" };
    const data = createRoleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 修改角色
  async updateRole(updateRoledto: UpdateRoleDto) {
    const pattern = { cmd: "users_role_update" };
    const data = updateRoledto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 删除角色
  async deleteRole(deleteRoleDto: DeleteRoleDto) {
    const pattern = { cmd: "users_role_delete" };
    const data = deleteRoleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 授权职工的角色
  async authEmployee(authEmployeeRoleDto: AuthEmployeeRoleDto) {
    const pattern = { cmd: "users_role_authEmployee" };
    const data = authEmployeeRoleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 授权职工角色模块权限
  async authEmployeeRole(authRoleDto: AuthRoleDto) {
    const pattern = { cmd: "users_role_authEmployeeRole" };
    const data = authRoleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 删除/撤销职工角色权限
  async delEmployeeRole(authRoleDto: AuthRoleDto) {
    const pattern = { cmd: "users_role_delEmployeeRole" };
    const data = authRoleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 授权学生角色模块权限
  async authStudentRole(authRoleDto: AuthRoleDto) {
    const pattern = { cmd: "users_role_authStudentRole" };
    const data = authRoleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 删除/撤销学生角色权限
  async delStudentRole(authRoleDto: AuthRoleDto) {
    const pattern = { cmd: "users_role_delStudentRole" };
    const data = authRoleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 授权学生的角色
  async authStudent(authStudentRoleDto: AuthStudentRoleDto) {
    const pattern = { cmd: "users_role_authStudent" };
    const data = authStudentRoleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取所有职工角色信息
  async findRoleEmployeeAll() {
    const pattern = { cmd: "users_role_findEmployeeAll" };
    const data = {};

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取某个职工角色下的用户信息
  async findEmployee(findEmployeeDto: FindEmployeeDto) {
    const pattern = { cmd: "users_role_findEmployee" };
    const data = findEmployeeDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取某个职工角色下的模块权限等级
  async findEmployeeModule(roleId: String) {
    const pattern = { cmd: "users_role_findEmployeeModule" };
    const data = roleId;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取某个职工角色下的用户数量
  async findEmployeeSum(roleId: string, like: string) {
    const pattern = { cmd: "users_role_findEmployeeSum" };
    const data = { roleId: roleId, like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }


  // 根据工号/姓名查询职工
  async findEmployeeAdd(like: string) {
    const pattern = { cmd: "users_role_findEmployeeAdd" };
    const data = { like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }


  // 获取所有学生角色信息
  async findRoleStudentAll() {
    const pattern = { cmd: "users_role_findStudentAll" };
    const data = {};

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取某个学生角色下的模块权限等级
  async findStudentModule(roleId: string) {
    const pattern = { cmd: "users_role_findStudentModule" };
    const data = roleId;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }


  // 获取某个学生角色下的用户信息
  async findStudent(roleId: string, like: string, page: number) {
    const pattern = { cmd: "users_role_findStudent" };
    const data = { roleId: roleId, page: page, like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取学生角色下的学生总数量接口
  async findStudentSum(roleId: string, like: string) {
    const pattern = { cmd: "users_role_findStudentSum" };
    const data = { roleId: roleId, like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 根据学号/姓名获取学生数据
  async findStudentAdd(like: string) {
    const pattern = { cmd: "users_role_findStudentAdd" };
    const data = { like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取所有管理员类
  async findAdminType() {
    const pattern = { cmd: "users_role_findAdminType" };
    const data = {};

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取管理员下的用户数据
  async findAdminUser(findAdminUserDto: FindAdminUserDto) {
    const pattern = { cmd: "users_role_findAdminUser" };
    const data = findAdminUserDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取管理员下的用户数量
  async findAdminUserSum(findAdminUserDto: FindAdminUserDto) {
    const pattern = { cmd: "users_role_findAdminUserSum" };
    const data = findAdminUserDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 创建新管理员
  async createAdminUser(createAdminUserDto: CreateAdminUserDto) {
    const pattern = { cmd: "users_role_createAdminUser" };
    const data = createAdminUserDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 编辑管理员权限
  async updateAdminUser(updateAdminUserDto: UpdateAdminUserDto) {
    const pattern = { cmd: "users_role_updateAdminUser" };
    const data = updateAdminUserDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 删除管理员
  async delAdminUser(moduleId: string, userId: string) {
    const pattern = { cmd: "users_role_delAdminUserDto" };
    const data = { moduleId: moduleId, userId: userId };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取所有模块
  async findMoudle() {
    const pattern = { cmd: "users_role_findMoudle" };
    const data = {};

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取所有权限等级
  async findOperation() {
    const pattern = { cmd: "users_role_findOperation" };
    const data = {};

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }
}