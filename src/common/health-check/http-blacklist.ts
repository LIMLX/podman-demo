import { CACHE_MANAGER, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, Req, ServiceUnavailableException } from "@nestjs/common";
import { NextFunction } from "express";
import { Observable } from "rxjs";
import { readFile, appendFile } from 'fs'
import { join } from "path";
import { Request } from 'express';
import { ConfigService } from "@nestjs/config";
import { Cache } from 'cache-manager'


/*
  用于拦截恶意攻击的ip(短时间内多次请求访问)
*/

@Injectable()
export class httpBlacklist implements NestInterceptor {
    constructor(
        private readonly configService: ConfigService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        // 放行
        return next.handle();
    }

    // 请求和响应周期
    async use(req: Request, res: Response, next: NextFunction) {
        const { time, max, fileName, key } = this.configService.get('blackList');
        console.log(req.ip);
        // 查询黑名单是否存在于缓存中
        let blackList: any[] = await this.cacheManager.get(key);
        // 当不存在，或者说缓存key为空时，进行黑名单文件读取
        if (!blackList) {
            const filePart = join(__dirname, '../../../../', `${fileName}`);
            readFile(filePart, (async (error, data) => {
                if (!error) {
                    const dataString = data.toString();
                    const ip = dataString.split('-');
                    // 存入到缓存中
                    await this.cacheManager.set(key, ip || [], 0);
                    // 存入到变量内
                    blackList = ip;
                }
            }))
        }
        // 黑名单拦截
        if (blackList && blackList.includes(req.ip)) {
            throw new ServiceUnavailableException();
        }
        // 进行ip访问记录
        if (!await this.cacheManager.get(req.ip)) {
            await this.cacheManager.set(req.ip, { "data": 1, "time": new Date().getTime() / 1000 }, +time);
        } else {
            // 获取ip访问次数然后存入
            const ipSum: { "data": number, "time": any } = await this.cacheManager.get(req.ip);
            // 获取当前时间戳
            const dateTime = new Date().getTime() / 1000;
            // 观察是否达到过期时间
            // 当达到预计过期时间后，清除此缓存
            if (dateTime - ipSum.time >= +time / 1000) {
                await this.cacheManager.del(req.ip);
            }
            // 将其访问次数+1，同时设置过期时间
            await this.cacheManager.set(req.ip, { "data": +ipSum.data + 1, "time": ipSum.time }, +time);
            // 判断访问次数是否达到上限
            if (ipSum.data >= +max) {
                // 放入黑名单(缓存)
                blackList.push(req.ip);
                await this.cacheManager.set(key, blackList, 0);
                //方便存入到文件中，进行持久化处理
                const filePart = join(__dirname, '../../../../', `${fileName}`);
                appendFile(filePart, `-${req.ip}`, (err) => {
                    if (err) throw err;
                    console.log('黑名单追加成功');
                })
            }
        }
        // 放行
        return next();
    }
}