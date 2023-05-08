import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { RepairsAdminController, RepairsAutoDispatchController, RepairsBuildingController, RepairsFileController, RepairsMaintainerController, RepairsManagerController, RepairsRepairsController, RepairsStatusController, RepairsTypeController } from './microservice/controller/repairs';
import { RepairsAdminService, RepairsAutoDispatchService, RepairsBuildingService, RepairsFileService, RepairsMaintainerService, RepairsManagerService, RepairsRepairsService, RepairsStatusService, RepairsTypeService } from './microservice/service/repairs';
import { MsEpiHealth, MsLeaveHealth, MsRepairsHealth, MsSmsHealth, MsUserHealth, httpBlacklist } from './common';
import { EpiEmployeeController, EpiClockTypeController, EpiClockController } from './microservice/controller/epi';
import { EpiClockService, EpiClockTypeService, EpiEmployeeService } from './microservice/service/epi';

@Module({
  imports: [
    PassportModule,
    CacheModule.register(),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt').KEY,
        signOptions: { expiresIn: config.get('jwt').TIME }
      }),
      inject: [ConfigService]
    }),

    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
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
    LeaveTypeController,

    RepairsFileController,
    RepairsAutoDispatchController,
    RepairsTypeController,
    RepairsStatusController,
    RepairsManagerController,
    RepairsRepairsController,
    RepairsBuildingController,
    RepairsMaintainerController,
    RepairsAdminController,

    EpiClockController,
    EpiClockTypeController,
    EpiEmployeeController
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

    RepairsFileService,
    RepairsAutoDispatchService,
    RepairsTypeService,
    RepairsStatusService,
    RepairsManagerService,
    RepairsRepairsService,
    RepairsBuildingService,
    RepairsMaintainerService,
    RepairsAdminService,

    EpiClockService,
    EpiEmployeeService,
    EpiClockTypeService,
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
    },
    {
      provide: 'REPAIRS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('repairsService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    {
      provide: 'EPI_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('epiService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    }
  ],
})
// 请求拦截器
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MsLeaveHealth).forRoutes({ path: 'leave/*', method: RequestMethod.ALL }),
      consumer.apply(MsRepairsHealth).forRoutes({ path: 'repairs/*', method: RequestMethod.ALL }),
      consumer.apply(MsSmsHealth).forRoutes({ path: 'sms/*', method: RequestMethod.ALL }),
      consumer.apply(MsUserHealth).forRoutes({ path: 'users/*', method: RequestMethod.ALL }),
      consumer.apply(MsEpiHealth).forRoutes({ path: 'epi/*', method: RequestMethod.ALL })

    // 黑名单拦截
    consumer.apply(httpBlacklist).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
