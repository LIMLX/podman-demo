import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 引入config配置文件
  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new LoggerInterceptor())
  
  await app.listen(configService.get('port'), () => {
    console.log(`正在监听 ${configService.get('port')}`)
  });
}
bootstrap();
