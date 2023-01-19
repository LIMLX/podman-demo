import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import baseConfig from 'config/base';
import { AuthModule } from './auth/auth.module';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UserController,SmsController, SmsService, UsersService } from './microservice';
import { JwtModule } from '@nestjs/jwt';
import { JWTDATA } from './common/encryptions';

@Module({
  imports: [
    PassportModule,

    JwtModule.registerAsync({
      useFactory:(config:ConfigService) => ({
        secret: config.get('jwt').KEY,
        signOptions: {expiresIn: config.get('jwt').TIME}
      }),
      inject: [ConfigService]
    }),

    ConfigModule.forRoot({
      envFilePath:['.env'], 
      isGlobal:true,
      load: [baseConfig]
    }),
    AuthModule
  ],

  controllers: [UserController,SmsController],

  providers: [
    JWTDATA,
    SmsService,
    UsersService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('userService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    {
      provide: 'SMS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('smsService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    }
  ],
})
export class AppModule {}
