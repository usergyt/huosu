/*
 * @Author: guyatao
 * @Date: 2021-12-08 19:00:14
 * @LastEditTime: 2022-10-30 23:46:49
 * @LastEditors: guyatao guyatao@hashdata.cn
 * @Description: 返回值封装对象
 * @FilePath: /meimei-admin/src/common/class/ajax-result.class.ts
 
 */
export class AjaxResult {
    readonly code: number;
    readonly msg: string;
    [key: string]: any;

    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        Object.assign(this, data);
    }

    static success(data?: any, msg = '操作成功') {
        return new AjaxResult(200, msg, data);
    }

    static error(msg = '操作失败', code = 500) {
        return new AjaxResult(code, msg, null);
    }
}
