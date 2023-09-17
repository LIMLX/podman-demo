import { ApiProperty } from "@nestjs/swagger"
import { IsIn } from "class-validator"

export class FindRepairsDto {
    managerId: string
    typeNum: string

    @ApiProperty({
        required: true,
        description: '状态'
    })
    @IsIn([-1, 1, 2, 3, "-1", "1", "2", "3", undefined])
    status: number
    page: number
}
