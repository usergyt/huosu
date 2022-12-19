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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysConfig = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
let SysConfig = class SysConfig extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { configId: { required: true, type: () => Number, description: "\u53C2\u6570\u4E3B\u952E" }, configName: { required: true, type: () => String, description: "\u53C2\u6570\u540D\u79F0" }, configKey: { required: true, type: () => String, description: "\u53C2\u6570\u952E\u540D" }, configValue: { required: true, type: () => String, description: "\u53C2\u6570\u952E\u503C" }, configType: { required: true, type: () => String, description: "\u7CFB\u7EDF\u5185\u7F6E\uFF08Y\u662F N\u5426\uFF09" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'config_id',
        comment: '参数主键',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '参数主键',
    }),
    __metadata("design:type", Number)
], SysConfig.prototype, "configId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'config_name',
        length: 100,
        default: '',
        comment: '参数名称',
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '参数名称',
    }),
    __metadata("design:type", String)
], SysConfig.prototype, "configName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'config_key',
        length: 100,
        default: '',
        comment: '参数键名',
    }),
    (0, excel_decorator_1.Excel)({
        name: '参数键名',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SysConfig.prototype, "configKey", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'config_value',
        length: 500,
        default: '',
        comment: '参数键值',
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '参数键值',
    }),
    __metadata("design:type", String)
], SysConfig.prototype, "configValue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'config_type',
        type: 'char',
        length: 1,
        default: 'N',
        comment: '系统内置（Y是 N否）',
    }),
    (0, excel_decorator_1.Excel)({
        name: '系统内置',
        dictType: 'sys_yes_no',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SysConfig.prototype, "configType", void 0);
SysConfig = __decorate([
    (0, typeorm_1.Entity)({
        name: 'config',
    })
], SysConfig);
exports.SysConfig = SysConfig;
//# sourceMappingURL=sys-config.entity.js.map