import { ApiProperty } from '@nestjs/swagger';
import { CreateManagerDto } from './create-manager.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateManagerDto extends CreateManagerDto {
    @ApiProperty({
        required: true,
        description: '楼栋管理员id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    managerId: string
}
