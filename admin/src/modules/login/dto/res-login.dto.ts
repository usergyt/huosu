/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-10-09 13:35:54
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-17 03:44:54
 * @FilePath: /huosu/admin/src/modules/login/dto/res-login.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Seller } from 'src/modules/system/user/entities/seller.entity';
import { User } from 'src/modules/system/user/entities/user.entity';

export class ResImageCaptchaDto {
  /* base64图片编码 */
  img: string;

  /* uuid码 */
  uuid: string;
}

export class ResLoginDto {
  /* token密匙 */
  token: string;
}
export class ResSellerDto {

  sellserId: string;
}

export class ResInfo {
  // /* 权限标识 */
  // permissions: string[];

  // /* 角色标识 */
  // roles: string[];

  // /* 用户信息 */
  // user: User;
  seller: Seller
}
