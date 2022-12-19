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
exports.BaseEntity = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const excel_decorator_1 = require("../../modules/common/excel/excel.decorator");
const excel_enum_1 = require("../../modules/common/excel/excel.enum");
class BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { remark: { required: false, type: () => String, description: "\u5907\u6CE8" } };
    }
}
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', comment: '创建时间' }),
    (0, swagger_1.ApiHideProperty)(),
    (0, excel_decorator_1.Excel)({
        name: '创建时间',
        type: excel_enum_1.ExcelTypeEnum.EXPORT,
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
        sort: 100,
    }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_time', comment: '更新时间' }),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Object)
], BaseEntity.prototype, "updateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'create_by', comment: '创建人', length: '50', default: '' }),
    (0, swagger_1.ApiHideProperty)(),
    (0, excel_decorator_1.Excel)({
        name: '创建人',
        type: excel_enum_1.ExcelTypeEnum.EXPORT,
        sort: 101,
    }),
    __metadata("design:type", String)
], BaseEntity.prototype, "createBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'update_by', comment: '更新人', length: '50', default: '' }),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], BaseEntity.prototype, "updateBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remark', comment: '备注', default: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '备注',
        sort: 102,
    }),
    __metadata("design:type", String)
], BaseEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({ name: 'version', comment: '版本号', select: false }),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Number)
], BaseEntity.prototype, "version", void 0);
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.entity.js.map