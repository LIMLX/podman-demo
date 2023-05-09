import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { StudentRoleGuard } from "src/common";
import { SmsCokde, SmsV } from "src/microservice/dto";
import { SmsCodeService } from "src/microservice/service";

@ApiTags('sms')
@Controller("sms/code")
@UseGuards(StudentRoleGuard)
export class SmsCodeController {
    constructor(
        private readonly smsService: SmsCodeService
    ) { }

    @ApiOperation({ summary: "验证码发送接口", description: "进行验证码发送，填写手机号码" })
    @Post("/sendVerification")
    send_verification(@Body() phone: SmsV) {
        return this.smsService.send_verification(phone)
    }

    @ApiOperation({ summary: "验证码验证接口", description: "进行验证码验证，需要key以及验证码" })
    @Post("/verificationCode")
    verification_code(@Body() code: SmsCokde) {
        return this.smsService.verification_code(code)
    }
}