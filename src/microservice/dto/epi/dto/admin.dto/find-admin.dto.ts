import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class FindClassDto {
    campusId: string
    like: string
    time: string
    page: any
}

export class FindClassStudentDto {
    @ApiProperty({
        required: true,
        description: '班级id'
    })

    @IsNotEmpty()
    @IsString()
    classId: string

    @ApiProperty({
        required: true,
        description: '时间选项'
    })

    @IsNotEmpty()
    @IsString()
    time: string

    @ApiProperty({
        required: true,
        description: '分页'
    })

    @IsNotEmpty()
    page: any
    like: string
}

export class FindClassStuReportDto {
    @ApiProperty({
        required: true,
        description: '时间'
    })
    @IsNotEmpty()
    @IsString()
    time: string

    @ApiProperty({
        required: true,
        description: '学院id'
    })
    @IsNotEmpty()
    @IsString()
    campusId: string

    @ApiProperty({
        required: true,
        description: '分页页数'
    })
    page: any
    classId: string
    status: number
    typeId: string
    like: string
}