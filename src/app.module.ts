import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import baseConfig from 'config/base';
import { AuthModule } from './auth/auth.module';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTDATA } from './common/encryptions';
import { UserAuthController, UserEmployeeController, UserIdentityController, UserStudentController } from './microservice/controller/users';
import { UserAuthService, UserEmployeeService, UserIdentityService, UserStudentService } from './microservice/service/users';
import { SmsCodeService } from './microservice/service/sms';
import { NoticeController, NoticeFileController, SmsCodeController } from './microservice/controller';
import { NoticeFileService, NoticeService } from './microservice/service/notice';

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

  controllers: [
    SmsCodeController,

    UserAuthController,
    UserStudentController,
    UserEmployeeController,
    UserIdentityController,

    NoticeController,
    NoticeFileController
  ],

  providers: [
    JWTDATA,
    SmsCodeService,

    UserAuthService,
    UserEmployeeService,
    UserIdentityService,
    UserStudentService,

    NoticeService,
    NoticeFileService,
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
    },
    {
      provide: 'NOTICE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('noticeService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    }
  ],
})
export class AppModule {}
