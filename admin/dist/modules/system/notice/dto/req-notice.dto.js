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
exports.ReqNoeiceList = exports.ReqAddNoticeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../../common/dto/pagination.dto");
const notice_entity_1 = require("../entities/notice.entity");
class ReqAddNoticeDto extends (0, swagger_1.OmitType)(notice_entity_1.Notice, ['noticeId']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ReqAddNoticeDto = ReqAddNoticeDto;
class ReqNoeiceList extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { noticeTitle: { required: true, type: () => String, description: "\u5E7F\u544A\u6807\u9898" }, createBy: { required: true, type: () => String, description: "\u521B\u5EFA\u4EBA" }, noticeType: { required: true, type: () => String, description: "\u516C\u544A\u7C7B\u578B" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqNoeiceList.prototype, "noticeTitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqNoeiceList.prototype, "createBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqNoeiceList.prototype, "noticeType", void 0);
exports.ReqNoeiceList = ReqNoeiceList;
//# sourceMappingURL=req-notice.dto.js.map