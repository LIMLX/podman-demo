import { IsNotEmpty, IsString } from 'class-validator';
import { CreateOperationDto } from './create-operation.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOperationDto extends CreateOperationDto {
    @ApiProperty({
        required: true,
        description:'操作权限id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    operationId: string
}
