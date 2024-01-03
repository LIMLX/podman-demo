import { CacheModule, Inject, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import baseConfig from 'config/base';
import { AuthModule } from './auth/auth.module';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTDATA } from './common/encryptions';
import { SmsCodeService } from './microservice/service/sms';
import { NoticeAdminController, NoticeFileController, NoticeUserController, SmsCodeController } from './microservice/controller';
import { NoticeAdminService, NoticeFileService, NoticeUserService } from './microservice/service/notice';
import { UserAdminEmployeeService, UserAdminService, UserAdminStudentService, UserEmployeeService, UserStudentService, UsersModuleService, UsersOperationService, UsersOrganizationService, UsersRoleService, UsersService } from './microservice/service/users';
import { IncorruptibilityAdminService, IncorruptibilityFileService, IncorruptibilityUserService, LeaveAdminService, LeaveDivisionService, LeaveEmployeeService, LeaveFileService, LeaveStudentService, LeaveTypeService } from './microservice';
import { LeaveAdminController, LeaveDivisionController, LeaveEmployeeController, LeaveFileController, LeaveStudentController, LeaveTypeController } from './microservice/controller/leave';
import { RepairsAdminController, RepairsAutoDispatchController, RepairsFileController, RepairsMaintainerController, RepairsManagerController, RepairsUserController } from './microservice/controller/repairs';
import { RepairsAdminService, RepairsAutoDispatchService, RepairsFileService, RepairsMaintainerService, RepairsManagerService, RepairsUserService } from './microservice/service/repairs';
import { MsEpiHealth, MsHistoryHealth, MsIncorruptibilityHealth, MsLeaveHealth, MsNoticeHealth, MsRepairsHealth, MsSmsHealth, MsUserHealth, httpBlacklist } from './common';
import { EpiEmployeeController, EpiClockTypeController, EpiAdminController, EpiStudentController, EpiFileController, EpiDivisionController } from './microservice/controller/epi';
import { EpiClockAdminService, EpiClockTypeService, EpiDivisionService, EpiEmployeeService, EpiFileService, EpiStudentService } from './microservice/service/epi';
import { RepairsSocket, LeaveSocket, HistorySocket } from './microservice/socket';
import { UserAdminStudentController } from './microservice/controller/users/admin-student.controller';
import { HistoryAdminController, HistoryDivisionController, HistoryFileController, HistoryUserController } from './microservice/controller/history';
import { HistoryAdminService, HistoryDivisionService, HistoryFileService, HistoryUserService } from './microservice/service/history';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import LoggerMiddleware from './common/logger/logger.middleware';
import { IncorruptibilityAdminController, IncorruptibilityFileController } from './microservice/controller/incorruptibility';
import { IncorruptibilityUserController } from './microservice/controller/incorruptibility/user.controller';
import { UserModule } from './microservice/server';
import { UserController } from './microservice/server/users/controller/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [baseConfig]
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt').KEY,
        signOptions: { expiresIn: config.get('jwt').TIME }
      }),
      inject: [ConfigService]
    }),
    WinstonModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transports: [
          new winston.transports.DailyRotateFile({
            dirname: `${config.get("log").dirname}`,           // 日志保存的目录
            filename: `${config.get("log").filename}`,         // 日志名称，占位符 %DATE% 取值为 datePattern 值。
            datePattern: `${config.get("log").datePattern}`,   // 日志轮换的频率，此处表示每天。
            zippedArchive: config.get("log").zippedArchive,    // 是否通过压缩的方式归档被轮换的日志文件。
            maxSize: `${config.get("log").maxSize}`,           // 设置日志文件的最大大小，m 表示 mb 。
            maxFiles: `${config.get("log").maxFiles}`,         // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
            // 记录时添加时间戳信息
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
              }),
              winston.format.json(),
            ),
          }),
        ],
      }),
      inject: [ConfigService]
    }),
    PassportModule,
    CacheModule.register(),
    AuthModule, UserModule
  ],

  controllers: [
    // sms短信
    SmsCodeController,

    // notice通知
    NoticeAdminController,
    NoticeUserController,
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
    RepairsManagerController,
    RepairsMaintainerController,
    RepairsAdminController,
    RepairsUserController,


    // Epi报备
    EpiAdminController,
    EpiClockTypeController,
    EpiEmployeeController,
    EpiStudentController,
    EpiFileController,
    EpiDivisionController,

    // history党史
    HistoryAdminController,
    HistoryDivisionController,
    HistoryUserController,
    HistoryFileController,

    // incorruptibility爱廉说
    IncorruptibilityAdminController,
    IncorruptibilityUserController,
    IncorruptibilityFileController
  ],

  providers: [
    // jwt验证
    JWTDATA,
    // sms短信
    SmsCodeService,

    // notice通知
    NoticeAdminService,
    NoticeUserService,
    NoticeFileService,

    // leave请假
    LeaveDivisionService,
    LeaveEmployeeService,
    LeaveStudentService,
    LeaveFileService,
    LeaveTypeService,
    LeaveAdminService,
    LeaveSocket,

    // repair报修
    RepairsFileService,
    RepairsAutoDispatchService,
    RepairsManagerService,
    RepairsMaintainerService,
    RepairsAdminService,
    RepairsUserService,
    RepairsSocket,

    // epi报备
    EpiClockAdminService,
    EpiEmployeeService,
    EpiClockTypeService,
    EpiStudentService,
    EpiDivisionService,
    EpiFileService,

    // history党史
    HistoryAdminService,
    HistoryUserService,
    HistoryFileService,
    HistoryDivisionService,
    HistorySocket,

    // incorruptibility爱廉说
    IncorruptibilityFileService,
    IncorruptibilityUserService,
    IncorruptibilityAdminService,

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
    // 防疫模块
    {
      provide: 'EPI_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('epiService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService]
    },
    // 爱廉说模块
    {
      provide: 'INCORRUPTIBILITY_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('incorruptibilityService');
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
      consumer.apply(MsNoticeHealth).forRoutes({ path: 'notice/*', method: RequestMethod.ALL }),
      consumer.apply(MsIncorruptibilityHealth).forRoutes({ path: 'incorruptibility/*', method: RequestMethod.ALL }),
      // 黑名单拦截
      consumer.apply(httpBlacklist).forRoutes({ path: '*', method: RequestMethod.ALL }),
      // 日志访问
      consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
