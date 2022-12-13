import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import {
  CAPTCHA_IMG_KEY,
  USER_TOKEN_KEY,
  USER_VERSION_KEY,
} from 'src/common/contants/redis.contant';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SharedService } from 'src/shared/shared.service';
import { UserService } from '../user/user.service';
import { SellerService } from '../user/seller.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly sharedService: SharedService,
    private readonly userService: UserService,
    private readonly sellerService: SellerService,

  ) { }


  /* 判断用户id是否存在 */
  async validateSeller(sellerId: string) {

    const seller = await this.sellerService.findById(sellerId)
    if (!seller) throw new ApiException('授权失败!');


    return seller;
  }
  /* 判断token 是否过期 或者被重置 */
  async validateAuthToken(sellerId: any, pv: number, restoken: string) {

    const token = await this.redis.get(`${USER_TOKEN_KEY}:${sellerId}`);

    if (restoken !== token) throw new ApiException('登录状态已过期', 401);
    const passwordVersion = parseInt(
      await this.redis.get(`${USER_VERSION_KEY}:${sellerId}`),
    );
    if (pv !== passwordVersion) throw new ApiException('用户信息已被修改', 401);
  }

  /* 判断验证码是否正确 */
  async checkImgCaptcha(uuid: string, code: string) {
    const result = await this.redis.get(`${CAPTCHA_IMG_KEY}:${uuid}`);
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase()) {
      throw new ApiException('验证码错误');
    }
    await this.redis.del(`${CAPTCHA_IMG_KEY}:${uuid}`);
  }

  /* 判断商户是否存在 */
  async validateUser(sellerId: string) {

    const user = await this.sellerService.findOneBySellerId(sellerId);
    if (!user) throw new ApiException('授权失败');

    return user;
  }


  /* 判断token 是否过期 或者被重置 */
  async validateToken(userId: number, pv: number, restoken: string) {

    const token = await this.redis.get(`${USER_TOKEN_KEY}:${userId}`);

    if (restoken !== token) throw new ApiException('登录状态已过期', 401);
    const passwordVersion = parseInt(
      await this.redis.get(`${USER_VERSION_KEY}:${userId}`),
    );
    if (pv !== passwordVersion) throw new ApiException('用户信息已被修改', 401);
  }
}
