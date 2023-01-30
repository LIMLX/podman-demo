import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { SmsV } from "src/common/dto/sws/sws.v.DTO";

@Injectable()
export class SmsService {
    constructor(
        private readonly config: ConfigService,
        @Inject("SMS_SERVICE") private readonly smsService: ClientProxy
    ){}

    send_verification(phone : SmsV ) {
        const pattern = { cmd: "sms_send_verification" };
        const data = phone
        let status = this.smsService
      .send<any>(pattern,data)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
}