import { ApiProperty } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateEmployeeDto extends CreateEmployeeDto { }

export class UpdateLeaveDto {
    @ApiProperty({
        required: true,
        description: '须审批的单号id'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        required: true,
        description: '审核状态'
    })
    @IsNotEmpty()
    @IsNumber()
    @IsIn([1, 2])
    statusLevel: number

    @ApiProperty({
        required: true,
        description: '审批的单号类型'
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(["1", "2", "3"])
    type: string

    @ApiProperty({
        required: false,
        description: '审批人'
    })
    approverId: string

    @ApiProperty({
        required: false,
        description: '备注'
    })
    remark: string
}

export class UpdateLeaveManyDto {
    @ApiProperty({
        required: true,
        description: '审批的单号id'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        required: true,
        description: '审核状态'
    })
    @IsNotEmpty()
    @IsNumber()
    @IsIn([0, 1])
    statusLevel: number

    @ApiProperty({
        required: true,
        description: '审批的单号类型'
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(["1", "2", "3"])
    type: string
}