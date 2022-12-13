/*
 * @Author: guyatao
 * @Date: 2021-12-08 19:28:34
 * @LastEditTime: 2022-10-30 23:48:28
 * @LastEditors: guyatao guyatao@hashdata.cn
 * @Description: 自定义异常
 * @FilePath: /meimei-admin/src/common/exceptions/api.exception.ts
 
 */
import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
    private errCode: number;
    constructor(msg: string, errCode?: number) {
        //权限问题一律使用401错误码
        if (errCode && errCode == 401) {
            super(msg, 200);
            this.errCode = 401;
        } else {
            //其他异常一律使用500错误码
            super(msg, errCode ?? 200);
            this.errCode = errCode ?? 500;
        }
    }
    getErrCode(): number {
        return this.errCode;
    }
}
