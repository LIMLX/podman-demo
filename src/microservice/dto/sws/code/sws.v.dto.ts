import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class SmsV{
    @ApiProperty({
        required: true,
        description:'手机号码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    @Length(11,11,{
        message:'长度为11位'
    })
    phoneNumbers : string
}