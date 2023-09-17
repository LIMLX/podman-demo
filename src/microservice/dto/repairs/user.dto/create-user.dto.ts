import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateRepairsDto {
    userId: string
    userNum: string
    userName: string
    userLevel: number

    @ApiProperty({
        required: true,
        description: '类型num'
    })
    @IsNotEmpty()
    @IsString()
    typeNum: string

    @ApiProperty({
        required: true,
        description: '楼栋num'
    })
    @IsNotEmpty()
    @IsString()
    buildingNum: string

    @ApiProperty({
        required: true,
        description: '楼栋内宿舍号'
    })
    @IsNotEmpty()
    @IsString()
    dorm: string

    @ApiProperty({
        required: true,
        description: '电话号码'
    })
    @IsNotEmpty()
    @IsString()
    @Length(10, 11)
    phone: string

    @ApiProperty({
        required: true,
        description: '内容'
    })
    @IsNotEmpty()
    @IsString()
    content: string

    file: {
        file_site: string
        file_type: string
    }[]
}
