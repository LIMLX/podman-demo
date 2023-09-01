import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateTypeDto, UpdateTypeDto } from 'src/microservice/dto/report/tpye.dto';


@Injectable()
export class TypeService {
  constructor(
    @Inject("REPORT_SERVICE") private readonly reportService: ClientProxy
  ) { }

  // 查询所有类型
  async findType() {
    const pattern = { cmd: "report_type_findType" };
    const data = {};
    try {
      const typeData = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return typeData;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 创建新类型
  async createType(createTypeDto: CreateTypeDto) {
    const pattern = { cmd: "report_type_createType" };
    const data = createTypeDto;
    try {
      const status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 修改类型
  async updateType(updateTypeDto: UpdateTypeDto) {
    const pattern = { cmd: "report_type_updateType" };
    const data = updateTypeDto;
    try {
      const status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 删除类型
  async removeType(id: string) {
    const pattern = { cmd: "report_type_removeType" };
    const data = id;
    try {
      const status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }
}
