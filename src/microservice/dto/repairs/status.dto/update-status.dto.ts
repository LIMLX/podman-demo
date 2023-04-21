import { ApiProperty } from '@nestjs/swagger';
import { CreateStatusDto } from './create-status.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStatusDto extends CreateStatusDto {
    @ApiProperty({
        required: true,
        description: '状态id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    statusId: string
}
