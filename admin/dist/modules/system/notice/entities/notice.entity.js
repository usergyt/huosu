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
exports.Notice = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const typeorm_1 = require("typeorm");
let Notice = class Notice extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { noticeId: { required: true, type: () => Number }, noticeTitle: { required: true, type: () => String }, noticeType: { required: true, type: () => String }, noticeContent: { required: true, type: () => String }, status: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'notice_id',
        comment: '公告id',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Notice.prototype, "noticeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'notice_title',
        comment: '公告标题',
        length: 50,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Notice.prototype, "noticeTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'notice_type',
        comment: '公告类型（1通知 2公告）',
        type: 'char',
        length: 1,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Notice.prototype, "noticeType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'notice_content',
        comment: '公告内容',
        type: 'longtext',
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Notice.prototype, "noticeContent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        comment: '公告状态（0正常 1关闭）',
        type: 'char',
        default: '0',
        length: 1,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Notice.prototype, "status", void 0);
Notice = __decorate([
    (0, typeorm_1.Entity)()
], Notice);
exports.Notice = Notice;
//# sourceMappingURL=notice.entity.js.map