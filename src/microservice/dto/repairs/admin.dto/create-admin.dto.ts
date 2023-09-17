import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateBuildingDto {
    @ApiProperty({
        required: true,
        description: '楼栋名称'
    })

    @IsNotEmpty()
    @IsString()
    buildingName: string

    @ApiProperty({
        required: true,
        description: '楼栋等级---0为其它，1为学生宿舍，2为教职工宿舍，3位教学设施，4为文娱设施'
    })

    @IsNotEmpty()
    @IsInt()
    buildingLevel: number

    @ApiProperty({
        required: true,
        description: '是否启用 (0为未启用,1为启用)'
    })

    @IsNotEmpty()
    @IsIn([0, 1])
    @IsInt()
    buildingStatus: number


    adminId: string
    adminName: string
}

export class CreateManagerDto {
    @ApiProperty({
        required: true,
        description: '楼栋管理员工号'
    })

    @IsNotEmpty()
    @IsString()
    managerNum: string

    @ApiProperty({
        required: true,
        description: '楼栋管理员名称'
    })

    @IsNotEmpty()
    @IsString()
    managerName: string

    @ApiProperty({
        required: true,
        description: '楼栋管理员电话'
    })

    @IsNotEmpty()
    @IsString()
    managerPhone: string

    @ApiProperty({
        required: true,
        description: '楼栋管理员是否启用(1在职,0撤职)'
    })

    @IsNotEmpty()
    @IsIn([0, 1])
    @IsInt()
    managerStatus: number
    buildAuth: string[]

    adminId: string
    adminName: string
}