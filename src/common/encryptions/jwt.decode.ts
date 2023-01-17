import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JWTDATA {
    constructor(
        private readonly jwtService: JwtService
    ){}

    // 进行token数据解析
    getJWT (token: string) {
        return this.jwtService.verify(token)
    }
}