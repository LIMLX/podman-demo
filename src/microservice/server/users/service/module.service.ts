import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { AuthEmployeeDto, AuthStudentDto, CreateModuleDto, DeleteAuthEmployeePrivateDto, DeleteAuthEmployeeRoleDto, DeleteAuthStudentPrivateDto, DeleteAuthStudentRoleDto, PrivateEmployeeAuthDto, PrivateStudentAuthDto, UpdateEmployeeAuthDto, UpdateEmployeePrivateDto, UpdateModuleDto, UpdateStudentAuthDto, UpdateStudentPrivateDto } from "src/microservice/dto";

@Injectable()
export class UsersModuleService {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) { }

  // 创建模块
  async createModule(createModuleDto: CreateModuleDto) {
    const pattern = { cmd: "users_module_create" };
    const data = createModuleDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 修改模块
  async updateModule(updateModuleDto: UpdateModuleDto) {
    const pattern = { cmd: "users_module_update" };
    const data = updateModuleDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除模块
  async deleteModule(moduleId: string) {
    const pattern = { cmd: "users_module_delete" };
    const data = moduleId;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 查询所有模块
  async findMoudleAll() {
    const pattern = { cmd: "users_module_findAll" };
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

  // --------------------------------------职工权限---------------------------------------

  // 模块给职工角色授权
  async moduleEmployeeRoleAuth(authEmployeeDto: AuthEmployeeDto) {
    const pattern = { cmd: "users_module_authEmployeeRole" };
    const data = authEmployeeDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改职工模块权限
  async moduleEmployeeRoleUpdate(updateEmployeeAuthDto: UpdateEmployeeAuthDto) {
    const pattern = { cmd: "users_module_updateEmployeeRole" };
    const data = updateEmployeeAuthDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除职工模块权限
  async moduleEmployeeAuthdelelt(deleteAuthDto: DeleteAuthEmployeeRoleDto) {
    const pattern = { cmd: "users_module_deleteEmployeeRole" };
    const data = deleteAuthDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 职工私有授权
  async privateEmployeeAuth(authEmployeeDto: PrivateEmployeeAuthDto) {
    const pattern = { cmd: "users_module_authEmployeePrivate" };
    const data = authEmployeeDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改职工私有权限
  async privateEmployeeAuthUpdate(updateEmployeeAuthDto: UpdateEmployeePrivateDto) {
    const pattern = { cmd: "users_module_updateEmployeePrivate" };
    const data = updateEmployeeAuthDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除职工私有权限
  async privateEmployeeAuthdelelt(deleteAuthDto: DeleteAuthEmployeePrivateDto) {
    const pattern = { cmd: "users_module_deleteEmployeePrivate" };
    const data = deleteAuthDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }


  // --------------------------------------学生权限---------------------------------------

  // 模块给学生角色授权
  async moduleStudentRoleAuth(authStudentDto: AuthStudentDto) {
    const pattern = { cmd: "users_module_authStudentRole" };
    const data = authStudentDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改学生模块权限
  async moduleStudentRoleUpdate(updateStudentAuthDto: UpdateStudentAuthDto) {
    const pattern = { cmd: "users_module_updateStudentRole" };
    const data = updateStudentAuthDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除学生模块权限
  async moduleStudentAuthdelelt(deleteAuthDto: DeleteAuthStudentRoleDto) {
    const pattern = { cmd: "users_module_deleteStudentRole" };
    const data = deleteAuthDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  //学生私有授权
  async privateStudentAuth(authStudentDto: PrivateStudentAuthDto) {
    const pattern = { cmd: "users_module_authStudentPrivate" };
    const data = authStudentDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 修改学生私有权限
  async privateStudentUpdate(updateStudentAuthDto: UpdateStudentPrivateDto) {
    const pattern = { cmd: "users_module_updateStudentPrivate" };
    const data = updateStudentAuthDto

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status
  }

  // 删除学生私有权限
  async privateStudentdelelt(deleteAuthDto: DeleteAuthStudentPrivateDto) {
    const pattern = { cmd: "users_module_deleteStudentPrivate" };
    const data = deleteAuthDto

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
