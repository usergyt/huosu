"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const common_1 = require("@nestjs/common");
const excel_constant_1 = require("./excel.constant");
const node_xlsx_1 = require("node-xlsx");
const moment = require("moment");
const dict_service_1 = require("../../system/dict/dict.service");
const excel_enum_1 = require("./excel.enum");
const fs = require("fs");
const api_exception_1 = require("../../../common/exceptions/api.exception");
let ExcelService = class ExcelService {
    constructor(dictService) {
        this.dictService = dictService;
    }
    async export(model, list) {
        var _a;
        const exportObjArr = (_a = Reflect.getMetadata(excel_constant_1.EXCEL_ARR_KRY, model)) !== null && _a !== void 0 ? _a : [];
        const data = await this.formatExport(exportObjArr, list);
        const arrBuffer = node_xlsx_1.default.build([
            {
                name: '表格1',
                data,
                options: {},
            },
        ]);
        return Buffer.from(arrBuffer);
    }
    async import(model, file) {
        var e_1, _a;
        var _b;
        try {
            const workSheetsFromBuffer = node_xlsx_1.default.parse(fs.readFileSync(file.path));
            const data = workSheetsFromBuffer[0].data;
            if (data.length < 2)
                throw Error('格式错误');
            const importObjArr = (_b = Reflect.getMetadata(excel_constant_1.EXCEL_ARR_KRY, model)) !== null && _b !== void 0 ? _b : [];
            const excelData = await this.formatImport(importObjArr);
            if (data[0].toString() !== excelData[0].toString())
                throw Error('格式错误');
            const objPropertyArr = data[0];
            const dataArr = data.slice(2);
            const result = [];
            try {
                for (var dataArr_1 = __asyncValues(dataArr), dataArr_1_1; dataArr_1_1 = await dataArr_1.next(), !dataArr_1_1.done;) {
                    const item = dataArr_1_1.value;
                    const obj = new model();
                    objPropertyArr.forEach((item2, index) => {
                        obj[item2] = item[index];
                    });
                    result.push(obj);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (dataArr_1_1 && !dataArr_1_1.done && (_a = dataArr_1.return)) await _a.call(dataArr_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        }
        catch (error) {
            throw new api_exception_1.ApiException('文件格式错误');
        }
    }
    async importTemplate(model) {
        var _a;
        const importObjArr = (_a = Reflect.getMetadata(excel_constant_1.EXCEL_ARR_KRY, model)) !== null && _a !== void 0 ? _a : [];
        const data = await this.formatImport(importObjArr);
        const arrBuffer = node_xlsx_1.default.build([
            {
                name: '表格1',
                data,
                options: {},
            },
        ]);
        return Buffer.from(arrBuffer);
    }
    async formatExport(exportObjArr, list) {
        const optionPromiseArr = exportObjArr
            .filter((item) => item.type === excel_enum_1.ExcelTypeEnum.ALL || item.type === excel_enum_1.ExcelTypeEnum.EXPORT)
            .sort((obj, obj2) => obj.sort - obj2.sort)
            .map(async (item) => {
            if (item.dictType) {
                item.dictDataArr = await this.dictService.getDictDataByDictType(item.dictType);
            }
            return item;
        });
        const optionArr = await Promise.all(optionPromiseArr);
        const data = [];
        data.push(optionArr.map((item) => item.name));
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            const inArr = optionArr.map((option) => {
                var _a;
                let dataItem = element[option.propertyKey];
                if (option.dateFormat) {
                    dataItem = moment(dataItem).format(option.dateFormat);
                }
                if (option.dictType) {
                    const dictData = option.dictDataArr.find((item) => item.dictValue == dataItem);
                    dataItem = dictData ? dictData.dictLabel : '';
                }
                if (option.readConverterExp) {
                    dataItem = (_a = option.readConverterExp[dataItem]) !== null && _a !== void 0 ? _a : '';
                }
                if (option.separator) {
                    dataItem = dataItem.join(option.separator);
                }
                if (option.suffix) {
                    dataItem = '' + dataItem + option.suffix;
                }
                if (option.defaultValue) {
                    dataItem = dataItem !== null && dataItem !== void 0 ? dataItem : option.defaultValue;
                }
                return dataItem;
            });
            data.push(inArr);
        }
        return data;
    }
    async formatImport(importObjArr) {
        const optionArr = importObjArr
            .filter((item) => item.type === excel_enum_1.ExcelTypeEnum.ALL || item.type === excel_enum_1.ExcelTypeEnum.IMPORT)
            .sort((obj, obj2) => obj.sort - obj2.sort);
        const data = [];
        data.push(optionArr.map((item) => item.propertyKey));
        data.push(optionArr.map((item) => item.name));
        return data;
    }
};
ExcelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dict_service_1.DictService])
], ExcelService);
exports.ExcelService = ExcelService;
//# sourceMappingURL=excel.service.js.map