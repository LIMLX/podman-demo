import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CityDto, CountryDto } from "src/microservice/dto/leave/division.dto";
import { LeaveDivisionService } from "src/microservice/service/leave";

@ApiTags("leave")
@Controller('leave/division')
export class LeaveDivisionController {
  constructor(private readonly divisionService: LeaveDivisionService) { }

  @ApiOperation({ summary: "获取省级信息的接口", description: "获取到一系列省份信息" })
  @Get('province')
  async province() {
    return await this.divisionService.province()
  }

  @ApiOperation({ summary: "获取市级信息的接口", description: "根据省份id查询对应的市级信息" })
  @Get('city/:provinceId')
  async city(@Param() cityDto: CityDto) {
    return this.divisionService.city(cityDto)
  }

  @ApiOperation({ summary: "获取县级信息的接口", description: "根据市级id查询对应的县级信息" })
  @Get('country/:cityId')
  async country(@Param() countryDto: CountryDto) {
    return this.divisionService.country(countryDto)
  }
}