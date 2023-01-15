import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import baseConfig from 'config/base';
import { AuthModule } from './auth/auth.module';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { ConfigService } from '@nestjs/config';
import { UserController } from './microservice/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load: [baseConfig]
    }),
    AuthModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('userService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService],
    }
  ],
})
export class AppModule {}
