import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs';
import {Request,Response} from 'express'

@Injectable()
export class ResponseInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse<Response>();
        
        return next
        .handle()
        .pipe(
            map(
                (data) => {
                    // 日志

                    let message : any

                    if (!data) {
                        data = "0"
                    }

                    if (data.message) {
                        message = data.message
                    } else {
                        message = data
                    }
                    
                    // 捕获操作异常，导致报错401
                    if (data.message === "abnormal") {
                        response.status(401)
                        return {
                            success:true,
                            message: message,
                            code : response.statusCode
                        }
                    }

                    // 捕获操作异常，导致报错401
                    if (data === "abnormal") {
                        response.status(401)
                        return {
                            success:true,
                            message: message,
                            code : response.statusCode
                        }
                    }

                    // 状态码在 200 到 299 之间，则表示操作成功
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        return {
                            success:true,
                            message: message,
                            code : response.statusCode
                        }
                    } else {
                        return {
                            success:false,
                            message: message,
                            code : response.statusCode
                        }
                    }

                }
            )
        )
    }
}