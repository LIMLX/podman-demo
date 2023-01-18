import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptor';
import { HttpFilter } from './interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 引入config配置文件
  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new LoggerInterceptor())
  app.useGlobalFilters(new HttpFilter())
  
  await app.listen(configService.get('port'), () => {
    console.log(`正在监听 ${configService.get('port')}`)
  });
}
bootstrap();
