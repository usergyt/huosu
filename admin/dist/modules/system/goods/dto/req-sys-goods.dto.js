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
exports.ReqGoodsListByUrlDto = exports.ReqGoodsListDto = exports.ReqAddGoodsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../../common/dto/pagination.dto");
const params_dto_1 = require("../../../../common/dto/params.dto");
const sys_goods_entity_1 = require("../entities/sys-goods.entity");
class ReqAddGoodsDto extends (0, swagger_1.OmitType)(sys_goods_entity_1.GoodsCopy, [
    'goodsId',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ReqAddGoodsDto = ReqAddGoodsDto;
class ReqGoodsListDto extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { numIid: { required: false, type: () => String, description: "\u6DD8\u5B9D\u5546\u54C1ID" }, delFlag: { required: false, type: () => String, description: "\u72B6\u6001" }, params: { required: true, type: () => require("../../../../common/dto/params.dto").ParamsDto } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqGoodsListDto.prototype, "numIid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqGoodsListDto.prototype, "delFlag", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", params_dto_1.ParamsDto)
], ReqGoodsListDto.prototype, "params", void 0);
exports.ReqGoodsListDto = ReqGoodsListDto;
class ReqGoodsListByUrlDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { urls: { required: false, type: () => [String], description: "\u6DD8\u5B9D\u5546\u54C1ID" }, categoryId: { required: false, type: () => Number, description: "\u6DD8\u5B9D\u5546\u54C1ID" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ReqGoodsListByUrlDto.prototype, "urls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqGoodsListByUrlDto.prototype, "categoryId", void 0);
exports.ReqGoodsListByUrlDto = ReqGoodsListByUrlDto;
//# sourceMappingURL=req-sys-goods.dto.js.map