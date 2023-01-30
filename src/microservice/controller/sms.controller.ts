import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SmsService } from "../service";
import { ApiOperation } from "@nestjs/swagger";
import { SmsV } from "src/common";
import { RoleGuard } from "src/common";

@Controller("sms")
@UseGuards(RoleGuard)
export class SmsController {
    constructor(
        private readonly smsService: SmsService
    ){}
    
    @ApiOperation({summary:"验证码发送接口", description:"进行验证码发送，填写手机号码"})
    @Post("sendVerification")
    send_verification(@Body() phone : SmsV  ) {
        return this.smsService.send_verification(phone)
    }
}