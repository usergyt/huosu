/*
 * @Author: guyatao
 * @Date: 2021-12-08 18:26:54
 * @LastEditTime: 2022-11-16 23:14:17
 * @LastEditors: usergyt userguyatao@163.com
 * @Description: 身份认证模块
 * @FilePath: /meimei-admin/src/modules/system/auth/auth.module.ts
 
 */

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { SellerModule } from '../user/seller.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UserModule, PassportModule, SellerModule],
  controllers: [],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
