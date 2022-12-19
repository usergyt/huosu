"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResSellerInfoDto = exports.ResSellerDto = void 0;
const openapi = require("@nestjs/swagger");
const seller_entity_1 = require("../entities/seller.entity");
class ResSellerDto extends seller_entity_1.Seller {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ResSellerDto = ResSellerDto;
class ResSellerInfoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { seller: { required: true, type: () => require("../entities/seller.entity").Seller } };
    }
}
exports.ResSellerInfoDto = ResSellerInfoDto;
//# sourceMappingURL=res-seller.dto.js.map