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
exports.ReqLoginDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ReqLoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { uuid: { required: true, type: () => String, description: "uuid\u7801" }, code: { required: true, type: () => String, description: "\u9A8C\u8BC1\u7801code" }, username: { required: true, type: () => String, description: "\u7528\u6237\u540D" }, password: { required: true, type: () => String, description: "\u5BC6\u7801" } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReqLoginDto.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReqLoginDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReqLoginDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReqLoginDto.prototype, "password", void 0);
exports.ReqLoginDto = ReqLoginDto;
//# sourceMappingURL=req-login.dto.js.map