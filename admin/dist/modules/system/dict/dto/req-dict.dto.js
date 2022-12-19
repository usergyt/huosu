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
exports.ReqAddDictDataDto = exports.ReqUpdateDictDataDto = exports.ReqDictDataListDto = exports.ReqDictTypeListDto = exports.ReqAddDictTypeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../../common/dto/pagination.dto");
const params_dto_1 = require("../../../../common/dto/params.dto");
const dict_data_entity_1 = require("../entities/dict_data.entity");
const dict_type_entity_1 = require("../entities/dict_type.entity");
class ReqAddDictTypeDto extends (0, swagger_1.OmitType)(dict_type_entity_1.DictType, [
    'dictId',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ReqAddDictTypeDto = ReqAddDictTypeDto;
class ReqDictTypeListDto extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { dictName: { required: false, type: () => String }, dictType: { required: false, type: () => String }, status: { required: false, type: () => String }, params: { required: false, type: () => require("../../../../common/dto/params.dto").ParamsDto } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqDictTypeListDto.prototype, "dictName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqDictTypeListDto.prototype, "dictType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqDictTypeListDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", params_dto_1.ParamsDto)
], ReqDictTypeListDto.prototype, "params", void 0);
exports.ReqDictTypeListDto = ReqDictTypeListDto;
class ReqDictDataListDto extends pagination_dto_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { dictType: { required: true, type: () => String }, dictLabel: { required: true, type: () => String }, status: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqDictDataListDto.prototype, "dictType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqDictDataListDto.prototype, "dictLabel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqDictDataListDto.prototype, "status", void 0);
exports.ReqDictDataListDto = ReqDictDataListDto;
class ReqUpdateDictDataDto extends (0, swagger_1.OmitType)(dict_data_entity_1.DictData, [
    'dictType',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return { dictType: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdateDictDataDto.prototype, "dictType", void 0);
exports.ReqUpdateDictDataDto = ReqUpdateDictDataDto;
class ReqAddDictDataDto extends (0, swagger_1.OmitType)(ReqUpdateDictDataDto, [
    'dictCode',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ReqAddDictDataDto = ReqAddDictDataDto;
//# sourceMappingURL=req-dict.dto.js.map