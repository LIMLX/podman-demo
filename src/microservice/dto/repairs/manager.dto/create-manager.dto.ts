import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateManagerDto {
    @ApiProperty({
        required: true,
        description: '楼栋管理员工号'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    managerNum: string


    @ApiProperty({
        required: true,
        description: '楼栋管理员名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    managerName: string


    @ApiProperty({
        required: true,
        description: '楼栋管理员联系电话'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    managerPhone: string
}

export class AuthBuildingDto {
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


    @ApiProperty({
        required: true,
        description: '楼栋管理员id'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    managerId: string
}