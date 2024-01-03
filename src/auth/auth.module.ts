import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy, JwtStrategy } from './strategies'
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt').KEY,
        signOptions: { expiresIn: config.get('jwt').TIME }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    LocalStrategy, JwtStrategy
  ],
  controllers: []
})
export class AuthModule { }
