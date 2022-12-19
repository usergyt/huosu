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
exports.DictData = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
const dict_type_entity_1 = require("./dict_type.entity");
let DictData = class DictData extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { dictCode: { required: true, type: () => Number, description: "\u5B57\u5178\u7F16\u7801" }, dictSort: { required: true, type: () => Number, description: "\u5B57\u5178\u6392\u5E8F" }, dictLabel: { required: true, type: () => String, description: "\u5B57\u5178\u6807\u7B7E" }, dictValue: { required: true, type: () => String, description: "\u5B57\u5178\u952E\u503C" }, cssClass: { required: false, type: () => String, description: "\u6837\u5F0F\u5C5E\u6027\uFF08\u5176\u4ED6\u6837\u5F0F\u6269\u5C55\uFF09" }, listClass: { required: false, type: () => String, description: "\u8868\u683C\u56DE\u663E\u6837\u5F0F" }, isDefault: { required: false, type: () => String, description: "\u662F\u5426\u9ED8\u8BA4\uFF08Y\u662F N\u5426\uFF09" }, status: { required: true, type: () => String, description: "\u72B6\u6001\uFF080\u6B63\u5E38 1\u505C\u7528\uFF09" }, dictType: { required: true, type: () => require("./dict_type.entity").DictType, description: "\u5B57\u5178\u7C7B\u578B" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'dict_data',
        comment: '字典编码',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '字典编码',
    }),
    __metadata("design:type", Number)
], DictData.prototype, "dictCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dict_sort',
        comment: '字典排序',
        default: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '字典排序',
    }),
    __metadata("design:type", Number)
], DictData.prototype, "dictSort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dict_label',
        length: '100',
        default: '',
        comment: '字典标签',
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '字典标签',
    }),
    __metadata("design:type", String)
], DictData.prototype, "dictLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dict_value',
        length: '100',
        default: '',
        comment: '字典键值',
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '字典键值',
    }),
    __metadata("design:type", String)
], DictData.prototype, "dictValue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'css_class',
        length: '100',
        nullable: true,
        default: null,
        comment: '样式属性（其他样式扩展）',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '样式属性（其他样式扩展）',
    }),
    __metadata("design:type", String)
], DictData.prototype, "cssClass", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'list_class',
        length: '100',
        nullable: true,
        default: null,
        comment: '表格回显样式',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '表格回显样式',
    }),
    __metadata("design:type", String)
], DictData.prototype, "listClass", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_default',
        length: '1',
        type: 'char',
        default: 'N',
        comment: '是否默认（Y是 N否）',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DictData.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: '1',
        type: 'char',
        default: '0',
        comment: '状态（0正常 1停用）',
    }),
    (0, excel_decorator_1.Excel)({
        name: '状态',
        dictType: 'sys_normal_disable',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DictData.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dict_type_entity_1.DictType, (dictType) => dictType.dictDatas),
    __metadata("design:type", dict_type_entity_1.DictType)
], DictData.prototype, "dictType", void 0);
DictData = __decorate([
    (0, typeorm_1.Entity)({
        name: 'dict_data',
    })
], DictData);
exports.DictData = DictData;
//# sourceMappingURL=dict_data.entity.js.map