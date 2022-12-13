/*
 * @Author: guyatao
 * @Date: 2021-12-09 11:09:19
 * @LastEditTime: 2022-10-30 23:47:21
 * @LastEditors: guyatao guyatao@hashdata.cn
 * @Description: 分页请求返回的 openApi 装饰器
 * @FilePath: /meimei-admin/src/common/decorators/api-paginated-response.decorator.ts
 
 */

import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDto } from '../dto/paginated.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel,
) => {
    return applyDecorators(
        ApiExtraModels(PaginatedDto),
        ApiExtraModels(model),
        ApiOkResponse({
            schema: {
                title: `PaginatedResponseOf${model.name}`,
                allOf: [
                    { $ref: getSchemaPath(PaginatedDto) },
                    {
                        properties: {
                            rows: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
    );
};
