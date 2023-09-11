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
  UserAdminController,
  UserAdminEmployeeController,
  UserController,
  UserEmployeeController, UserStudentController, UsersModuleController,
  UsersOperationController, UsersOrganizationController, UsersRoleController
} from './microservice/controller/users';
import {
  UserAdminEmployeeService,
  UserAdminService,
  UserAdminStudentService,
  UserEmployeeService, UserStudentService, UsersModuleService,
  UsersOperationService, UsersOrganizationService, UsersRoleService, UsersService
} from './microservice/service/users';
import { LeaveAdminService, LeaveDivisionService, LeaveEmployeeService, LeaveFileService, LeaveStudentService, LeaveTypeService } from './microservice';
import { LeaveAdminController, LeaveDivisionController, LeaveEmployeeController, LeaveFileController, LeaveStudentController, LeaveTypeController } from './microservice/controller/leave';
import { RepairsAdminController, RepairsAutoDispatchController, RepairsBuildingController, RepairsFileController, RepairsMaintainerController, RepairsManagerController, RepairsRepairsController, RepairsStatusController, RepairsTypeController } from './microservice/controller/repairs';
import { RepairsAdminService, RepairsAutoDispatchService, RepairsBuildingService, RepairsFileService, RepairsMaintainerService, RepairsManagerService, RepairsRepairsService, RepairsStatusService, RepairsTypeService } from './microservice/service/repairs';
import { MsEpiHealth, MsHistoryHealth, MsLeaveHealth, MsRepairsHealth, MsSmsHealth, MsUserHealth, httpBlacklist } from './common';
import { EpiEmployeeController, EpiClockTypeController, EpiClockController } from './microservice/controller/epi';
import { EpiClockService, EpiClockTypeService, EpiEmployeeService } from './microservice/service/epi';
import { MtrRepairsSocket } from './microservice/socket';
import { UserAdminStudentController } from './microservice/controller/users/admin-student.controller';
import { HistoryAdminController, HistoryDivisionController, HistoryFileController, HistoryUserController } from './microservice/controller/history';
import { HistoryAdminService, HistoryDivisionService, HistoryFileService, HistoryUserService } from './microservice/service/history';

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
    // sms短信
    SmsCodeController,

    // users用户
    UsersModuleController,
    UsersRoleController,
    UsersOperationController,
    UsersOrganizationController,
    UserStudentController,
    UserEmployeeController,
    UserController,
    UserAdminController,
    UserAdminEmployeeController,
    UserAdminStudentController,

    // notice通知
    NoticeController,
    NoticeFileController,

    // leave请假
    LeaveDivisionController,
    LeaveEmployeeController,
    LeaveStudentController,
    LeaveFileController,
    LeaveTypeController,
    LeaveAdminController,

    // repair报修
    RepairsFileController,
    RepairsAutoDispatchController,
    RepairsTypeController,
    RepairsStatusController,
    RepairsManagerController,
    RepairsRepairsController,
    RepairsBuildingController,
    RepairsMaintainerController,
    RepairsAdminController,

    // Epi报备
    EpiClockController,
    EpiClockTypeController,
    EpiEmployeeController,

    // history党史
    HistoryAdminController,
    HistoryDivisionController,
    HistoryUserController,
    HistoryFileController
  ],

  providers: [
    // jwt验证
    JWTDATA,
    // sms短信
    SmsCodeService,

    // users用户
    UserEmployeeService,
    UserStudentService,
    UsersModuleService,
    UsersOperationService,
    UsersRoleService,
    UsersOrganizationService,
    UsersService,
    UserAdminService,
    UserAdminEmployeeService,
    UserAdminStudentService,

    // notice通知
    NoticeService,
    NoticeFileService,

    // leave请假
    LeaveDivisionService,
    LeaveEmployeeService,
    LeaveStudentService,
    LeaveFileService,
    LeaveTypeService,
    LeaveAdminService,

    // repair报修
    RepairsFileService,
    RepairsAutoDispatchService,
    RepairsTypeService,
    RepairsStatusService,
    RepairsManagerService,
    RepairsRepairsService,
    RepairsBuildingService,
    RepairsMaintainerService,
    RepairsAdminService,
    MtrRepairsSocket,

    // epi报备
    EpiClockService,
    EpiEmployeeService,
    EpiClockTypeService,

    // history党史
    HistoryAdminService,
    HistoryUserService,
    HistoryFileService,
    HistoryDivisionService,

    // 用户模块
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('userService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    // 短信模块
    {
      provide: 'SMS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('smsService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    // 通知模块
    {
      provide: 'NOTICE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('noticeService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    // 请假模块
    {
      provide: 'LEAVE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('leaveService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    // 报修模块
    {
      provide: 'REPAIRS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('repairsService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    // 打卡模块
    {
      provide: 'EPI_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('epiService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    // 报备模块
    {
      provide: 'REPORT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('reportService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    // 党史模块
    {
      provide: 'HISTORY_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('historyService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    }
  ],
})
// 请求拦截器
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 正常拦截审核
    consumer.apply(MsLeaveHealth).forRoutes({ path: 'leave/*', method: RequestMethod.ALL }),
      consumer.apply(MsRepairsHealth).forRoutes({ path: 'repairs/*', method: RequestMethod.ALL }),
      consumer.apply(MsSmsHealth).forRoutes({ path: 'sms/*', method: RequestMethod.ALL }),
      consumer.apply(MsUserHealth).forRoutes({ path: 'users/*', method: RequestMethod.ALL }),
      consumer.apply(MsEpiHealth).forRoutes({ path: 'epi/*', method: RequestMethod.ALL }),
      consumer.apply(MsHistoryHealth).forRoutes({ path: 'history/*', method: RequestMethod.ALL }),
      // 黑名单拦截
      consumer.apply(httpBlacklist).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
