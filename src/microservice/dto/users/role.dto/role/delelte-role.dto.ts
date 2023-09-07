import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeleteRoleDto {
    @ApiProperty({
        required: true,
        description: '角色id'
    })
    @IsNotEmpty()
    @IsString()
    roleId: string

    @ApiProperty({
        required: true,
        description: '角色身份'
    })
    @IsNotEmpty()
    @IsNumber()
    roleIdentity: number
}