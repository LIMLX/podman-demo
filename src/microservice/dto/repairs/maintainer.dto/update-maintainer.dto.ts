import { ApiProperty } from '@nestjs/swagger';
import { CreateMaintainerDto } from './create-maintainer.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMaintainerDto extends CreateMaintainerDto {
    @ApiProperty({
        required: true,
        description: '工人id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    maintainerId: string
}
