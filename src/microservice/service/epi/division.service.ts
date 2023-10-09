import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CityDto, CountryDto } from "src/microservice/dto/leave/division.dto";

@Injectable()
export class EpiDivisionService {
  constructor(
    @Inject("EPI_SERVICE") private readonly epiService: ClientProxy
  ) { }

  // 获取省份
  async province() {
    const pattern = { cmd: "ep_division_findProvince" };
    const data = {}

    let status = this.epiService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status;
  }

  // 根据省级id获取市级方法
  async city(cityDto: CityDto) {
    const pattern = { cmd: "ep_division_findCity" };
    const data = cityDto

    let status = this.epiService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status;
  }

  // 根据市级id获取县级方法
  async country(countryDto: CountryDto) {
    const pattern = { cmd: "ep_division_findCountry" };
    const data = countryDto

    let status = this.epiService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message
        }
        ))
    return status;
  }
}