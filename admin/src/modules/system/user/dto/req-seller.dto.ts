/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-11-16 20:08:45
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-16 20:52:20
 * @FilePath: /huosu/admin/src/modules/system/user/dto/req-seller.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,

  IsString,
} from 'class-validator';
import { ParamsDto } from 'src/common/dto/params.dto';
import { Seller } from '../entities/seller.entity';



/* 新增商户 */
export class ReqAddSellerDto extends OmitType(Seller, ['sellerId'] as const) {


  /* sellerId */
  @IsString()
  sellerId: string;

  @IsString()
  name: string;

}

/* 编辑商户 */
export class ReqUpdateSellerDto extends OmitType(Seller, ['sellerId'] as const) {
  /* sellerId */
  @IsString()
  sellerId: string;

  @IsString()
  name: string;
}



/* 更改自己的用户信息 */
export class ReqUpdataSelfDto {
  // /* 昵称 */
  // @IsString()
  // nickName?: string;

  // /* 手机号码 */
  // @IsString()
  // phonenumber?: string;

  // /* 邮箱 */
  // @IsString()
  // email?: string;

  // /* 用户性别（0男 1女 2未知） */
  // @IsOptional()
  // @IsString()
  // sex?: string;

  // @ApiHideProperty()
  // avatar: string;
}


