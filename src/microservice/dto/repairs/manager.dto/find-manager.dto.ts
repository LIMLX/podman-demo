import { ApiProperty } from "@nestjs/swagger"
import { IsIn } from "class-validator"

export class FindRepairsDto {
    managerNum: string
    typeNum: string

    @ApiProperty({
        required: true,
        description: '状态'
    })
    @IsIn([-1, 1, 2, 3, "-1", "1", "2", "3", undefined])
    status: any
    page: number
}
