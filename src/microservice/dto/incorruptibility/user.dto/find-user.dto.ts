import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class FindSloganOneDto {
    @ApiProperty({
        required: true,
        description: '标语id'
    })
    @IsNotEmpty()
    @IsString()
    sloganId: string
    userId: string
    userRole: number
    userName: string
}

export class FindSloganCommentDto {
    @ApiProperty({
        required: true,
        description: '标语id'
    })
    @IsNotEmpty()
    @IsString()
    sloganId: string
    page: any
}

export class SloganCommentDto {
    @ApiProperty({
        required: true,
        description: '标语id'
    })
    @IsNotEmpty()
    @IsString()
    sloganId: string

    @ApiProperty({
        required: true,
        description: '评论内容'
    })
    @IsNotEmpty()
    @IsString()
    content: string

    userId: string
    userRole: number
    userName: string
}

export class SloganCommentPraiseDto {
    @ApiProperty({
        required: true,
        description: '评论id'
    })
    @IsNotEmpty()
    @IsString()
    commentId: string
    userId: string
    userRole: number
    userName: string
}