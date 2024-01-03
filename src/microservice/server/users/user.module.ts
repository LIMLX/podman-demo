import { Module } from '@nestjs/common';
import { UserAdminEmployeeController } from './controller/admin-employee.controller';
import { UserAdminStudentController } from './controller/admin-student.controller';
import { UserAdminController } from './controller/admin.controller';
import { UserEmployeeController } from './controller/employee.controller';
import { UsersModuleController } from './controller/module.controller';
import { UsersOperationController } from './controller/operation.controller';
import { UsersOrganizationController } from './controller/organization.controller';
import { UsersRoleController } from './controller/role.controller';
import { UserStudentController } from './controller/student.controller';
import { UserController } from './controller/user.controller';
import { UserAdminEmployeeService, UserAdminService, UserAdminStudentService, UserEmployeeService, UserStudentService, UsersModuleService, UsersOperationService, UsersOrganizationService, UsersRoleService, UsersService } from './service';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { JWTDATA } from 'src/common';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                secret: config.get('jwt').KEY,
                signOptions: { expiresIn: config.get('jwt').TIME }
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [
        UserController
        // UserAdminEmployeeController,
        // UserAdminStudentController,
        // UserAdminController,
        // UserEmployeeController,
        // UsersModuleController,
        // UsersOperationController,
        // UsersOrganizationController,
        // UsersRoleController,
        // UserStudentController,
        // UserController
    ],
    providers: [
        // 用户模块
        {
            provide: 'USER_SERVICE',
            useFactory: (configService: ConfigService) => {
                const mathSvcOptions = configService.get('userService');
                return ClientProxyFactory.create(mathSvcOptions);
            },
            inject: [ConfigService]
        },
        JWTDATA,
        UsersService,
        // // users用户
        // UserEmployeeService,
        // UserStudentService,
        // UsersModuleService,
        // UsersOperationService,
        // UsersRoleService,
        // UsersOrganizationService,
        // UsersService,
        // UserAdminService,
        // UserAdminEmployeeService,
        // UserAdminStudentService
    ],
    exports: [
        UsersService,
        // UserEmployeeService,
        // UserStudentService,
        // UsersModuleService,
        // UsersOperationService,
        // UsersRoleService,
        // UsersOrganizationService,
        // UsersService,
        // UserAdminService,
        // UserAdminEmployeeService,
        // UserAdminStudentService,
    ]
})
export class UserModule { }
