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
exports.LoginService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const redis_contant_1 = require("../../common/contants/redis.contant");
const api_exception_1 = require("../../common/exceptions/api.exception");
const shared_service_1 = require("../../shared/shared.service");
const menu_service_1 = require("../system/menu/menu.service");
const seller_service_1 = require("../system/user/seller.service");
const user_service_1 = require("../system/user/user.service");
const log_service_1 = require("../monitor/log/log.service");
const config_1 = require("@nestjs/config");
const svgCaptcha = require("svg-captcha");
let LoginService = class LoginService {
    constructor(sharedService, redis, jwtService, userService, menuService, logService, configService, sellerService) {
        this.sharedService = sharedService;
        this.redis = redis;
        this.jwtService = jwtService;
        this.userService = userService;
        this.menuService = menuService;
        this.logService = logService;
        this.configService = configService;
        this.sellerService = sellerService;
    }
    async createImageCaptcha() {
        const { data, text } = svgCaptcha.createMathExpr({
            noise: 3,
            color: true,
            width: 115.5,
            height: 38,
        });
        const result = {
            img: data.toString(),
            uuid: this.sharedService.generateUUID(),
        };
        await this.redis.set(`${redis_contant_1.CAPTCHA_IMG_KEY}:${result.uuid}`, text, 'EX', 60 * 5);
        return result;
    }
    async login(request) {
        const { user } = request;
        const payload = { userId: user.sellerId, pv: 1, sellerId: '' };
        let jwtSign = this.jwtService.sign(payload);
        await this.redis.set(`${redis_contant_1.USER_VERSION_KEY}:${user.sellerId}`, 1);
        await this.redis.set(`${redis_contant_1.USER_TOKEN_KEY}:${user.sellerId}`, jwtSign, 'EX', 60 * 60 * 24);
        return { token: jwtSign };
    }
    async authLogin(reqLoginDto) {
        return { sellserId: '1478093654' };
        let info = {};
        await this.sharedService.author('https://openapi.kwaixiaodian.com/oauth2/access_token', {
            code: reqLoginDto.code,
        }).then(res => {
            info = res;
        });
        console.log('refresh_token', info.refresh_token);
        console.log('access_token', info.access_token);
        await this.sharedService.get({}, 'open.user.seller.get', info.access_token || info.refresh_token).then(async (seller) => {
            const data = seller.data.data;
            info = Object.assign(Object.assign({}, info), data);
            await this.sellerService.sellerAllInfo(data.sellerId).then(async (res) => {
                if (!res) {
                    await this.sellerService.addSeller(data).then(addres => {
                        console.log(addres);
                    });
                }
            });
        });
        await this.redis.set(`access_token:${info.sellerId}`, info.access_token);
        return { sellserId: info.sellerId };
    }
    async logout(token) {
        try {
            const payload = this.jwtService.verify(token);
            if (await this.redis.get(`${redis_contant_1.USER_TOKEN_KEY}:${payload.userId}`)) {
                await this.redis.del(`${redis_contant_1.USER_TOKEN_KEY}:${payload.userId}`);
            }
        }
        catch (error) { }
    }
    async getInfo(userId) {
        console.log('=======');
        const seller = await this.sellerService.findById(userId);
        if (!seller)
            throw new api_exception_1.ApiException('用户信息已被修改', 401);
        return {
            seller,
        };
    }
    async getRouterByUser(userId) {
        return await this.menuService.getMenuList(true, []);
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [shared_service_1.SharedService, Object, jwt_1.JwtService,
        user_service_1.UserService,
        menu_service_1.MenuService,
        log_service_1.LogService,
        config_1.ConfigService,
        seller_service_1.SellerService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map