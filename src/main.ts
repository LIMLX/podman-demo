import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptor';
import { HttpFilter } from './interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 引入config配置文件
  const configService = app.get(ConfigService);

  // 获取当前环境
  const envPath = process.env.NODE_ENV || 'development';

  // 判断环境，是否开启swagger
  if (envPath === 'production') {
    console.log('开发环境')
    const options = new DocumentBuilder().addBearerAuth().setTitle('校本化开发文档').
      setDescription('测试阶段API').setVersion('1.0').build()
    const doc = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('/api/swagger', app, doc)
  } else {
    console.log('生产环境')
  }

  // 注册全局效验器
  app.useGlobalPipes(new ValidationPipe())

  // 响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())
  // 异常过滤器
  app.useGlobalFilters(new HttpFilter())

  app.enableCors(); // 启用 CORS
  await app.listen(configService.get('port'), () => {
    console.log(`正在监听 ${configService.get('port')}`)
  });
}
bootstrap();
