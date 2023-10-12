import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HistoryDivisionService } from 'src/microservice/service/history';

@ApiTags('党史地点')
@Controller('history/division')
export class HistoryDivisionController {
  constructor(private readonly divisionService: HistoryDivisionService) { }

  @ApiOperation({ summary: "获取省级信息的接口", description: "获取到一系列省份信息" })
  @UseGuards(AuthGuard('jwt'))
  @Get('/province')
  async province() {
    return await this.divisionService.province();
  }

  @ApiOperation({ summary: "获取市级信息的接口", description: "根据省份id查询对应的市级信息" })
  @UseGuards(AuthGuard('jwt'))
  @Get('/city/province=:provinceId')
  async city(@Param("provinceId") provinceId: string) {
    return this.divisionService.city(provinceId);
  }

  @ApiOperation({ summary: "获取县级信息的接口", description: "根据市级id查询对应的县级信息" })
  @UseGuards(AuthGuard('jwt'))
  @Get('/country/city=:cityId')
  async country(@Param("provinceId") cityId: string) {
    return this.divisionService.country(cityId);
  }
}
