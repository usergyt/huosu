/*
 * @Author: guyatao
 * @Date: 2021-12-08 17:14:57
 * @LastEditTime: 2022-12-12 23:22:34
 * @LastEditors: usergyt userguyatao@163.com
 * @Description: 公共方法
 *
 * @FilePath: /meimei-admin/src/shared/shared.service.ts
 
 */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';
import { Request } from 'express';
import axios from 'axios';
import * as iconv from 'iconv-lite';
import * as qs from 'qs';
import { json } from 'stream/consumers';
import { SharedService } from 'src/shared/shared.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class HttpServiceApi {
  constructor(
    private readonly sharedService: SharedService,

    @InjectRedis() private readonly redis: Redis,
  ) { }
  //类目列表
  async getCategory() {
    const data = await this.sharedService.get(
      {},
      'open.item.category',
      '')

    return data.data
  }
  //运费模版
  async getExpressList() {
    const data = await this.sharedService.get(
      { offset: 1, limit: 20, searchUsed: false },
      'open.logistics.express.template.list',
      '')

    return data.data
  }
  /* 获取类目相关配置 */
  async getConfig(categoryId: Number) {
    const data = await this.sharedService.get(
      {
        categoryId: categoryId,
        // propId: '6195',
        // cursor: 0,
        // limit: 10
      },
      'open.item.category.config',
      // 'open.item.get',
      // 'open.item.category.prop.value.search',
      ''
    )

    return data.data
  }
  /* 搜索类目属性值 */
  async getCategoryPropVal(categoryId: Number, propId: Number) {
    const data = await this.sharedService.get(
      {
        categoryId: categoryId,
        propId: propId,
        cursor: 0,
        limit: 10
      },
      // 'open.item.category.config',
      // 'open.item.get',
      'open.item.category.prop.value.search',
      ''
    )

    return data.data
  }

}
