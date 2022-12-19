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
exports.ReqUpdateMenu = exports.ReqAddMenuDto = exports.ReqMenuListDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const menu_entity_1 = require("../entities/menu.entity");
class ReqMenuListDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { menuName: { required: false, type: () => String, description: "\u83DC\u5355\u540D\u79F0" }, status: { required: false, type: () => String, description: "\u72B6\u6001" } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqMenuListDto.prototype, "menuName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqMenuListDto.prototype, "status", void 0);
exports.ReqMenuListDto = ReqMenuListDto;
class ReqAddMenuDto extends (0, swagger_1.OmitType)(menu_entity_1.Menu, ['menuId']) {
    static _OPENAPI_METADATA_FACTORY() {
        return { parentId: { required: true, type: () => Number, description: "\u7236\u90E8\u95E8Id" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqAddMenuDto.prototype, "parentId", void 0);
exports.ReqAddMenuDto = ReqAddMenuDto;
class ReqUpdateMenu extends menu_entity_1.Menu {
    static _OPENAPI_METADATA_FACTORY() {
        return { parentId: { required: true, type: () => Number, description: "\u7236\u90E8\u95E8Id" } };
    }
}
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqUpdateMenu.prototype, "parentId", void 0);
exports.ReqUpdateMenu = ReqUpdateMenu;
//# sourceMappingURL=req-menu.dto.js.map