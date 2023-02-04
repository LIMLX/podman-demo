import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { SmsCokde, SmsV } from "src/microservice/dto";


@Injectable()
export class SmsCodeService {
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

    verification_code (codeKey: SmsCokde) {
      const pattern = { cmd: "sms_verification_code" };
      
      let status = this.smsService
      .send<SmsCokde>(pattern,codeKey)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
}