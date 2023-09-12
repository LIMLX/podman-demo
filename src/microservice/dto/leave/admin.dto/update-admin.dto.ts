import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator"

export class AuditLeaveDto {
    @ApiProperty({
        required: false,
        description: '请假单id'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        required: false,
        description: '请假单类型type'
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['1', '2', '3'])
    type: string

    @ApiProperty({
        required: false,
        description: '请假单类型type'
    })
    @IsNotEmpty()
    @IsInt()
    @IsIn([1, 2])
    status: number
}

export class DelLeaveDto {
    @ApiProperty({
        required: false,
        description: '请假单id'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        required: false,
        description: '请假单类型type'
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['1', '2', '3'])
    type: string
}

export class DelLeaveBatchDto {
    @ApiProperty({
        required: false,
        description: '请假单id'
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({
        required: false,
        description: '请假单类型type'
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['1', '2', '3'])
    type: string
}