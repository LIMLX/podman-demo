import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateClockDto {
    userId: string

    @ApiProperty({
        required: true,
        description: '体温'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsNumber()
    tp: number


    @ApiProperty({
        required: true,
        description: '选择的当前状态类型'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsNumber()
    typeVal: number
}
