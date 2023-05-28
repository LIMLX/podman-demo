import { ApiProperty } from '@nestjs/swagger';
import { CreateLeaveDto, CreateLeaveSchoolDto, CreateReturnDto } from './create-student.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateLeaveDto extends CreateLeaveDto {
    @ApiProperty({
        required: true,
        description: '请假单id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为字符串"
    })
    leaveId: number


    @ApiProperty({
        required: true,
        description: '请假单uuid'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    leaveUUID: string
}

export class UpdateLeaveSchoolDto extends CreateLeaveSchoolDto {
    @ApiProperty({
        required: true,
        description: '离校单id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为字符串"
    })
    leaveSchoolId: number


    @ApiProperty({
        required: true,
        description: '离校单uuid'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    leaveSchoolUUID: string
}

export class UpdateReturnDto extends CreateReturnDto {
    returnId: string
}