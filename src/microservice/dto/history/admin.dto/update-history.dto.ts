import { ApiProperty } from '@nestjs/swagger';
import { CreateHistoryDto, CreatePersonagDto, CreateSiteDto } from './create-history.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateHistoryDto extends CreateHistoryDto {
    @ApiProperty({
        required: true,
        description: '文章id'
    })
    @IsNotEmpty()
    @IsString()
    id: string


    @ApiProperty({
        required: true,
        description: '文章内容地址'
    })
    @IsNotEmpty()
    @IsString()
    contentPath: string

    releaseTime: Date
}

export class UpdatePersonagDto extends CreatePersonagDto {
    @ApiProperty({
        required: true,
        description: '人物id'
    })
    @IsNotEmpty()
    @IsString()
    id: string


    @ApiProperty({
        required: true,
        description: '人物内容地址'
    })
    @IsNotEmpty()
    @IsString()
    contentPath: string

    releaseTime: Date
}

export class UpdateSiteDto extends CreateSiteDto {
    @ApiProperty({
        required: true,
        description: '地点id'
    })
    @IsNotEmpty()
    @IsString()
    id: string


    @ApiProperty({
        required: true,
        description: '地点内容地址'
    })
    @IsNotEmpty()
    @IsString()
    contentPath: string

    delFile?: string[]
}
