import { ApiProperty } from '@nestjs/swagger';
import { CreateCampusDto, CreateClassDto, CreateDepartmentDto, CreateSchoolDto } from './create-organization.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassDto extends CreateClassDto {
    @ApiProperty({
        required: true,
        description: '班级id'
    })

    @IsNotEmpty()
    @IsString()
    classId: string
}

export class UpdateCampusDto extends CreateCampusDto {
    @ApiProperty({
        required: true,
        description: '院校id'
    })

    @IsNotEmpty()
    @IsString()
    campusId: string
}

export class UpdateDepartmentDto extends CreateDepartmentDto {
    @ApiProperty({
        required: true,
        description: '部门id'
    })

    @IsNotEmpty()
    @IsString()
    departmentId: string
}

export class UpdateSchoolDto extends CreateSchoolDto {
    @ApiProperty({
        required: true,
        description: '学校id'
    })

    @IsNotEmpty()
    @IsString()
    schoolId: string
}