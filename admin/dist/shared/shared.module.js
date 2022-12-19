"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const shared_service_1 = require("./shared.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const ioredis_1 = require("@nestjs-modules/ioredis");
const core_1 = require("@nestjs/core");
const reponse_transform_interceptor_1 = require("../common/interceptors/reponse-transform.interceptor");
const operation_log_interceptor_1 = require("../common/interceptors/operation-log.interceptor");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const permission_auth_guard_1 = require("../common/guards/permission-auth.guard");
const role_auth_guard_1 = require("../common/guards/role-auth.guard");
const log_module_1 = require("../modules/monitor/log/log.module");
const bull_1 = require("@nestjs/bull");
const data_scope_interceptor_1 = require("../common/interceptors/data-scope.interceptor");
const repeat_submit_guard_1 = require("../common/guards/repeat-submit.guard");
const demo_environment_guard_1 = require("../common/guards/demo-environment.guard");
const all_exception_filter_1 = require("../common/filters/all-exception.filter");
const throttler_1 = require("@nestjs/throttler");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    autoLoadEntities: true,
                    type: configService.get('database.type') || 'mysql',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.database'),
                    autoLoadModels: configService.get('database.autoLoadModels'),
                    synchronize: configService.get('database.synchronize'),
                    logging: configService.get('database.logging'),
                }),
                inject: [config_1.ConfigService],
            }),
            ioredis_1.RedisModule.forRootAsync({
                useFactory: (configService) => configService.get('redis'),
                inject: [config_1.ConfigService],
            }),
            bull_1.BullModule.forRootAsync({
                useFactory: async (configService) => ({
                    redis: {
                        host: configService.get('bullRedis.host'),
                        port: configService.get('bullRedis.port'),
                        password: configService.get('bullRedis.password'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 60,
            }),
            log_module_1.LogModule,
        ],
        controllers: [],
        providers: [
            shared_service_1.SharedService,
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                    transform: true,
                }),
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_auth_guard_1.RoleAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: permission_auth_guard_1.PermissionAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: repeat_submit_guard_1.RepeatSubmitGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: demo_environment_guard_1.DemoEnvironmentGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: operation_log_interceptor_1.OperationLogInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: reponse_transform_interceptor_1.ReponseTransformInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: data_scope_interceptor_1.DataScopeInterceptor,
            },
        ],
        exports: [shared_service_1.SharedService],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map