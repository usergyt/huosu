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
exports.ReqJobRunDto = exports.ReqJobLogList = exports.ReqChangStatusDto = exports.ReqJobListDto = exports.ReqAddJob = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../../common/dto/pagination.dto");
const params_dto_1 = require("../../../../common/dto/params.dto");
const job_entity_1 = require("../entities/job.entity");
class ReqAddJob extends (0, swagger_1.OmitType)(job_entity_1.Job, ['jobId']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ReqAddJob = ReqAddJob;
class ReqJobListDto extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { jobName: { required: false, type: () => String, description: "\u4EFB\u52A1\u540D\u79F0" }, jobGroup: { required: false, type: () => String, description: "\u4EFB\u52A1\u7EC4\u540D" }, status: { required: false, type: () => String, description: "\u4EFB\u52A1\u72B6\u6001" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqJobListDto.prototype, "jobName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqJobListDto.prototype, "jobGroup", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqJobListDto.prototype, "status", void 0);
exports.ReqJobListDto = ReqJobListDto;
class ReqChangStatusDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { jobId: { required: true, type: () => Number, description: "\u4EFB\u52A1id" }, status: { required: true, type: () => String, description: "\u72B6\u6001" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqChangStatusDto.prototype, "jobId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqChangStatusDto.prototype, "status", void 0);
exports.ReqChangStatusDto = ReqChangStatusDto;
class ReqJobLogList extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { jobName: { required: false, type: () => String, description: "\u4EFB\u52A1\u540D\u79F0" }, jobGroup: { required: false, type: () => String, description: "\u4EFB\u52A1\u7EC4\u540D" }, status: { required: false, type: () => String, description: "\u6267\u884C\u72B6\u6001" }, params: { required: false, type: () => require("../../../../common/dto/params.dto").ParamsDto, description: "\u6267\u884C\u65F6\u95F4" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqJobLogList.prototype, "jobName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqJobLogList.prototype, "jobGroup", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqJobLogList.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", params_dto_1.ParamsDto)
], ReqJobLogList.prototype, "params", void 0);
exports.ReqJobLogList = ReqJobLogList;
class ReqJobRunDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { jobGroup: { required: true, type: () => String, description: "\u5206\u7EC4" }, jobId: { required: true, type: () => Number, description: "\u4EFB\u52A1id" } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqJobRunDto.prototype, "jobGroup", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqJobRunDto.prototype, "jobId", void 0);
exports.ReqJobRunDto = ReqJobRunDto;
//# sourceMappingURL=req-job.dto.js.map