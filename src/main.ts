import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptor';
import { HttpFilter } from './interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 引入config配置文件
  const configService = app.get(ConfigService);

  // 获取当前环境
  const envPath = process.env.NODE_ENV || 'development';

  if(envPath === 'production') {
    console.log('开发环境')
  } else {
    console.log('生产环境')
  }

  // 注册全局效验器
  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(new LoggerInterceptor())
  app.useGlobalFilters(new HttpFilter())
  
  await app.listen(configService.get('port'), () => {
    console.log(`正在监听 ${configService.get('port')}`)
  });
}
bootstrap();
