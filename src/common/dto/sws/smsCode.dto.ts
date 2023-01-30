import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SmsCokde {
    @ApiProperty({
        required: true,
        description:'验证码Key'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    codeKey : string

    @ApiProperty({
        required: true,
        description:'验证码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    code : string
} 