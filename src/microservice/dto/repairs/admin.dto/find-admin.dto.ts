import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty } from "class-validator"

export class FindRepairsDto {
    building: string
    type: string
    like: string

    @ApiProperty({
        required: true,
        description: '排序'
    })
    @IsIn(["desc", "asc", undefined])
    orderBy: string

    @ApiProperty({
        required: true,
        description: '状态'
    })
    @IsIn([-2, -1, 1, 2, 3, 0, "-2", "-1", "1", "2", "3", "0", undefined])
    status: number
    page: number
}

export class FindBuildingDto {
    @ApiProperty({
        required: true,
        description: '类型种类'
    })
    @IsIn([0, 1, 2, 3, 4, "0", "1", "2", "3", "4", undefined])
    type: number

    @ApiProperty({
        required: true,
        description: '状态'
    })
    @IsIn([0, 1, "0", "1", undefined])
    status: number

    like: string
    page: number
}

export class FindManagerDto {
    @ApiProperty({
        required: true,
        description: '页数'
    })
    @IsNotEmpty()
    @IsInt()
    page: number

    @ApiProperty({
        required: true,
        description: '状态'
    })
    @IsIn([0, 1, undefined])
    status: number
    like: string
}