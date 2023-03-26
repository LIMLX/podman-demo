import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateLeaveDto {
    @ApiProperty({
        required: true,
        description:'状态id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    statusId: string


    @ApiProperty({
        required: true,
        description:'类型id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeId: string


    @ApiProperty({
        required: true,
        description:'内容'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    content: string


    @ApiProperty({
        required: true,
        description:'起始时间'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    startTime: Date


    @ApiProperty({
        required: true,
        description:'结束时间'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    endTime: Date
    userUUID:string

    @ApiProperty({
        required: false,
        description:'文件'
    })
    file: {
        leave_uuid: string,
        file_name: string,
        file_type: string
    }[]
}

export class CreateLeaveSchoolDto{
    leaveUserId: string
    @ApiProperty({
        required: true,
        description:'省级id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    leaveSchoolTypeId : string


    @ApiProperty({
        required: true,
        description:'开始时间'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    startTime : Date


    @ApiProperty({
        required: true,
        description:'结束时间'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    endTime: Date


    @ApiProperty({
        required: true,
        description:'交通方式'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    transportationId:string


    @ApiProperty({
        required: true,
        description:'航班号'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    flight:string


    @ApiProperty({
        required: true,
        description:'省级id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    province: string


    @ApiProperty({
        required: true,
        description:'市级id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    city: string


    @ApiProperty({
        required: true,
        description:'县级id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    country: string


    @ApiProperty({
        required: true,
        description:'内容'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    content: string


    @ApiProperty({
        required: true,
        description:'状态id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    leaveSchoolStatus: string
}