import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class HistoryDivisionService {
  constructor(
    @Inject("HISTORY_SERVICE") private readonly historyService: ClientProxy
  ) { }

  // 获取省级方法
  async province() {
    const pattern = { cmd: "history_division_province" };
    const data = {};

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 根据省级id获取市级方法
  async city(provinceId: string) {
    const pattern = { cmd: "history_division_city" };
    const data = provinceId;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }

  // 根据市级id获取县级方法
  async country(cityId: string) {
    const pattern = { cmd: "history_division_country" };
    const data = cityId;

    let status = this.historyService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ));
    return status;
  }
}
