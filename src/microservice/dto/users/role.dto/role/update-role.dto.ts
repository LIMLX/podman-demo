import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto extends CreateRoleDto {
    @ApiProperty({
        required: true,
        description: '角色id'
    })

    @IsNotEmpty()
    @IsString()
    roleId: string
}
