import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SmsService } from "../service";
import { ApiOperation } from "@nestjs/swagger";
import { SmsCokde, SmsV } from "src/common";
import { StudentRoleGuard } from "src/common";

@Controller("sms")
@UseGuards(StudentRoleGuard)
export class SmsController {
    constructor(
        private readonly smsService: SmsService
    ){}
    
    @ApiOperation({summary:"验证码发送接口", description:"进行验证码发送，填写手机号码"})
    @Post("/sendVerification")
    send_verification(@Body() phone : SmsV  ) {
        return this.smsService.send_verification(phone)
    }

    @ApiOperation({summary:"验证码验证接口", description:"进行验证码验证，需要key以及验证码"})
    @Post("/verificationCode")
    verification_code(@Body() code: SmsCokde  ) {
        return this.smsService.verification_code(code)
    }
}