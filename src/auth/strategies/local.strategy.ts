import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';


// local策略
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate( userDTO): Promise<any> {

    // 验证数据是否存在
    const user: any = this.authService.validateUser(userDTO)

    console.log(user)
    
    return {
        userId: 1,
        username: 'john',
        password: 'changeme',
      }
    }
}