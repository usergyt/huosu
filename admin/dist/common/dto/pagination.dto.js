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
exports.PaginationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { pageNum: { required: false, type: () => Number, description: "\u5F53\u524D\u9875" }, pageSize: { required: false, type: () => Number, description: "\u6BCF\u9875\u6761\u6570" }, orderByColumn: { required: false, type: () => String, description: "\u6392\u5E8F\u5B57\u6BB5" }, isAsc: { required: false, type: () => String, description: "\u6392\u5E8F\u65B9\u5F0F" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pageNum", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "orderByColumn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "isAsc", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "take", void 0);
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=pagination.dto.js.map