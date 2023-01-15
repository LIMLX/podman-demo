import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDTO } from '../dto/userDTO';

// local策略
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate( userDTO: UserDTO): Promise<any> {

    // 验证数据是否存在
    const user:string[] = []
    
    if ( user === null) { 
      throw new UnauthorizedException();
    }
    return user;
  }
}