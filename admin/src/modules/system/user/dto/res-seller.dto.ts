/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-11-16 20:25:55
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-16 21:27:46
 * @FilePath: /huosu/admin/src/modules/system/user/dto/res-seller.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Seller } from '../entities/seller.entity';

export class ResSellerDto extends Seller {
  /* 关联ID */
  // deptId: number;

}

/* 用户信息 */
export class ResSellerInfoDto {

  seller: Seller
}


