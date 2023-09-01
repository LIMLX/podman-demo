import { Controller, Get, Param } from '@nestjs/common';
import { HistoryDivisionService } from 'src/microservice/service/history';

@Controller('history/division')
export class HistoryDivisionController {
  constructor(private readonly divisionService: HistoryDivisionService) { }

  @Get('/province')
  async province() {
    return await this.divisionService.province();
  }

  @Get('/city/province=:provinceId')
  async city(@Param("provinceId") provinceId: string) {
    return this.divisionService.city(provinceId);
  }

  @Get('/country/city=:cityId')
  async country(@Param("provinceId") cityId: string) {
    return this.divisionService.country(cityId);
  }
}
