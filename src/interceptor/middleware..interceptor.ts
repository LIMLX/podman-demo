import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export default class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    // 获取请求信息
    const {
      query,
      headers: { host },
      url,
      method,
      body,
    } = req;
    
    next();
  }
}

