/*
 * @Author: guyatao
 * @Date: 2021-12-08 18:57:03
 * @LastEditTime: 2022-10-30 23:47:38
 * @LastEditors: guyatao guyatao@hashdata.cn
 * @Description: 保持原数据返回的装饰器
 * @FilePath: /meimei-admin/src/common/decorators/keep.decorator.ts
 
 */

import { SetMetadata } from '@nestjs/common';
import { KEEP_KEY } from '../contants/decorator.contant';

export const Keep = () => SetMetadata(KEEP_KEY, true);
