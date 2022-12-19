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
exports.ReqUpdataSelfDto = exports.ReqUpdateSellerDto = exports.ReqAddSellerDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const seller_entity_1 = require("../entities/seller.entity");
class ReqAddSellerDto extends (0, swagger_1.OmitType)(seller_entity_1.Seller, ['sellerId']) {
    static _OPENAPI_METADATA_FACTORY() {
        return { sellerId: { required: true, type: () => String, description: "sellerId" }, name: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqAddSellerDto.prototype, "sellerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqAddSellerDto.prototype, "name", void 0);
exports.ReqAddSellerDto = ReqAddSellerDto;
class ReqUpdateSellerDto extends (0, swagger_1.OmitType)(seller_entity_1.Seller, ['sellerId']) {
    static _OPENAPI_METADATA_FACTORY() {
        return { sellerId: { required: true, type: () => String, description: "sellerId" }, name: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdateSellerDto.prototype, "sellerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdateSellerDto.prototype, "name", void 0);
exports.ReqUpdateSellerDto = ReqUpdateSellerDto;
class ReqUpdataSelfDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ReqUpdataSelfDto = ReqUpdataSelfDto;
//# sourceMappingURL=req-seller.dto.js.map