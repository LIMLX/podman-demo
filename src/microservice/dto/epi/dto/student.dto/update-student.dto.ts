import { ApiProperty } from '@nestjs/swagger';
import { CreateReportDto } from './create-student.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReportDto extends CreateReportDto {
    @ApiProperty({
        required: true,
        description: '报备单id'
    })
    @IsNotEmpty()
    @IsString()
    reportId: string

    @ApiProperty({
        required: true,
        description: '新建文件'
    })
    createFile: {
        fileSite: string
    }[]
}
