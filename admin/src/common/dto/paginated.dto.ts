/*
 * @Author: guyatao
 * @Date: 2021-12-09 11:10:48
 * @LastEditTime: 2022-10-30 23:48:10
 * @LastEditors: guyatao guyatao@hashdata.cn
 * @Description: 分页响应参数
 * @FilePath: /meimei-admin/src/common/dto/paginated.dto.ts
 
 */
import { ApiHideProperty } from '@nestjs/swagger';

export class PaginatedDto<T> {
    /* 总条数 */
    total: number;

    @ApiHideProperty()
    rows: T[];
}
