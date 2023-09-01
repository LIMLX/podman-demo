import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateStatusDto, UpdateStatusDto } from 'src/microservice/dto/report/status.dto';

@Injectable()
export class StatusService {
  constructor(
    @Inject("REPORT_SERVICE") private readonly reportService: ClientProxy
  ) { }

  // 查询所有状态
  async findStatus() {
    const pattern = { cmd: "report_status_findStatus" };
    const data = {}
    try {
      const statusData = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));

      return statusData;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 创建状态
  async createStatus(createStatusDto: CreateStatusDto) {
    const pattern = { cmd: "report_status_createStatus" };
    const data = createStatusDto;
    try {
      const status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));

      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 修改状态
  async updateStatus(updateStatus: UpdateStatusDto) {
    const pattern = { cmd: "report_status_updateStatus" };
    const data = updateStatus;
    try {
      const status = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 删除状态
  async removeStatus(id: string) {
    const pattern = { cmd: "report_status_removeStatus" };
    const data = id;
    try {
      const status = this.reportService.send<any>(pattern, data)
        .pipe(map((message: any) => { return message }));
      return status;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }
}
