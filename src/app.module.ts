import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import baseConfig from 'config/base';
import { AuthModule } from './auth/auth.module';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTDATA } from './common/encryptions';
import { SmsCodeService } from './microservice/service/sms';
import { NoticeController, NoticeFileController, SmsCodeController } from './microservice/controller';
import { NoticeFileService, NoticeService } from './microservice/service/notice';
import { 
  UserEmployeeController, UserStudentController, UsersModuleController,
  UsersOperationController, UsersOrganizationController, UsersRoleController 
} from './microservice/controller/users';
import { 
  UserEmployeeService, UserStudentService, UsersModuleService,
  UsersOperationService, UsersOrganizationService, UsersRoleService 
} from './microservice/service/users';
import { LeaveDivisionService, LeaveEmployeeService, LeaveFileService, LeaveStudentService, LeaveTypeService } from './microservice';
import { LeaveDivisionController, LeaveEmployeeController, LeaveFileController, LeaveStudentController, LeaveTypeController } from './microservice/controller/leave';

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

    UsersModuleController,
    UsersRoleController,
    UsersOperationController,
    UsersOrganizationController,
    UserStudentController,
    UserEmployeeController,

    NoticeController,
    NoticeFileController,

    LeaveDivisionController,
    LeaveEmployeeController,
    LeaveStudentController,
    LeaveFileController,
    LeaveTypeController
  ],

  providers: [
    JWTDATA,
    SmsCodeService,

    UserEmployeeService,
    UserStudentService,
    UsersModuleService,
    UsersOperationService,
    UsersRoleService,
    UsersOrganizationService,

    NoticeService,
    NoticeFileService,

    LeaveDivisionService,
    LeaveEmployeeService,
    LeaveStudentService,
    LeaveFileService,
    LeaveTypeService,
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
    },
    {
      provide: 'LEAVE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('leaveService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    }
  ],
})
export class AppModule {}
