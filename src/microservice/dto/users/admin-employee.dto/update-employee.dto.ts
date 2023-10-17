import { ApiProperty } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateEmployeeDto extends CreateEmployeeDto {
    @ApiProperty({
        required: true,
        description: '职工Id'
    })
    @IsNotEmpty()
    @IsString()
    employeeId: string
}

export class UpdateEmployeePswDto {
    @ApiProperty({
        required: true,
        description: '职工Id'
    })
    @IsNotEmpty()
    @IsString()
    employeeId: string

    @ApiProperty({
        required: true,
        description: '修改密码'
    })
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    password: string
}