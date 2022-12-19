"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = exports.User = exports.SellerEnum = exports.UserEnum = void 0;
const common_1 = require("@nestjs/common");
var UserEnum;
(function (UserEnum) {
    UserEnum["sellerId"] = "sellerId";
    UserEnum["userId"] = "userId";
    UserEnum["userName"] = "userName";
    UserEnum["nickName"] = "nickName";
    UserEnum["deptId"] = "deptId";
    UserEnum["deptName"] = "deptName";
})(UserEnum = exports.UserEnum || (exports.UserEnum = {}));
var SellerEnum;
(function (SellerEnum) {
    SellerEnum["sellerId"] = "sellerId";
    SellerEnum["name"] = "name";
})(SellerEnum = exports.SellerEnum || (exports.SellerEnum = {}));
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user && user.sellerId : user;
});
exports.Seller = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const seller = request.seller;
    return data ? seller && seller.sellerId : seller;
});
//# sourceMappingURL=user.decorator.js.map