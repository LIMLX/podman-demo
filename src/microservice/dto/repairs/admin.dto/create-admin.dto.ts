import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty, IsString, Length } from "class-validator"

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

export class CreateMtrDto {
    adminId: string
    adminName: string
    @ApiProperty({
        required: true,
        description: '维修工工号'
    })
    @IsNotEmpty()
    @IsString()
    mtrNum: string

    @ApiProperty({
        required: true,
        description: '维修工名称'
    })
    @IsNotEmpty()
    @IsString()
    mtrName: string

    @ApiProperty({
        required: true,
        description: '维修工电话'
    })
    @IsNotEmpty()
    @IsString()
    @Length(10, 11)
    mtrPhone: string

    @ApiProperty({
        required: false,
        description: '维修工密码'
    })
    mtrPsw: string

    @ApiProperty({
        required: true,
        description: '维修工状态'
    })
    @IsNotEmpty()
    @IsIn([0, 1, undefined])
    mtrStatus: number

    buildAuth: string[]
    typeAuth: string[]
}

export class CreateTypeDto {
    adminId: string
    adminName: string

    @ApiProperty({
        required: true,
        description: '状态名称'
    })
    @IsNotEmpty()
    @IsString()
    typeName: string

    @ApiProperty({
        required: true,
        description: '状态等级'
    })
    @IsNotEmpty()
    @IsInt()
    typeLevel: number

    @ApiProperty({
        required: true,
        description: '状态颜色'
    })
    @IsNotEmpty()
    @IsString()
    typeColour: string

    @ApiProperty({
        required: true,
        description: '状态状态'
    })
    @IsNotEmpty()
    @IsIn([0, 1, undefined])
    typeStatus: number
}