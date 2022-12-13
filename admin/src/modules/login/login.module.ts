/*
 * @Author: guyatao
 * @Date: 2021-12-08 18:29:45
 * @LastEditTime: 2022-11-16 23:22:14
 * @LastEditors: usergyt userguyatao@163.com
 * @Description: 登录模块
 * @FilePath: /meimei-admin/src/modules/login/login.module.ts
 
 */

import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../system/auth/auth.constants';
import { AuthModule } from '../system/auth/auth.module';
import { UserModule } from '../system/user/user.module';
import { SellerModule } from '../system/user/seller.module';

import { MenuModule } from '../system/menu/menu.module';
import { LogModule } from '../monitor/log/log.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '168h' },
    }),
    AuthModule,
    UserModule,
    MenuModule,
    LogModule,
    SellerModule
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule { }
