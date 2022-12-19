"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelModule = void 0;
const excel_service_1 = require("./excel.service");
const common_1 = require("@nestjs/common");
const dict_module_1 = require("../../system/dict/dict.module");
let ExcelModule = class ExcelModule {
};
ExcelModule = __decorate([
    (0, common_1.Module)({
        imports: [dict_module_1.DictModule],
        controllers: [],
        providers: [excel_service_1.ExcelService],
        exports: [excel_service_1.ExcelService],
    })
], ExcelModule);
exports.ExcelModule = ExcelModule;
//# sourceMappingURL=excel.module.js.map