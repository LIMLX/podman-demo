import { CACHE_MANAGER, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { NextFunction } from "express";
import { Observable } from "rxjs";
import { Request } from 'express';

/*
  负责检查服务是否属于
  健康状态。在某个服务
  需要进行更新或者维护
  时，可以提前拦截http
  请求
*/

// repairsSerivce(报修)服务
@Injectable()
export class MsRepairsHealth implements NestInterceptor {
    constructor(
        @Inject("REPAIRS_SERVICE") private readonly repairsService: ClientProxy
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        return next.handle();
    }

    // 请求和响应周期
    async use(req: Request, res: Response, next: NextFunction) {
        // 检测微服务状态
        try {
            await this.repairsService.connect();
        } catch (error) {
            throw new ServiceUnavailableException();
        }
        // 放行
        return next();
    }
}

// leaveService(请假)服务
@Injectable()
export class MsLeaveHealth implements NestInterceptor {
    constructor(
        @Inject("LEAVE_SERVICE") private readonly leaveService: ClientProxy
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        // 放行
        return next.handle();
    }

    // 请求和响应周期
    async use(req: Request, res: Response, next: NextFunction) {
        // 检测微服务状态
        try {
            await this.leaveService.connect();
        } catch (error) {
            throw new ServiceUnavailableException();
        }
        return next();
    }
}

// smsService(短信)服务
@Injectable()
export class MsSmsHealth implements NestInterceptor {
    constructor(
        @Inject("SMS_SERVICE") private readonly smsService: ClientProxy,
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        // 放行
        return next.handle();
    }

    // 请求和响应周期
    async use(req: Request, res: Response, next: NextFunction) {
        // 检测微服务状态
        try {
            await this.smsService.connect();
        } catch (error) {
            throw new ServiceUnavailableException();
        }

        // 放行
        return next();
    }
}

// users(用户)服务
@Injectable()
export class MsUserHealth implements NestInterceptor {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        // 放行
        return next.handle();
    }

    // 请求和响应周期
    async use(req: Request, res: Response, next: NextFunction) {
        // 检测微服务状态
        try {
            await this.userService.connect();
        } catch (error) {
            throw new ServiceUnavailableException();
        }
        // 放行
        return next();
    }
}

// epi(打卡)服务
@Injectable()
export class MsEpiHealth implements NestInterceptor {
    constructor(
        @Inject("EPI_SERVICE") private readonly epiService: ClientProxy
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        // 放行
        return next.handle();
    }

    // 请求和响应周期
    async use(req: Request, res: Response, next: NextFunction) {
        // 检测微服务状态
        try {
            await this.epiService.connect();
        } catch (error) {
            throw new ServiceUnavailableException();
        }
        // 放行
        return next();
    }
}

// history(党史)服务
@Injectable()
export class MsHistoryHealth implements NestInterceptor {
    constructor(
        @Inject("HISTORY_SERVICE") private readonly epiService: ClientProxy
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        // 放行
        return next.handle();
    }

    // 请求和响应周期
    async use(req: Request, res: Response, next: NextFunction) {
        // 检测微服务状态
        try {
            await this.epiService.connect();
        } catch (error) {
            throw new ServiceUnavailableException();
        }
        // 放行
        return next();
    }
}

// notice(通知)服务
@Injectable()
export class MsNoticeHealth implements NestInterceptor {
    constructor(
        @Inject("NOTICE_SERVICE") private readonly epiService: ClientProxy
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        // 放行
        return next.handle();
    }

    // 请求和响应周期
    async use(req: Request, res: Response, next: NextFunction) {
        // 检测微服务状态
        try {
            await this.epiService.connect();
        } catch (error) {
            throw new ServiceUnavailableException();
        }
        // 放行
        return next();
    }
}

// incorruptibility(爱廉说)服务
@Injectable()
export class MsIncorruptibilityHealth implements NestInterceptor {
    constructor(
        @Inject("INCORRUPTIBILITY_SERVICE") private readonly incorruptibilityService: ClientProxy
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        // 放行
        return next.handle();
    }

    // 请求和响应周期
    async use(req: Request, res: Response, next: NextFunction) {
        // 检测微服务状态
        try {
            await this.incorruptibilityService.connect();
        } catch (error) {
            throw new ServiceUnavailableException();
        }
        // 放行
        return next();
    }
}