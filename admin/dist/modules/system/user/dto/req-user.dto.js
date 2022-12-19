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
exports.ReqUpdateSelfPwd = exports.ReqUpdataSelfDto = exports.ReqChangeStatusDto = exports.ReqUpdateAuthRoleDto = exports.ReqResetPwdDto = exports.ReqUpdateUserDto = exports.ReqAddUserDto = exports.ReqUserListDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const params_dto_1 = require("../../../../common/dto/params.dto");
const user_entity_1 = require("../entities/user.entity");
class ReqUserListDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userName: { required: false, type: () => String }, phonenumber: { required: false, type: () => String }, status: { required: false, type: () => String }, deptId: { required: false, type: () => Number }, params: { required: true, type: () => require("../../../../common/dto/params.dto").ParamsDto } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUserListDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUserListDto.prototype, "phonenumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUserListDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqUserListDto.prototype, "deptId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", params_dto_1.ParamsDto)
], ReqUserListDto.prototype, "params", void 0);
exports.ReqUserListDto = ReqUserListDto;
class ReqAddUserDto extends (0, swagger_1.OmitType)(user_entity_1.User, ['userId']) {
    static _OPENAPI_METADATA_FACTORY() {
        return { deptId: { required: false, type: () => Number, description: "\u90E8\u95E8Id" }, postIds: { required: true, type: () => [Number], description: "\u5C97\u4F4Did\u6570\u7EC4" }, roleIds: { required: true, type: () => [Number], description: "\u89D2\u8272Id\u6570\u7EC4" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqAddUserDto.prototype, "deptId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ReqAddUserDto.prototype, "postIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ReqAddUserDto.prototype, "roleIds", void 0);
exports.ReqAddUserDto = ReqAddUserDto;
class ReqUpdateUserDto extends (0, swagger_1.OmitType)(user_entity_1.User, ['password']) {
    static _OPENAPI_METADATA_FACTORY() {
        return { deptId: { required: false, type: () => Number, description: "\u90E8\u95E8Id" }, postIds: { required: true, type: () => [Number], description: "\u5C97\u4F4Did\u6570\u7EC4" }, roleIds: { required: true, type: () => [Number], description: "\u89D2\u8272Id\u6570\u7EC4" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqUpdateUserDto.prototype, "deptId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ReqUpdateUserDto.prototype, "postIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ReqUpdateUserDto.prototype, "roleIds", void 0);
exports.ReqUpdateUserDto = ReqUpdateUserDto;
class ReqResetPwdDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number, description: "\u7528\u6237ID" }, password: { required: true, type: () => String, description: "\u65B0\u5BC6\u7801" } };
    }
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqResetPwdDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqResetPwdDto.prototype, "password", void 0);
exports.ReqResetPwdDto = ReqResetPwdDto;
class ReqUpdateAuthRoleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number, description: "\u7528\u6237id" }, roleIds: { required: true, type: () => String, description: "\u89D2\u8272Id\u6570\u7EC4" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqUpdateAuthRoleDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdateAuthRoleDto.prototype, "roleIds", void 0);
exports.ReqUpdateAuthRoleDto = ReqUpdateAuthRoleDto;
class ReqChangeStatusDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number, description: "\u7528\u6237id" }, status: { required: true, type: () => String, description: "\u72B6\u6001" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqChangeStatusDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqChangeStatusDto.prototype, "status", void 0);
exports.ReqChangeStatusDto = ReqChangeStatusDto;
class ReqUpdataSelfDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nickName: { required: false, type: () => String, description: "\u6635\u79F0" }, phonenumber: { required: false, type: () => String, description: "\u624B\u673A\u53F7\u7801" }, email: { required: false, type: () => String, description: "\u90AE\u7BB1" }, sex: { required: false, type: () => String, description: "\u7528\u6237\u6027\u522B\uFF080\u7537 1\u5973 2\u672A\u77E5\uFF09" } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdataSelfDto.prototype, "nickName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdataSelfDto.prototype, "phonenumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdataSelfDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdataSelfDto.prototype, "sex", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], ReqUpdataSelfDto.prototype, "avatar", void 0);
exports.ReqUpdataSelfDto = ReqUpdataSelfDto;
class ReqUpdateSelfPwd {
    static _OPENAPI_METADATA_FACTORY() {
        return { oldPassword: { required: true, type: () => String, description: "\u65E7\u5BC6\u7801" }, newPassword: { required: true, type: () => String, description: "\u65E7\u5BC6\u7801" } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdateSelfPwd.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdateSelfPwd.prototype, "newPassword", void 0);
exports.ReqUpdateSelfPwd = ReqUpdateSelfPwd;
//# sourceMappingURL=req-user.dto.js.map