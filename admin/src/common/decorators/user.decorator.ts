/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-10-18 17:57:10
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-17 03:40:06
 * @FilePath: /huosu/admin/src/common/decorators/user.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export enum UserEnum {
  'sellerId' = 'sellerId',
  'userId' = 'userId',
  'userName' = 'userName',
  'nickName' = 'nickName',
  'deptId' = 'deptId',
  'deptName' = 'deptName',
}
export enum SellerEnum {
  'sellerId' = 'sellerId',
  'name' = 'name',

}

// 设置在参数中 获取 哪些用户信息
export const User = createParamDecorator(
  (data: UserEnum, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user;

    return data ? user && user.sellerId : user;
  },
);

// 设置在参数中 获取 哪些商户信息
export const Seller = createParamDecorator(
  (data: SellerEnum, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const seller = request.seller;

    return data ? seller && seller.sellerId : seller;
  },
);