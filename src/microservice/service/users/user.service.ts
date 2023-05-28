import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { LoginDto } from "src/microservice/dto/users/user.dto";

@Injectable()
export class UsersService {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ) { }

    async login(loginDto: LoginDto) {
        const pattern = { cmd: "user_login" };
        const data = loginDto
        let token: object

        const observable = this.userService
            .send<any>(pattern, data)
            .pipe(
                map((message: any) => {
                    if (message && message !== "login error" && message !== "abnormal") {
                        token = { token: this.jwtService.sign(message) }
                        return token
                    } else if (message === "login error") {

                    } else {
                        return token = { "message": "Unauthorized" }
                    }
                }))

        // 异步执行获取查询的数据
        try {
            await lastValueFrom(observable)
        } catch (error) {
            console.error(error)
        }

        return token
    }
}