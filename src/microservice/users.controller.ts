import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";

@Controller("user")
export class UserController {
  constructor(
    @Inject("USER_SERVICE") private readonly clientServiceA: ClientProxy
    ) {}

  @Get("/")
  pingServiceA() {
    const pattern = { cmd: "ping" };
    return this.clientServiceA.send<string>(pattern,{}).pipe(map((massage: string) => ({ massage })));
  }
}