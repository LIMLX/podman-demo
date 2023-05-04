import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { User } from 'src/common';
import { CreateClockDto } from 'src/microservice/dto/epi';
import { EpiClockService } from 'src/microservice/service/epi';

@Controller('epi/clock')
export class EpiClockController {
    constructor(private readonly clockService: EpiClockService) { }

    // 进行打卡
    @Post("clockIn")
    async clockIn(@Body() createClockDto: CreateClockDto, @User('id') userId: string) {
        if (!userId || userId === "abnormal") {
            return "abnormal"
        }
        return await this.clockService.clockIn(createClockDto)
    }

    // 返回打卡记录(个人)
    @Get('findClock/time=:time')
    async findClock(@Param("time") time: string, @User('id') userId: string) {
        if (!userId || userId === "abnormal") {
            return "abnormal"
        }
        return await this.clockService.findClock(userId, time)
    }

    // 打卡时显示的多选框(类型)
    @Get('findType')
    async findType() {
        return await this.clockService.findType()
    }
}
