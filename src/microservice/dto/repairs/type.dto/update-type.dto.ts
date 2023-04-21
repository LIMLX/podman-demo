import { ApiProperty } from '@nestjs/swagger';
import { CreateTypeDto } from './create-type.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTypeDto extends CreateTypeDto {
    @ApiProperty({
        required: true,
        description: '类型id'
    })

    @IsNotEmpty({
        message: "类型id不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    typeId: string
}
