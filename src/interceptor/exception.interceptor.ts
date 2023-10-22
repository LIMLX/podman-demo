import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, UnauthorizedException, NotFoundException, ServiceUnavailableException, ForbiddenException, Inject } from '@nestjs/common'
import { Request, Response } from 'express'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()              // 获取当前执行上下文
        const request = ctx.getRequest<Request>()    // 获取请求对象
        const response = ctx.getResponse<Response>() // 获取响应对象
        const status = exception.getStatus()         // 获取状态码
        // 记录日志
        // 处理管道异常---参数问题
        if (exception instanceof BadRequestException) {
            response.status(status).json({
                massage: '输入验证、请求参数错误',
                success: false,
                code: status
            })
            // 身份验证
        } else if (exception instanceof UnauthorizedException) {
            response.status(status).json({
                massage: `身份验证错误`,
                success: false,
                code: status
            })
            // 访问接口拦截
        } else if (exception instanceof NotFoundException) {
            // 返回拦截的异常
            response.status(status).json({
                massage: "访问接口为空",
                success: false,
                code: status
            })
            // 微服务问题
        } else if (exception instanceof ServiceUnavailableException) {
            // 返回拦截的异常
            response.status(status).json({
                massage: "服务暂时无法使用",
                success: false,
                code: status
            })
        } else if (exception instanceof ForbiddenException) {
            // 返回拦截的异常
            response.status(status).json({
                massage: "权限验证错误",
                success: false,
                code: status
            })
        } else {
            // 返回拦截的异常
            response.status(status).json({
                massage: exception.getResponse(),
                success: false,
                code: status
            })
        }
    }
}