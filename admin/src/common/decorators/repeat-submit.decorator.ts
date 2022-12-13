/*
 * @Author:guyatao
 * @Date: 2022-01-19 12:49:14
 * @LastEditTime: 2022-10-30 23:47:52
 * @LastEditors: guyatao guyatao@hashdata.cn
 * @Description: 防止重复提交装饰器
 * @FilePath: /meimei-admin/src/common/decorators/repeat-submit.decorator.ts
 
 */

import { SetMetadata } from '@nestjs/common';
import { REOEATSUBMIT_METADATA } from '../contants/decorator.contant';

export class RepeatSubmitOption {
    interval?: number = 5; //默认5s
    message?: string = '请求过于频繁';
}

export const RepeatSubmit = (option?: RepeatSubmitOption) => {
    const repeatSubmitOption = Object.assign(new RepeatSubmitOption(), option);
    return SetMetadata(REOEATSUBMIT_METADATA, repeatSubmitOption);
};
