import { ApiProperty } from '@nestjs/swagger';
import { CreateBuildingDto } from './create-building.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBuildingDto extends CreateBuildingDto {
    @ApiProperty({
        required: true,
        description: '楼栋id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    buildingId: string
}
