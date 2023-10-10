import { ApiProperty } from "@nestjs/swagger"
import { IsIn } from "class-validator"

export class FindNoticeDto {
    @ApiProperty({
        required: true,
        description: '排序'
    })
    @IsIn(["asc", "desc", undefined])
    orderBy: string

    @ApiProperty({
        required: true,
        description: '是否发布状态'
    })
    @IsIn(["1", 1, "0", 0, undefined])
    status: any
    like: string
    page: number
}