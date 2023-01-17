import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { UserDTO } from "src/common";

@Injectable()
export class AuthService {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
        ) {}

    validateUser(userDTO: UserDTO) {
    const pattern = { cmd: "user_validateUser" };

    return this.userService
        .send<string>(pattern,userDTO)
        .pipe(map((massage: string) => ({ massage })));
    }

}