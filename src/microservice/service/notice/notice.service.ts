import { Inject, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { map, pipe } from "rxjs";
import { CreateNoticeDto, LikeNoticeDto, RecordNotice } from "src/microservice/dto";


export class NoticeService {
    constructor(
        private readonly config: ConfigService,
        @Inject("NOTICE_SERVICE") private readonly noticeService: ClientProxy
    ){}

    // 所有查询
    async getAll() {
        const pattern = { cmd: "notice_getAll" };
        const payload = {}

        const data = this.noticeService
        .send<any>(pattern,payload)
        .pipe(map((massage: string) => {
            return massage
        })
        )
        return data
    }

    // 单个查询
    async getOne(id: number) {
        const pattern = { cmd: "notice_getOne" };
        const payload = {id:id}

        const data = this.noticeService
        .send<any>(pattern,payload)
        .pipe(map((massage: string) => {
            return massage
        })
        )

        return data
    }

    // 创建
    async createNotice(createNoticeDto: CreateNoticeDto) {
        const pattern = { cmd: "notice_create" };
        const payload = createNoticeDto
        
        const status = this.noticeService
        .send<any>(pattern,payload)
        .pipe(map((massage: string) => {
            return massage
        })
        )
        return status
    }

    // 记录
    async record(recordNotice: RecordNotice) {
        const pattern = { cmd: "notice_record" };

        const payload = recordNotice

        const data = this.noticeService
        .send<any>(pattern,payload)
        .pipe(map((massage: any) => {
            return massage
        })
        ) 
        return data
    }

    // 修改通知
    async updateNotice (createNoticeDto: CreateNoticeDto) {
        const pattern = { cmd: "notice_update" };
        const payload = createNoticeDto

        const status = this.noticeService
        .send<any>(pattern,payload)
        .pipe(map((massage: string) => {
            return massage
        })
        )
        return status
    }

    async likeNotice(likeNoticeDto: LikeNoticeDto) {
        const pattern = { cmd: "notice_like" };
        const payload = likeNoticeDto

        const status = this.noticeService
        .send<any>(pattern,payload)
        .pipe(map((massage: string) => {
            return massage
        })
        )

        return status
    }
}