import { ExceptionFilter, Catch, ArgumentsHost,HttpException } from '@nestjs/common'
import {Request,Response} from 'express'
 
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
    catch(exception:HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()              // 获取当前执行上下文
        const request = ctx.getRequest<Request>()    // 获取请求对象
        const response = ctx.getResponse<Response>() // 获取响应对象
 
        const status = exception.getStatus()         // 获取状态码
 
        // 记录日志

        // 返回拦截的异常
        response.status(status).json({
           massage:exception.getResponse(),
           success:false,
           code: status
        })
    }
}