import { Controller, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SmsService } from "../service";

@Controller("sms")
export class SmsController {
    constructor(
        private readonly smsService: SmsService
    ){}
    
    @Post("sendVerification")
    send_verification() {
        return this.smsService.send_verification()
    }
}