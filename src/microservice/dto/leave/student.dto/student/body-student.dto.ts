import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BodyLeaveSchoolOneDto {
    @ApiProperty({
        required: true,
        description: '离校单uuid'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    uuid: string
}