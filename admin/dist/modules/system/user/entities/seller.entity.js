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
exports.Seller = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const excel_enum_1 = require("../../../common/excel/excel.enum");
const typeorm_1 = require("typeorm");
let Seller = class Seller extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String, description: "\u5546\u6237\u540D\u79F0" }, sex: { required: true, type: () => String, description: "\u6027\u522B" }, head: { required: false, type: () => String, description: "\u5934\u50CF\u5730\u5740" }, bigHead: { required: false, type: () => String, description: "\u9AD8\u6E05\u5934\u50CF" }, sellerId: { required: true, type: () => String, description: "\u5546\u6237ID" }, openId: { required: true, type: () => String, description: "\u5546\u6237\u552F\u4E00\u6807\u8BC6" }, staffId: { required: true, type: () => String, description: "\u5B50\u8D26\u53F7id" }, state: { required: true, type: () => String, description: "\u5546\u6237\u72B6\u6001" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'id',
        comment: '主键',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: 'id',
        type: excel_enum_1.ExcelTypeEnum.EXPORT,
    }),
    __metadata("design:type", Number)
], Seller.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        comment: '商户名称',
        length: 30,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '商户名称',
    }),
    __metadata("design:type", String)
], Seller.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'sex',
        comment: '性别',
        length: 30,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '性别',
    }),
    __metadata("design:type", String)
], Seller.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '头像地址',
        length: 200,
        default: '',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Seller.prototype, "head", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '高清头像',
        length: 200,
        default: '',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Seller.prototype, "bigHead", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'seller_Id',
        comment: '商户ID',
        length: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '商户ID',
    }),
    __metadata("design:type", String)
], Seller.prototype, "sellerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'open_Id',
        comment: '商户唯一标识',
        length: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '商户唯一标识',
    }),
    __metadata("design:type", String)
], Seller.prototype, "openId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'staff_Id',
        comment: '子账号id',
        default: null
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '商户唯一标识',
    }),
    __metadata("design:type", String)
], Seller.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        comment: '商户状态',
        length: 10,
        default: '0'
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '商户状态',
    }),
    __metadata("design:type", String)
], Seller.prototype, "state", void 0);
Seller = __decorate([
    (0, typeorm_1.Entity)()
], Seller);
exports.Seller = Seller;
//# sourceMappingURL=seller.entity.js.map