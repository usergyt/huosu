"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./login.service");
const login_controller_1 = require("./login.controller");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../system/auth/auth.constants");
const auth_module_1 = require("../system/auth/auth.module");
const user_module_1 = require("../system/user/user.module");
const seller_module_1 = require("../system/user/seller.module");
const menu_module_1 = require("../system/menu/menu.module");
const log_module_1 = require("../monitor/log/log.module");
let LoginModule = class LoginModule {
};
LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: auth_constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '168h' },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            menu_module_1.MenuModule,
            log_module_1.LogModule,
            seller_module_1.SellerModule
        ],
        controllers: [login_controller_1.LoginController],
        providers: [login_service_1.LoginService],
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map