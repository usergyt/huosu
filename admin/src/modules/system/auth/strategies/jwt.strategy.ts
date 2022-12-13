/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-10-09 13:35:54
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-12-11 23:42:37
 * @FilePath: /huosu/admin/src/modules/system/auth/strategies/jwt.strategy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../auth.constants';
import { Payload } from 'src/modules/login/login.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true, //设置回调的第一个参数是  request
    });
  }

  async validate(request: Request, payload: Payload) {
    const { userId, pv, sellerId } = payload;


    const token = (request.headers as any).authorization.slice(7);
    await this.authService.validateAuthToken(userId, pv, token);

    return { userId }; //返回值会被 守卫的  handleRequest方法 捕获
  }
}
