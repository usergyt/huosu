"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const sys_config_module_1 = require("./modules/system/sys-config/sys-config.module");
const common_module_1 = require("./modules/common/common.module");
const login_module_1 = require("./modules/login/login.module");
const shared_module_1 = require("./shared/shared.module");
const common_1 = require("@nestjs/common");
const configuration_1 = require("./config/configuration");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/system/auth/auth.module");
const user_module_1 = require("./modules/system/user/user.module");
const seller_module_1 = require("./modules/system/user/seller.module");
const dict_module_1 = require("./modules/system/dict/dict.module");
const notice_module_1 = require("./modules/system/notice/notice.module");
const post_module_1 = require("./modules/system/post/post.module");
const dept_module_1 = require("./modules/system/dept/dept.module");
const menu_module_1 = require("./modules/system/menu/menu.module");
const role_module_1 = require("./modules/system/role/role.module");
const log_module_1 = require("./modules/monitor/log/log.module");
const online_module_1 = require("./modules/monitor/online/online.module");
const job_module_1 = require("./modules/monitor/job/job.module");
const sys_goods_module_1 = require("./modules/system/goods/sys-goods.module");
const server_module_1 = require("./modules/monitor/server/server.module");
const job_service_1 = require("./modules/monitor/job/job.service");
const httpServiceApi_module_1 = require("./modules/system/server-common/httpServiceApi.module");
const providers = [job_service_1.JobService];
function createAliasProviders() {
    const aliasProviders = [];
    for (const p of providers) {
        aliasProviders.push({
            provide: p.name,
            useExisting: p,
        });
    }
    return aliasProviders;
}
const aliasProviders = createAliasProviders();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            shared_module_1.SharedModule,
            common_module_1.CommonModule,
            login_module_1.LoginModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            seller_module_1.SellerModule,
            dict_module_1.DictModule,
            sys_config_module_1.SysConfigModule,
            notice_module_1.NoticeModule,
            post_module_1.PostModule,
            dept_module_1.DeptModule,
            menu_module_1.MenuModule,
            role_module_1.RoleModule,
            log_module_1.LogModule,
            online_module_1.OnlineModule,
            job_module_1.JobModule,
            sys_goods_module_1.SysGoodsModule,
            server_module_1.ServerModule,
            httpServiceApi_module_1.HttpServiceApiModule
        ],
        providers: [...aliasProviders],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map