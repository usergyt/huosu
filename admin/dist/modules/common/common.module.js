"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const excel_module_1 = require("./excel/excel.module");
const upload_module_1 = require("./upload/upload.module");
let CommonModule = class CommonModule {
};
CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [excel_module_1.ExcelModule, upload_module_1.UploadModule],
        controllers: [],
        providers: [],
        exports: [excel_module_1.ExcelModule],
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map