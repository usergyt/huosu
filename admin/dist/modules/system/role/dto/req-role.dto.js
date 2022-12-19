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
exports.ReqCancelAllDto = exports.ReqCancelDto = exports.ReqAllocatedListDto = exports.ReqChangeStatusDto = exports.ReqRoleListDto = exports.ReqDataScopeDto = exports.ReqUpdateRoleDto = exports.ReqAddRoleDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../../common/dto/pagination.dto");
const params_dto_1 = require("../../../../common/dto/params.dto");
const role_entity_1 = require("../../role/entities/role.entity");
class ReqAddRoleDto extends (0, swagger_1.OmitType)(role_entity_1.Role, ['roleId']) {
    static _OPENAPI_METADATA_FACTORY() {
        return { menuIds: { required: true, type: () => [Number], description: "\u83DC\u5355id\u6570\u7EC4" } };
    }
}
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ReqAddRoleDto.prototype, "menuIds", void 0);
exports.ReqAddRoleDto = ReqAddRoleDto;
class ReqUpdateRoleDto extends ReqAddRoleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roleId: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqUpdateRoleDto.prototype, "roleId", void 0);
exports.ReqUpdateRoleDto = ReqUpdateRoleDto;
class ReqDataScopeDto extends role_entity_1.Role {
    static _OPENAPI_METADATA_FACTORY() {
        return { deptIds: { required: true, type: () => [Number], description: "\u90E8\u95E8id\u6570\u7EC4" } };
    }
}
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ReqDataScopeDto.prototype, "deptIds", void 0);
exports.ReqDataScopeDto = ReqDataScopeDto;
class ReqRoleListDto extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roleName: { required: false, type: () => String }, roleKey: { required: false, type: () => String }, status: { required: false, type: () => String }, params: { required: true, type: () => require("../../../../common/dto/params.dto").ParamsDto } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqRoleListDto.prototype, "roleName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqRoleListDto.prototype, "roleKey", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqRoleListDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", params_dto_1.ParamsDto)
], ReqRoleListDto.prototype, "params", void 0);
exports.ReqRoleListDto = ReqRoleListDto;
class ReqChangeStatusDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roleId: { required: true, type: () => Number, description: "\u89D2\u8272id" }, status: { required: true, type: () => String, description: "\u72B6\u6001\u503C" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqChangeStatusDto.prototype, "roleId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqChangeStatusDto.prototype, "status", void 0);
exports.ReqChangeStatusDto = ReqChangeStatusDto;
class ReqAllocatedListDto extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roleId: { required: true, type: () => Number, description: "\u89D2\u8272Id" }, userName: { required: false, type: () => String, description: "\u7528\u6237\u540D" }, phonenumber: { required: false, type: () => String, description: "\u624B\u673A\u53F7" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqAllocatedListDto.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqAllocatedListDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqAllocatedListDto.prototype, "phonenumber", void 0);
exports.ReqAllocatedListDto = ReqAllocatedListDto;
class ReqCancelDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roleId: { required: true, type: () => Number, description: "\u89D2\u8272ID" }, userId: { required: true, type: () => Number, description: "\u7528\u6237ID" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqCancelDto.prototype, "roleId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqCancelDto.prototype, "userId", void 0);
exports.ReqCancelDto = ReqCancelDto;
class ReqCancelAllDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roleId: { required: true, type: () => Number, description: "\u89D2\u8272Id" }, userIds: { required: true, type: () => String, description: "\u7528\u6237\u89D2\u8272\u5B57\u7B26\u4E32\u62FC\u63A5\u5982 1,2,3" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqCancelAllDto.prototype, "roleId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCancelAllDto.prototype, "userIds", void 0);
exports.ReqCancelAllDto = ReqCancelAllDto;
//# sourceMappingURL=req-role.dto.js.map