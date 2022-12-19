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
exports.DictType = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
const dict_data_entity_1 = require("./dict_data.entity");
let DictType = class DictType extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { dictId: { required: true, type: () => Number, description: "\u5B57\u5178\u7F16\u7801" }, dictName: { required: true, type: () => String, description: "\u5B57\u5178\u540D\u79F0" }, dictType: { required: true, type: () => String, description: "\u5B57\u5178\u7C7B\u578B" }, status: { required: true, type: () => String, description: "\u72B6\u6001\uFF080\u6B63\u5E38 1\u505C\u7528\uFF09" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'dict_id',
        comment: '字典类型ID',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '字典编码',
    }),
    __metadata("design:type", Number)
], DictType.prototype, "dictId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dict_name',
        comment: '字典名称',
        default: '',
        length: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '字典名称',
    }),
    __metadata("design:type", String)
], DictType.prototype, "dictName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        name: 'dict_type',
        comment: '字典类型',
        default: '',
        length: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '字典类型',
    }),
    __metadata("design:type", String)
], DictType.prototype, "dictType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '状态（0正常 1停用）',
        type: 'char',
        default: 0,
        length: 1,
    }),
    (0, excel_decorator_1.Excel)({
        name: '状态',
        dictType: 'sys_normal_disable',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DictType.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dict_data_entity_1.DictData, (dictData) => dictData.dictType),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Array)
], DictType.prototype, "dictDatas", void 0);
DictType = __decorate([
    (0, typeorm_1.Entity)({
        name: 'dict_type',
    })
], DictType);
exports.DictType = DictType;
//# sourceMappingURL=dict_type.entity.js.map