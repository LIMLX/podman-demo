import { ApiProperty } from '@nestjs/swagger';
import { CreateNoticeDto } from './create-notice.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoticeDto extends CreateNoticeDto{

    @ApiProperty({
        required: true,
        description:'通知内容'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt({
        message: "应为整型"
    })
    noticeId: number

    
    @ApiProperty({
        required: true,
        description:'通知内容'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsString({
        message: "应为字符串"
    })
    noticeUUid: string
}
