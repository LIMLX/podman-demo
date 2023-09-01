import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class DivisionService {
  constructor(
    @Inject("REPORT_SERVICE") private readonly reportService: ClientProxy
  ) { }
  // 获取省级方法
  async province() {
    const pattern = { cmd: "report_division_province" };
    const data = {}
    try {
      const provinceData = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return provinceData;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 根据省级id获取市级方法
  async city(provinceId: string) {
    const pattern = { cmd: "report_division_city" };
    const data = provinceId
    try {
      const cityData = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));

      return cityData;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }

  // 根据市级id获取县级方法
  async country(cityId: string) {
    const pattern = { cmd: "report_division_country" };
    const data = cityId
    try {
      const countryData = this.reportService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
      return countryData;
    } catch (error) {
      console.log(error);
      return "abnormal"
    }
  }
}
