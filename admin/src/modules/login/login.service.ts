/*
 * @Author: guyatao
 * @Date: 2021-12-08 18:30:53
 * @LastEditTime: 2022-12-12 20:49:13
 * @LastEditors: usergyt userguyatao@163.com
 * @Description: 登录 service
 * @FilePath: /meimei-admin/src/modules/login/login.service.ts
 
 */

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CAPTCHA_IMG_KEY,
  USER_DEPTID_KEY,
  USER_DEPTNAME_KEY,
  USER_NICKNAME_KEY,
  USER_PERMISSIONS_KEY,
  USER_ROLEKEYS_KEY,
  USER_ROLEKS_KEY,
  USER_TOKEN_KEY,
  USER_USERNAME_KEY,
  USER_VERSION_KEY,
} from 'src/common/contants/redis.contant';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SharedService } from 'src/shared/shared.service';
import { MenuService } from '../system/menu/menu.service';
import { User } from '../system/user/entities/user.entity';
import { SellerService } from '../system/user/seller.service';

import { UserService } from '../system/user/user.service';

import { ResInfo } from './dto/res-login.dto';
import { Request } from 'express';
import { LogService } from '../monitor/log/log.service';
import { ConfigService } from '@nestjs/config';
import { Payload } from './login.interface';
import * as svgCaptcha from 'svg-captcha';
import axios from 'axios';
import { ReqLoginDto } from './dto/req-login.dto';
import { Seller } from '../system/user/entities/seller.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly menuService: MenuService,
    private readonly logService: LogService,
    private readonly configService: ConfigService,
    private readonly sellerService: SellerService
  ) { }

  /* 创建验证码图片 */
  async createImageCaptcha() {
    const { data, text } = svgCaptcha.createMathExpr({
      // size: 4, //验证码长度
      // ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      // background: '#cc9966', // 验证码图片背景颜色
      width: 115.5,
      height: 38,
    });
    const result = {
      img: data.toString(),
      uuid: this.sharedService.generateUUID(),
    };
    await this.redis.set(
      `${CAPTCHA_IMG_KEY}:${result.uuid}`,
      text,
      'EX',
      60 * 5,
    );
    return result;
  }

  /* 登录 */
  async login(request: Request) {
    const { user } = request as any;
    const payload: Payload = { userId: user.sellerId, pv: 1, sellerId: '' };
    //生成token
    let jwtSign = this.jwtService.sign(payload);
    // //演示环境 复用 token，取消单点登录。
    // if (this.configService.get<boolean>('isDemoEnvironment')) {
    //   const token = await this.redis.get(`${USER_TOKEN_KEY}:${user.sellerId}`);
    //   if (token) {
    //     jwtSign = token;
    //   }
    // }

    //存储密码版本号，防止登录期间 密码被管理员更改后 还能继续登录
    await this.redis.set(`${USER_VERSION_KEY}:${user.sellerId}`, 1);
    //存储token, 防止重复登录问题，设置token过期时间(1天后 token 自动过期)，以及主动注销token。
    await this.redis.set(
      `${USER_TOKEN_KEY}:${user.sellerId}`,
      jwtSign,
      'EX',
      60 * 60 * 24,
    );

    return { token: jwtSign };
  }

  /* 登录授权 */
  async authLogin(reqLoginDto: ReqLoginDto) {

    // return { sellserId: '1478093654' }
    // const { user } = reqLoginDto as any;
    //获取token
    let info: any = {}
    //获取token

    await this.sharedService.author(
      'https://openapi.kwaixiaodian.com/oauth2/access_token',
      {
        code: reqLoginDto.code,
      },
    ).then(res => {
      info = res
    })
    console.log('refresh_token', info.refresh_token)
    console.log('access_token', info.access_token)

    //获取商户信息
    await this.sharedService.get(
      {
      },
      'open.user.seller.get',
      info.access_token || info.refresh_token
    ).then(async seller => {

      const data = seller.data.data
      info = { ...info, ...data }
      //查询是否存在
      await this.sellerService.sellerAllInfo(data.sellerId).then(async res => {
        if (!res) {
          //添加商户
          await this.sellerService.addSeller(data).then(addres => {
            console.log(addres)
          })

        }
      })
    })
    //存储access_token
    // await this.redis.set(`sellerId`, info.sellerId);

    await this.redis.set(`access_token:${info.sellerId}`, info.access_token);

    return { sellserId: info.sellerId };
  }

  /* 退出登录 */
  async logout(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      if (await this.redis.get(`${USER_TOKEN_KEY}:${payload.userId}`)) {
        await this.redis.del(`${USER_TOKEN_KEY}:${payload.userId}`);
      }
    } catch (error) { }
  }

  /* 获取用户信息 */
  async getInfo(userId: string): Promise<ResInfo> {
    console.log('=======')
    const seller: Seller = await this.sellerService.findById(userId);
    if (!seller) throw new ApiException('用户信息已被修改', 401);


    return {
      seller,
    };
  }

  /* 获取当前用户的菜单 */
  async getRouterByUser(userId: number) {
    // const user: User = await this.userService.findOneUserAllById(userId);
    // const isAdmin = user.roles.some((role) => role.roleKey === 'admin');
    // const roleIdArr = user.roles.map((role) => role.roleId);
    // if (!isAdmin && !roleIdArr.length) return [];
    // return await this.menuService.getMenuList(isAdmin, roleIdArr);
    return await this.menuService.getMenuList(true, []);
  }
}
