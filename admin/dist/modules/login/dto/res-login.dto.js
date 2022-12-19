"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResInfo = exports.ResSellerDto = exports.ResLoginDto = exports.ResImageCaptchaDto = void 0;
const openapi = require("@nestjs/swagger");
class ResImageCaptchaDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { img: { required: true, type: () => String, description: "base64\u56FE\u7247\u7F16\u7801" }, uuid: { required: true, type: () => String, description: "uuid\u7801" } };
    }
}
exports.ResImageCaptchaDto = ResImageCaptchaDto;
class ResLoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { token: { required: true, type: () => String, description: "token\u5BC6\u5319" } };
    }
}
exports.ResLoginDto = ResLoginDto;
class ResSellerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { sellserId: { required: true, type: () => String } };
    }
}
exports.ResSellerDto = ResSellerDto;
class ResInfo {
    static _OPENAPI_METADATA_FACTORY() {
        return { seller: { required: true, type: () => require("../../system/user/entities/seller.entity").Seller } };
    }
}
exports.ResInfo = ResInfo;
//# sourceMappingURL=res-login.dto.js.map