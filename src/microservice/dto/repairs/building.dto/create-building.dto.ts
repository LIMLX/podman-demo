import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateBuildingDto {
    @ApiProperty({
        required: true,
        description: '楼栋代码'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    buildingNum: string


    @ApiProperty({
        required: true,
        description: '楼栋名称'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    buildingName: string


    @ApiProperty({
        required: true,
        description: '楼栋等级'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "leve应为数字"
    })
    buildingLevel: number
}
