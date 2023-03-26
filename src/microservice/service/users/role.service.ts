import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { AuthEmployeeRoleDto, AuthStudentRoleDto, CreateRoleDto, DeleteRoleDto, UpdateRoleDto } from "src/microservice/dto";

@Injectable()
export class UsersRoleService {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ){}

    // 创建角色
    async createRole(createRoleDto: CreateRoleDto) {
        const pattern = { cmd: "role_create" };
        const data = createRoleDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }

    // 修改角色
    async updateRole(updateRoledto: UpdateRoleDto) {
        const pattern = { cmd: "role_update" };
        const data = updateRoledto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }

    // 删除角色
    async deleteRole (deleteRoleDto : DeleteRoleDto) {
        const pattern = { cmd: "role_delete" };
        const data = deleteRoleDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }

    // 授权职工的角色
    async roleEmployeeAuth (authEmployeeRoleDto: AuthEmployeeRoleDto) {
        const pattern = { cmd: "role_authEmployee" };
        const data = authEmployeeRoleDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }

    // 授权学生的角色
    async roleStudentAuth (authStudentRoleDto: AuthStudentRoleDto) {
        const pattern = { cmd: "role_authStudent" };
        const data = authStudentRoleDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }    

    // 获取所有职工角色信息
    async findRoleEmployeeAll () {
      const pattern = { cmd: "role_findEmployeeAll" };
      const data = {}

      let status = this.userService
      .send<any>(pattern,data)
      .pipe(
        map((message: any) => {
          return message
        }
      ))
      return status
    }
  
    // 获取所有学生角色信息
    async findRoleStudentAll () {
      const pattern = { cmd: "role_findStudentAll" };
      const data = {}

      let status = this.userService
      .send<any>(pattern,data)
      .pipe(
        map((message: any) => {
          return message
        }
      ))
      return status
    }
}