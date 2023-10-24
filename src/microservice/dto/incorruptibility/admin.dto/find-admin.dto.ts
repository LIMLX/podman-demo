import { ApiProperty } from "@nestjs/swagger"
import { IsIn } from "class-validator"

export class FindSloganDto {
    like: string
    @ApiProperty({
        required: true,
        description: '标语状态值'
    })
    @IsIn([undefined, "desc", "asc"])

    orderBy: string

    @ApiProperty({
        required: true,
        description: '标语状态值'
    })
    @IsIn([undefined, "0", "1", 0, 1])
    status: any
    page: number
}