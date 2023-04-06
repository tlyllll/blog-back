import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
// import * as dotenv from 'dotenv';

// dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: any) {
    console.log('4-验证回调');
    const existUser = await this.authService.findOneById(payload.id);

    if (!existUser) {
      throw new HttpException('token不正确', 403);
    }
    return existUser;
  }
}
