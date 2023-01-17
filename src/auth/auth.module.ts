import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy,JwtStrategy } from './strategies'
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports:[
    JwtModule.registerAsync({
      useFactory:(config:ConfigService) => ({
        secret: config.get('jwt').KEY,
        signOptions: {expiresIn: config.get('jwt').TIME}
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthService,LocalStrategy,JwtStrategy,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.get('userService');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService],
    }
  ],
  controllers:[]
})
export class AuthModule {}
