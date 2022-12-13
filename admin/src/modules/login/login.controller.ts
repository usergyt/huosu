/*
 * @Author: guyatao
 * @Date: 2021-12-08 18:30:39
 * @LastEditTime: 2022-11-17 03:57:44
 * @LastEditors: usergyt userguyatao@163.com
 * @Description: 登录 controller
 * @FilePath: /meimei-admin/src/modules/login/login.controller.ts
 
 */

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataObj } from 'src/common/class/data-obj.class';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Router } from '../system/menu/dto/res-menu.dto';
import { ReqLoginDto } from './dto/req-login.dto';
import { ResImageCaptchaDto, ResLoginDto, ResSellerDto } from './dto/res-login.dto';
import { LoginService } from './login.service';
import { Request } from 'express';
@ApiTags('登录')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  /* 获取图片验证码 */
  @Get('captchaImage')
  @Public()
  async captchaImage(): Promise<ResImageCaptchaDto> {
    console.log('验证码 ')
    return await this.loginService.createImageCaptcha();
  }

  /* 用户登录 */
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() reqLoginDto: ReqLoginDto,
    @Req() req: Request,
  ): Promise<ResLoginDto> {
    const { user } = req as any;

    return await this.loginService.login(req);
  }

  /* 授权登录 */
  @Post('authLogin')
  // @UseGuards(LocalAuthGuard)
  @Public()
  async authLogin(
    @Body() reqLoginDto: ReqLoginDto,
    @Req() req: Request,
  ): Promise<ResSellerDto> {
    return await this.loginService.authLogin(reqLoginDto);
  }


  /* 获取用户信息 */
  @Get('getInfo')
  async getInfo(@User(UserEnum.userId) userId: string) {
    console.log("******", userId)
    return await this.loginService.getInfo(userId);
  }

  /* 获取用户路由信息 */
  @Get('getRouters')
  @ApiDataResponse(typeEnum.objectArr, Router)
  async getRouters(@User(UserEnum.userId) userId: number) {
    const router = await this.loginService.getRouterByUser(userId);
    return DataObj.create(router);
  }

  /* 退出登录 */
  @Public()
  @Post('logout')
  async logout(@Headers('Authorization') authorization: string) {
    if (authorization) {
      const token = authorization.slice(7);
      await this.loginService.logout(token);
    }
  }
}
