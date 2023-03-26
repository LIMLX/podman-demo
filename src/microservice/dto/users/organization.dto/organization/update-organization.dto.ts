import { ApiProperty } from '@nestjs/swagger';
import { CreateCampusDto, CreateClassDto, CreateDepartmentDto, CreateSchoolDto } from './create-organization.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassDto extends CreateClassDto {
    @ApiProperty({
        required: true,
        description:'班级id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    classId: string
}

export class UpdateCampusDto extends CreateCampusDto {
    @ApiProperty({
        required: true,
        description:'院校id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    campusId: string
}

export class UpdateDepartmentDto extends CreateDepartmentDto {
    @ApiProperty({
        required: true,
        description:'部门id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    departmentId: string
}

export class UpdateSchoolDto extends CreateSchoolDto {
    @ApiProperty({
        required: true,
        description:'学校id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    schoolId: string
}

export class UpdateClassTeacherDto {
    @ApiProperty({
        required: true,
        description:'班级id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    classId: string


    @ApiProperty({
        required: true,
        description:'班主任id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    teacherId: string
}

export class UpdateClassAssistantDto {
    @ApiProperty({
        required: true,
        description:'班级id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    classId: string


    @ApiProperty({
        required: true,
        description:'辅导员id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    assistanId: string
}