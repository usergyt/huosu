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
exports.ReqUpdateDept = exports.ReqAddDeptDto = exports.ReqDeptListDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dept_entity_1 = require("../entities/dept.entity");
class ReqDeptListDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { deptName: { required: false, type: () => String, description: "\u90E8\u95E8\u540D\u79F0" }, status: { required: false, type: () => String, description: "\u72B6\u6001" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqDeptListDto.prototype, "deptName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqDeptListDto.prototype, "status", void 0);
exports.ReqDeptListDto = ReqDeptListDto;
class ReqAddDeptDto extends (0, swagger_1.OmitType)(dept_entity_1.Dept, ['deptId']) {
    static _OPENAPI_METADATA_FACTORY() {
        return { parentId: { required: true, type: () => Number, description: "\u7236\u90E8\u95E8Id" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqAddDeptDto.prototype, "parentId", void 0);
exports.ReqAddDeptDto = ReqAddDeptDto;
class ReqUpdateDept extends dept_entity_1.Dept {
    static _OPENAPI_METADATA_FACTORY() {
        return { parentId: { required: true, type: () => Number, description: "\u7236\u90E8\u95E8Id" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqUpdateDept.prototype, "parentId", void 0);
exports.ReqUpdateDept = ReqUpdateDept;
//# sourceMappingURL=req-dept.dto.js.map