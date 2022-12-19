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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const redis_contant_1 = require("../../../common/contants/redis.contant");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const shared_service_1 = require("../../../shared/shared.service");
const user_service_1 = require("../user/user.service");
const seller_service_1 = require("../user/seller.service");
let AuthService = class AuthService {
    constructor(redis, sharedService, userService, sellerService) {
        this.redis = redis;
        this.sharedService = sharedService;
        this.userService = userService;
        this.sellerService = sellerService;
    }
    async validateSeller(sellerId) {
        const seller = await this.sellerService.findById(sellerId);
        if (!seller)
            throw new api_exception_1.ApiException('授权失败!');
        return seller;
    }
    async validateAuthToken(sellerId, pv, restoken) {
        const token = await this.redis.get(`${redis_contant_1.USER_TOKEN_KEY}:${sellerId}`);
        if (restoken !== token)
            throw new api_exception_1.ApiException('登录状态已过期', 401);
        const passwordVersion = parseInt(await this.redis.get(`${redis_contant_1.USER_VERSION_KEY}:${sellerId}`));
        if (pv !== passwordVersion)
            throw new api_exception_1.ApiException('用户信息已被修改', 401);
    }
    async checkImgCaptcha(uuid, code) {
        const result = await this.redis.get(`${redis_contant_1.CAPTCHA_IMG_KEY}:${uuid}`);
        if ((0, lodash_1.isEmpty)(result) || code.toLowerCase() !== result.toLowerCase()) {
            throw new api_exception_1.ApiException('验证码错误');
        }
        await this.redis.del(`${redis_contant_1.CAPTCHA_IMG_KEY}:${uuid}`);
    }
    async validateUser(sellerId) {
        const user = await this.sellerService.findOneBySellerId(sellerId);
        if (!user)
            throw new api_exception_1.ApiException('授权失败');
        return user;
    }
    async validateToken(userId, pv, restoken) {
        const token = await this.redis.get(`${redis_contant_1.USER_TOKEN_KEY}:${userId}`);
        if (restoken !== token)
            throw new api_exception_1.ApiException('登录状态已过期', 401);
        const passwordVersion = parseInt(await this.redis.get(`${redis_contant_1.USER_VERSION_KEY}:${userId}`));
        if (pv !== passwordVersion)
            throw new api_exception_1.ApiException('用户信息已被修改', 401);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [Object, shared_service_1.SharedService,
        user_service_1.UserService,
        seller_service_1.SellerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map