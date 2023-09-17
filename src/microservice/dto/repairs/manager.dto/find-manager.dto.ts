import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty } from "class-validator"

export class FindRepairsDto {
    managerId: string
    typeNum: string
    status: number

    @ApiProperty({
        required: true,
        description: '页数'
    })
    @IsNotEmpty()
    @IsInt()
    page: number
}
