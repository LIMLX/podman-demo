import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto extends CreateRoleDto {
    @ApiProperty({
        required: true,
        description: '角色id'
    })

    @IsNotEmpty()
    @IsString()
    roleId: string
}

export class UpdateAdminUserDto {
    @ApiProperty({
        required: true,
        description: '模块id'
    })

    @IsNotEmpty()
    @IsString()
    moduleId: string

    @ApiProperty({
        required: true,
        description: '授权等级'
    })

    @IsNotEmpty()
    @IsInt()
    moduleLevel: number

    @ApiProperty({
        required: true,
        description: '用户id'
    })

    @IsNotEmpty()
    @IsString()
    userId: string

    @ApiProperty({
        required: true,
        description: '效验码'
    })

    @IsNotEmpty()
    @IsString()
    authCode: string
}