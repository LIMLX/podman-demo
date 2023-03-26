import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CityDto, CountryDto } from "src/microservice/dto/leave/division.dto";

@Injectable()
export class LeaveDivisionService{
    constructor(
        @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
    ){}
    
    // 获取省份
    async province () {
        const pattern = { cmd: "division_findProvince" };
        const data = {}
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 根据省级id获取市级方法
    async city (cityDto:CityDto) {
        const pattern = { cmd: "division_findCity" };
        const data = cityDto
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }

    // 根据市级id获取县级方法
    async country (countryDto:CountryDto) {
        const pattern = { cmd: "division_findCountry" };
        const data = countryDto
    
        let status = this.leaveService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
}