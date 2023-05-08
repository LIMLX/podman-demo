import { ApiProperty } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminDto extends CreateAdminDto {
}

export class UpdateET {
    @ApiProperty({
        required: true,
        description: '维修单id'
    })

    @IsNotEmpty({
        message: "id为空"
    })
    @IsString({
        message: "id格式错误"
    })
    repairsId: string
    repairsUUID: string


    @ApiProperty({
        required: true,
        description: '预计完成时间'
    })

    @IsNotEmpty({
        message: "ET为空"
    })
    @IsString({
        message: "ET格式错误"
    })
    ET: string
}