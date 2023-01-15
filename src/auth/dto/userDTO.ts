import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class UserDTO {

    @ApiProperty({
        required: true,
        description:'用户名'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    @Length(5,10,{
        message:'长度为5-10'
    })
    username : string


    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    @Length(5,15,{
        message:'长度为5-15'
    })
    @ApiProperty({
        required: true,
        description:'用户密码'
    })
    @IsNotEmpty()
    @IsString()
    password : string

    
    @ApiProperty({
        required: true,
        description:'角色'
    })
    @IsNotEmpty()
    @IsString()
    role: string
}