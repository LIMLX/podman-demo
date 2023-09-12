import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from "class-validator"

export class CreateLeaveDto {

    @ApiProperty({
        required: true,
        description: '类型'
    })
    @IsNotEmpty()
    @IsNumber()
    @IsIn([0, 1])
    type: number


    @ApiProperty({
        required: true,
        description: '内容'
    })
    @IsNotEmpty()
    @IsString()
    content: string


    @ApiProperty({
        required: true,
        description: '起始时间'
    })
    @IsNotEmpty()
    startTime: Date


    @ApiProperty({
        required: true,
        description: '结束时间'
    })
    @IsNotEmpty()
    endTime: Date

    @ApiProperty({
        required: false,
        description: '文件'
    })
    file: {
        file_name: string,
        file_type: string
    }[]

    userId: string
    userName: string
}

export class CreateLeaveSchoolDto {
    leaveUserId: string
    leaveUserName: string

    @ApiProperty({
        required: true,
        description: '省级id'
    })

    @IsNotEmpty()
    @IsString()
    leaveSchoolTypeNum: string


    @ApiProperty({
        required: true,
        description: '开始时间'
    })

    @IsNotEmpty()
    startTime: Date


    @ApiProperty({
        required: true,
        description: '结束时间'
    })

    @IsNotEmpty()
    endTime: Date


    @ApiProperty({
        required: true,
        description: '交通方式'
    })

    @IsNotEmpty()
    @IsString()
    transportationNum: string


    @ApiProperty({
        required: true,
        description: '航班号'
    })

    @IsNotEmpty()
    @IsString()
    flight: string


    @ApiProperty({
        required: true,
        description: '省级id'
    })

    @IsNotEmpty()
    @IsString()
    province: string


    @ApiProperty({
        required: true,
        description: '市级id'
    })

    @IsNotEmpty()
    @IsString()
    city: string


    @ApiProperty({
        required: true,
        description: '县级id'
    })

    @IsNotEmpty()
    @IsString()
    country: string


    @ApiProperty({
        required: true,
        description: '内容'
    })

    @IsNotEmpty()
    @IsString()
    content: string
}

export class CreateReturnDto {
    userId: string
    userName: string

    @ApiProperty({
        required: true,
        description: '手机号码'
    })
    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 11)
    phone: string


    @ApiProperty({
        required: true,
        description: '预约起始时间'
    })
    @IsNotEmpty()
    startET: Date


    @ApiProperty({
        required: true,
        description: '预约结束时间'
    })
    @IsNotEmpty()
    endET?: Date

    @ApiProperty({
        required: true,
        description: '出发时间'
    })
    @IsNotEmpty()
    startTime?: Date

    @ApiProperty({
        required: true,
        description: '结束时间'
    })
    @IsNotEmpty()
    endTime?: Date

    @ApiProperty({
        required: true,
        description: '交通num'
    })
    @IsNotEmpty()
    @IsString()
    transportationNum?: string

    @ApiProperty({
        required: true,
        description: '航班/车次'
    })
    @IsNotEmpty()
    @IsString()
    flight?: string

    @ApiProperty({
        required: true,
        description: '起始出发省'
    })
    @IsNotEmpty()
    @IsString()
    startProvince?: string

    @ApiProperty({
        required: true,
        description: '起始出发城市/县'
    })
    @IsNotEmpty()
    @IsString()
    startCity?: string

    @ApiProperty({
        required: true,
        description: '起始出发区/县'
    })
    @IsNotEmpty()
    @IsString()
    startCountry?: string

    @ApiProperty({
        required: true,
        description: '到达省份'
    })
    @IsNotEmpty()
    @IsString()
    endProvince?: string

    @ApiProperty({
        required: true,
        description: '到达城市/县'
    })
    @IsNotEmpty()
    @IsString()
    endCity?: string

    @ApiProperty({
        required: true,
        description: '到达区/县/镇'
    })
    @IsNotEmpty()
    @IsString()
    endCountry?: string
}