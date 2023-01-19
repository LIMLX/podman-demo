import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";

@Injectable()
export class SmsService {
    constructor(
        private readonly config: ConfigService,
        @Inject("SMS_SERVICE") private readonly smsService: ClientProxy
    ){}

    send_verification() {
        const pattern = { cmd: "sms_send_verification" };
         
        let status = this.smsService
      .send<any>(pattern,{})
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
}