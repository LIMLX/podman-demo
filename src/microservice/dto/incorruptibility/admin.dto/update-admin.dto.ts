import { ApiProperty } from '@nestjs/swagger';
import { CreateAdminDto, CreateSloganDto } from './create-admin.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminDto extends CreateAdminDto { }

export class UpdateSloganDto extends CreateSloganDto {
    @ApiProperty({
        required: true,
        description: '标语id'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        required: true,
        description: '标语原内容地址'
    })
    @IsNotEmpty()
    @IsString()
    contentPath: string
}

export class PublisSloganDto {
    @ApiProperty({
        required: true,
        description: '标语id'
    })
    @IsNotEmpty()
    sloganId: string[]
    adminId: string
    adminName: string
}

export class DeleteSloganDto {
    @ApiProperty({
        required: true,
        description: '标语id'
    })
    @IsNotEmpty()
    sloganId: string[]
    adminId: string
    adminName: string
}