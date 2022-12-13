/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-10-09 13:35:54
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-12-11 23:44:21
 * @FilePath: /huosu/admin/src/modules/system/auth/strategies/local.strategy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ReqLoginDto } from 'src/modules/login/dto/req-login.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      sellerIdField: 'sellerId',
      passReqToCallback: true, //设置回调函数第一个参数为 request
    });
  }

  async validate(request, username: string, password: string, sellerId: string): Promise<any> {
    const body: ReqLoginDto = request.body; // 获取请求体
    // await this.authService.checkImgCaptcha(body.uuid, body.code);
    console.log(username, '===username')
    const user = await this.authService.validateUser(username);
    return user; //返回值会被 守卫的  handleRequest方法 捕获
  }
}
