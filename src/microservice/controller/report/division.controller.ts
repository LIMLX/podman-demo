import { Controller, Get, Param } from '@nestjs/common';
import { DivisionService } from 'src/microservice/service/report';

@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) { }

  @Get('/province')
  async province() {
    return await this.divisionService.province();
  }

  @Get('/city/province=:provinceId')
  async city(@Param() { provinceId }: { provinceId: string }) {
    return await this.divisionService.city(provinceId);
  }

  @Get('/country/city=:cityId')
  async country(@Param() { cityId }: { cityId: string }) {
    return await this.divisionService.country(cityId);
  }
}
