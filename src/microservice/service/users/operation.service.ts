import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateOperationDto, UpdateOperationDto } from "src/microservice/dto";

@Injectable()
export class UsersOperationService {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) { }

  // 创建操作权限
  async createOperation(createOperationDto: CreateOperationDto) {
    const pattern = { cmd: "users_operation_create" };
    const data = createOperationDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取所有操作权限
  async findOperationAll() {
    const pattern = { cmd: "users_operation_findAll" };
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

  // 修改操作权限
  async updateOperation(updateOperationDto: UpdateOperationDto) {
    const pattern = { cmd: "users_operation_update" };
    const data = updateOperationDto;

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