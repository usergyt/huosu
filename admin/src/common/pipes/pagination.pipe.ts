/*
 * @Author: guyatao
 * @Date: 2021-12-08 20:20:53
 * @LastEditTime: 2022-10-30 23:49:28
 * @LastEditors: guyatao guyatao@hashdata.cn
 * @Description: 分页器管道
 * @FilePath: /meimei-admin/src/common/pipes/pagination.pipe.ts
 
 */

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
    transform(value: any) {
        const skip = value.pageNum ? (value.pageNum - 1) * value.pageSize : 0;
        const take = value.pageSize ?? 0;
        value.skip = skip;
        value.take = take;
        return value;
    }
}
