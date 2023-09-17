import { ApiProperty } from "@nestjs/swagger";
import { CreateRepairsDto } from "./create-user.dto";
import { IsNotEmpty, IsString } from "class-validator";


export class UpdateRepairsDto extends CreateRepairsDto {
    @ApiProperty({
        required: true,
        description: '电话号码'
    })
    @IsNotEmpty()
    @IsString()
    repairsId: string

    createFile: {
        file_site: string
        file_type: string
    }[]
}
