"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excel = void 0;
require("reflect-metadata");
const excel_constant_1 = require("./excel.constant");
const excel_enum_1 = require("./excel.enum");
const Excel = (option) => {
    return (target, propertyKey) => {
        const old = Reflect.getMetadata(`${excel_constant_1.EXCEL_ARR_KRY}`, target.constructor);
        const obj = Object.assign({ sort: 1, type: excel_enum_1.ExcelTypeEnum.ALL }, option, {
            propertyKey,
        });
        if (old) {
            const exportArr = JSON.parse(JSON.stringify(old));
            exportArr.push(obj);
            Reflect.defineMetadata(`${excel_constant_1.EXCEL_ARR_KRY}`, exportArr, target.constructor);
        }
        else {
            Reflect.defineMetadata(`${excel_constant_1.EXCEL_ARR_KRY}`, [obj], target.constructor);
        }
    };
};
exports.Excel = Excel;
//# sourceMappingURL=excel.decorator.js.map