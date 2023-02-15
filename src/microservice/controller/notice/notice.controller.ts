import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateNoticeDto, LikeNoticeDto } from "src/microservice/dto";
import { RecordNotice } from "src/microservice/dto/notice/dto/record-notice.dto";
import { NoticeService } from "src/microservice/service";

@Controller("notice")
export class NoticeController {
    constructor(private readonly noticeService: NoticeService){}

    @Get()
    async getAll() {
        return this.noticeService.getAll()
    }

    @Get('/id=:id')
    async getOne(@Param('id') id: number) {
        return this.noticeService.getOne(id)
    }

    @Post('/record')
    remove(@Body() recordNotice: RecordNotice ) {
        return this.noticeService.record(recordNotice)
    }

    @Post('/create')
    async createNotice(@Body() createNoticeDto: CreateNoticeDto) {
        return this.noticeService.createNotice(createNoticeDto)
    }

    @Post('/update')
    async updateNotice(@Body() createNoticeDto: CreateNoticeDto) {
        return this.noticeService.updateNotice(createNoticeDto)
    }

    @Post('/like')
    async likeNotice(@Body() likeNoticeDto: LikeNoticeDto) {
        return this.noticeService.likeNotice(likeNoticeDto)
    }
}