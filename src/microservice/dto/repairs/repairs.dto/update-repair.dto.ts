import { ApiProperty } from '@nestjs/swagger';
import { CreateRepairDto } from './create-repair.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRepairDto extends CreateRepairDto {
    @ApiProperty({
        required: true,
        description: '修改工单id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    repairsId: string
}
