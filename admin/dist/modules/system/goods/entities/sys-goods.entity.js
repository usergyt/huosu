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
exports.GoodsCopy = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../../../common/entities/base.entity");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
let GoodsCopy = class GoodsCopy extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { goodsId: { required: true, type: () => Number, description: "\u53C2\u6570\u4E3B\u952E" }, numIid: { required: true, type: () => String, description: "\u6DD8\u5B9D\u5546\u54C1ID" }, title: { required: true, type: () => String, description: "\u5546\u54C1\u540D\u79F0" }, price: { required: true, type: () => String, description: "\u5546\u54C1\u4EF7\u683C" }, orginal_price: { required: true, type: () => String, description: "\u539F\u4EF7\u683C" }, nick: { required: true, type: () => String, description: "\u5E97\u94FA\u540D\u79F0" }, num: { required: true, type: () => Number, description: "\u5546\u54C1\u6570\u91CF" }, pic_url: { required: true, type: () => String, description: "\u5546\u54C1\u56FE\u7247" }, cid: { required: true, type: () => String, description: "cid" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'goods_id',
        comment: '复制主键',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '复制主键',
    }),
    __metadata("design:type", Number)
], GoodsCopy.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'num_iid',
        length: 50,
        default: '',
        comment: '商品名称ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, excel_decorator_1.Excel)({
        name: '商品名称ID',
    }),
    __metadata("design:type", String)
], GoodsCopy.prototype, "numIid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        length: 100,
        default: '',
        comment: '商品名',
    }),
    (0, excel_decorator_1.Excel)({
        name: '商品名',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoodsCopy.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'price',
        type: 'decimal',
        default: 0.00,
        comment: '价格',
    }),
    (0, excel_decorator_1.Excel)({
        name: '价格',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GoodsCopy.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'orginal_price',
        type: 'decimal',
        default: 0.00,
        comment: '原价格',
    }),
    (0, excel_decorator_1.Excel)({
        name: '原价格',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GoodsCopy.prototype, "orginal_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'nick',
        length: 100,
        default: '',
        comment: '店铺名称',
    }),
    (0, excel_decorator_1.Excel)({
        name: '店铺名称',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoodsCopy.prototype, "nick", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'num',
        default: 0,
        comment: '商品数量',
    }),
    (0, excel_decorator_1.Excel)({
        name: '商品数量',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GoodsCopy.prototype, "num", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'pic_url',
        length: 100,
        default: '',
        comment: '商品图片',
    }),
    (0, excel_decorator_1.Excel)({
        name: '商品图片',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoodsCopy.prototype, "pic_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cid',
        length: 100,
        default: '',
        comment: 'cid',
    }),
    (0, excel_decorator_1.Excel)({
        name: 'cid',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GoodsCopy.prototype, "cid", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({
        name: 'del_flag',
        comment: '删除标志（0代表存在 2代表删除）',
        length: 1,
        default: '0',
        type: 'char',
    }),
    __metadata("design:type", String)
], GoodsCopy.prototype, "delFlag", void 0);
GoodsCopy = __decorate([
    (0, typeorm_1.Entity)({
        name: 'goods_copy',
    })
], GoodsCopy);
exports.GoodsCopy = GoodsCopy;
//# sourceMappingURL=sys-goods.entity.js.map