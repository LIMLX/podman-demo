import { ApiProperty } from '@nestjs/swagger';
import { CreateLeaveDto, CreateLeaveSchoolDto, CreateReturnDto } from './create-student.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateLeaveDto extends CreateLeaveDto {
    @ApiProperty({
        required: true,
        description: '请假单id'
    })

    @IsNotEmpty()
    @IsString()
    leaveId: string
}

export class UpdateLeaveSchoolDto extends CreateLeaveSchoolDto {
    @ApiProperty({
        required: true,
        description: '离校单id'
    })

    @IsNotEmpty()
    @IsString()
    leaveSchoolId: number
}

export class UpdateReturnDto extends CreateReturnDto {
    @ApiProperty({
        required: true,
        description: '返校单id'
    })

    @IsNotEmpty()
    @IsString()
    returnId: string
}