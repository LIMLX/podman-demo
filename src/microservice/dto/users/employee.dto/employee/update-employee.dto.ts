import { ApiProperty } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeDto extends CreateEmployeeDto {
    @ApiProperty({
        required: true,
        description: '职工id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    employeeId: string
}

export class UpdateEmployeePswDto {
    @ApiProperty({
        required: true,
        description: '职工id'
    })
    employeeId: string

    @ApiProperty({
        required: true,
        description: '职工密码'
    })
    @IsNotEmpty()
    @IsString()
    password: string
}