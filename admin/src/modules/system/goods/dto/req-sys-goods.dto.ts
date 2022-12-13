/*
 * @Author: guyatao guyatao@hashdata.cn
 * @Date: 2022-10-19 16:12:10
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-12-12 22:20:01
 * @FilePath: /huosu/admin/src/modules/system/goods/dto/req-sys-goods.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { OmitType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { GoodsCopy } from '../entities/sys-goods.entity';

/* 新增 */
export class ReqAddGoodsDto extends OmitType(GoodsCopy, [
  'goodsId',
] as const) {
  // /* 淘宝商品ID */
  // @IsOptional()
  // @IsString()
  // numIid?: string;
}

/* 分页查询 */
export class ReqGoodsListDto extends PaginationDto {
  /* 淘宝商品ID */
  @IsOptional()
  @IsString()
  numIid?: string;

  /* 状态 */
  @IsOptional()
  @IsString()
  delFlag?: string;

  @IsOptional()
  @IsObject()
  params: ParamsDto;
}

/* 采集请求 */
export class ReqGoodsListByUrlDto {
  /* 淘宝商品ID */
  @IsOptional()
  @IsArray()
  urls?: Array<string>;

  /* 淘宝商品ID */
  @IsOptional()
  @IsNumber()
  categoryId?: number;

}

