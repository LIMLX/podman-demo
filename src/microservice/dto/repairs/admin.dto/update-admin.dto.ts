import { ApiProperty } from '@nestjs/swagger';
import { CreateBuildingDto, CreateManagerDto, CreateMtrDto, CreateTypeDto } from './create-admin.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBuildingDto extends CreateBuildingDto {
    @ApiProperty({
        required: true,
        description: '楼栋id'
    })

    @IsNotEmpty()
    @IsString()
    buildingId: string
}

export class UpdateManagerDto extends CreateManagerDto {
    @ApiProperty({
        required: true,
        description: '楼栋管理员id'
    })

    @IsNotEmpty()
    @IsString()
    managerId: string
}

export class DispatchDto {
    @ApiProperty({
        required: true,
        description: '维修单id'
    })

    @IsNotEmpty()
    @IsString()
    repairId: string

    @ApiProperty({
        required: true,
        description: '派单对象id'
    })

    @IsNotEmpty()
    @IsString()
    mtrId: string

    @ApiProperty({
        required: true,
        description: '预计时间'
    })
    @IsNotEmpty()
    etTime: Date
    adminId: string
    adminName: string
}

export class UpdateMtrDto extends CreateMtrDto {
    @ApiProperty({
        required: true,
        description: '维修工id'
    })
    @IsNotEmpty()
    @IsString()
    mtrId: string
}

export class UpdateTypeDto extends CreateTypeDto {
    @ApiProperty({
        required: true,
        description: '类型id'
    })
    @IsNotEmpty()
    @IsString()
    typeId: string
}