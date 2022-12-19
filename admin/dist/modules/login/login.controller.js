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
exports.LoginController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const data_obj_class_1 = require("../../common/class/data-obj.class");
const api_data_response_decorator_1 = require("../../common/decorators/api-data-response.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const local_auth_guard_1 = require("../../common/guards/local-auth.guard");
const res_menu_dto_1 = require("../system/menu/dto/res-menu.dto");
const req_login_dto_1 = require("./dto/req-login.dto");
const login_service_1 = require("./login.service");
let LoginController = class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    async captchaImage() {
        console.log('验证码 ');
        return await this.loginService.createImageCaptcha();
    }
    async login(reqLoginDto, req) {
        const { user } = req;
        return await this.loginService.login(req);
    }
    async authLogin(reqLoginDto, req) {
        return await this.loginService.authLogin(reqLoginDto);
    }
    async getInfo(userId) {
        console.log("******", userId);
        return await this.loginService.getInfo(userId);
    }
    async getRouters(userId) {
        const router = await this.loginService.getRouterByUser(userId);
        return data_obj_class_1.DataObj.create(router);
    }
    async logout(authorization) {
        if (authorization) {
            const token = authorization.slice(7);
            await this.loginService.logout(token);
        }
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u56FE\u7247\u9A8C\u8BC1\u7801" }),
    (0, common_1.Get)('captchaImage'),
    (0, public_decorator_1.Public)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/res-login.dto").ResImageCaptchaDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "captchaImage", null);
__decorate([
    openapi.ApiOperation({ description: "\u7528\u6237\u767B\u5F55" }),
    (0, common_1.Post)('login'),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    openapi.ApiResponse({ status: 201, type: require("./dto/res-login.dto").ResLoginDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_login_dto_1.ReqLoginDto, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
__decorate([
    openapi.ApiOperation({ description: "\u6388\u6743\u767B\u5F55" }),
    (0, common_1.Post)('authLogin'),
    (0, public_decorator_1.Public)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/res-login.dto").ResSellerDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_login_dto_1.ReqLoginDto, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "authLogin", null);
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F" }),
    (0, common_1.Get)('getInfo'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res-login.dto").ResInfo }),
    __param(0, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getInfo", null);
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u7528\u6237\u8DEF\u7531\u4FE1\u606F" }),
    (0, common_1.Get)('getRouters'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.objectArr, res_menu_dto_1.Router),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getRouters", null);
__decorate([
    openapi.ApiOperation({ description: "\u9000\u51FA\u767B\u5F55" }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('logout'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "logout", null);
LoginController = __decorate([
    (0, swagger_1.ApiTags)('登录'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map