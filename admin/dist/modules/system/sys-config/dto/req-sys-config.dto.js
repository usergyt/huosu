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
exports.ReqConfigListDto = exports.ReqAddConfigDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../../common/dto/pagination.dto");
const params_dto_1 = require("../../../../common/dto/params.dto");
const sys_config_entity_1 = require("../entities/sys-config.entity");
class ReqAddConfigDto extends (0, swagger_1.OmitType)(sys_config_entity_1.SysConfig, [
    'configId',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ReqAddConfigDto = ReqAddConfigDto;
class ReqConfigListDto extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { configName: { required: false, type: () => String, description: "\u53C2\u6570\u540D\u79F0" }, configKey: { required: false, type: () => String, description: "\u53C2\u6570\u952E\u540D" }, configType: { required: false, type: () => String, description: "\u53C2\u6570\u503C" }, params: { required: true, type: () => require("../../../../common/dto/params.dto").ParamsDto } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqConfigListDto.prototype, "configName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqConfigListDto.prototype, "configKey", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqConfigListDto.prototype, "configType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", params_dto_1.ParamsDto)
], ReqConfigListDto.prototype, "params", void 0);
exports.ReqConfigListDto = ReqConfigListDto;
//# sourceMappingURL=req-sys-config.dto.js.map