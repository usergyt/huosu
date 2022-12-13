/*
 * @Author: guyatao
 * @Date: 2022-01-04 17:52:02
 * @LastEditTime: 2022-10-30 23:47:30
 * @LastEditors: guyatao guyatao@hashdata.cn
 * @Description: 数据权限装饰器
 * @FilePath: /meimei-admin/src/common/decorators/datascope.decorator.ts
 
 */

import { SetMetadata } from '@nestjs/common';
import { DATASCOPE_KEY_METADATA } from '../contants/decorator.contant';

export class DeptOrUserAlias {
    deptAlias?: string = 'dept';
    userAlias?: string = 'user';
}
export const DataScope = (deptOrUserAlias?: DeptOrUserAlias) => {
    const aliaObj = Object.assign(new DeptOrUserAlias(), deptOrUserAlias);
    return SetMetadata(DATASCOPE_KEY_METADATA, aliaObj);
};
