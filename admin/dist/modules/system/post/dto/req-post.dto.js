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
exports.ReqPostListDto = exports.ReqAddPostDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../../common/dto/pagination.dto");
const post_entity_1 = require("../entities/post.entity");
class ReqAddPostDto extends (0, swagger_1.OmitType)(post_entity_1.Post, ['postId']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ReqAddPostDto = ReqAddPostDto;
class ReqPostListDto extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { postCode: { required: false, type: () => String, description: "\u5C97\u4F4D\u7F16\u7801" }, postName: { required: false, type: () => String, description: "\u5C97\u4F4D\u540D\u79F0" }, status: { required: false, type: () => String, description: "\u72B6\u6001" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqPostListDto.prototype, "postCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqPostListDto.prototype, "postName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqPostListDto.prototype, "status", void 0);
exports.ReqPostListDto = ReqPostListDto;
//# sourceMappingURL=req-post.dto.js.map