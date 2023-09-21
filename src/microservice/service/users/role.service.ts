import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { AuthEmployeeRoleDto, AuthStudentRoleDto, CreateRoleDto, DeleteRoleDto, FindEmployeeDto, UpdateRoleDto } from "src/microservice/dto";

@Injectable()
export class UsersRoleService {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) { }

  // 创建角色
  async createRole(createRoleDto: CreateRoleDto) {
    const pattern = { cmd: "users_role_create" };
    const data = createRoleDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改角色
  async updateRole(updateRoledto: UpdateRoleDto) {
    const pattern = { cmd: "users_role_update" };
    const data = updateRoledto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除角色
  async deleteRole(deleteRoleDto: DeleteRoleDto) {
    const pattern = { cmd: "users_role_delete" };
    const data = deleteRoleDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 授权职工的角色
  async roleEmployeeAuth(authEmployeeRoleDto: AuthEmployeeRoleDto) {
    const pattern = { cmd: "users_role_authEmployee" };
    const data = authEmployeeRoleDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 授权学生的角色
  async roleStudentAuth(authStudentRoleDto: AuthStudentRoleDto) {
    const pattern = { cmd: "users_role_authStudent" };
    const data = authStudentRoleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 获取所有职工角色信息
  async findRoleEmployeeAll() {
    const pattern = { cmd: "users_role_findEmployeeAll" };
    const data = {}

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
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
          return message
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
          return message
        }
        ))
    return status
  }

  // 获取所有学生角色信息
  async findRoleStudentAll() {
    const pattern = { cmd: "users_role_findStudentAll" };
    const data = {}

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 获取某个学生角色下的模块权限等级
  async findStudentModule(roleId: string) {
    const pattern = { cmd: "users_role_findStudentModule" };
    const data = roleId;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }


  // 获取某个学生角色下的用户信息
  async findStudent(roleId: string, page: number) {
    const pattern = { cmd: "users_role_findStudent" };
    const data = { roleId: roleId, page: page }

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 获取学生角色下的学生总数量接口
  async findStudentSum(roleId: string) {
    const pattern = { cmd: "users_role_findStudentSum" };
    const data = roleId;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }
}