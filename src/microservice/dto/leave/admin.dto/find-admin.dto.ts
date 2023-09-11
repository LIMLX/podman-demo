import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty } from "class-validator"

export class FindLeaveDto {
    @ApiProperty({
        required: true,
        description: '页数'
    })

    @IsNotEmpty()
    @IsInt()
    page: number

    @ApiProperty({
        required: false,
        description: '班级id'
    })
    classId: string

    @ApiProperty({
        required: false,
        description: '类型type'
    })
    @IsIn(['0', '1', 'leave', 'all', 'school', 'returnSchool', undefined])
    type: string

    @ApiProperty({
        required: false,
        description: '排序状态'
    })
    @IsIn(['asc', 'desc', undefined])
    orderBy: string

    @ApiProperty({
        required: false,
        description: '状态num'
    })
    statusNum: string

    @ApiProperty({
        required: false,
        description: '关键词'
    })
    like: string
}