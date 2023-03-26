import { ApiProperty } from '@nestjs/swagger';
import { CreateSchoolTypeDto, CreateStatusDto, CreateTransportationDto, CreateTypeDto } from './create-type.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTypeDto extends CreateTypeDto {
    @ApiProperty({
        required: true,
        description:'请假单类型id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeId: string
}

export class UpdateSchoolTypeDto extends CreateSchoolTypeDto {
    @ApiProperty({
        required: true,
        description:'离校单类型id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeId: string
}

export class UpdateStatusDto extends CreateStatusDto {
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
}

export class UpdateTransportationDto extends CreateTransportationDto {
    @ApiProperty({
        required: true,
        description:'交通方式id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    transportationId: string
}