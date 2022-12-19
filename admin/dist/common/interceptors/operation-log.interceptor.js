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
exports.OperationLogInterceptor = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const moment = require("moment");
const operators_1 = require("rxjs/operators");
const oper_log_entity_1 = require("../../modules/monitor/log/entities/oper_log.entity");
const log_service_1 = require("../../modules/monitor/log/log.service");
const shared_service_1 = require("../../shared/shared.service");
const decorator_contant_1 = require("../contants/decorator.contant");
const redis_contant_1 = require("../contants/redis.contant");
const all_exception_filter_1 = require("../filters/all-exception.filter");
let OperationLogInterceptor = class OperationLogInterceptor {
    constructor(reflector, redis, logService, sharedService) {
        this.reflector = reflector;
        this.redis = redis;
        this.logService = logService;
        this.sharedService = sharedService;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                return this.log(context, data);
            },
            error: (e) => {
                const allExceptionsFilter = new all_exception_filter_1.AllExceptionsFilter();
                const { result } = allExceptionsFilter.errorResult(e);
                return this.log(context, result);
            },
        }));
    }
    async log(context, data) {
        const logOption = this.reflector.get(decorator_contant_1.LOG_KEY_METADATA, context.getHandler());
        if (!logOption)
            return;
        const request = context.switchToHttp().getRequest();
        const method = request.method.toUpperCase();
        const className = context.getClass().name;
        const handlerName = context.getHandler().name;
        const operLog = new oper_log_entity_1.OperLog();
        operLog.title = logOption.title;
        operLog.businessType = logOption.businessType;
        operLog.requestMethod = method;
        operLog.method = `${className}.${handlerName}()`;
        if (request.user) {
            const userId = request.user.userId;
            const userName = await this.redis.get(`${redis_contant_1.USER_USERNAME_KEY}:${userId}`);
            operLog.operName = userName;
            const deptName = await this.redis.get(`${redis_contant_1.USER_DEPTNAME_KEY}:${userId}`);
            operLog.deptName = deptName;
            operLog.operUrl = request.url;
            operLog.operIp = this.sharedService.getReqIP(request);
            operLog.operLocation = await this.sharedService.getLocation(operLog.operIp);
            if (logOption.isSaveRequestData) {
                const data = {
                    params: request.params,
                    query: request.query,
                    body: request.body,
                };
                operLog.operParam = JSON.stringify(data);
            }
            if ((data && data.code === 200) || data instanceof common_1.StreamableFile) {
                operLog.status = 0;
            }
            else {
                operLog.status = 1;
                operLog.errorMsg = data && data.msg;
            }
            if (logOption.isSaveResponseData) {
                operLog.jsonResult = JSON.stringify(data);
            }
            operLog.operTime = moment().format('YYYY-MM-DDTHH:mm:ss');
            return this.logService.addOperLog(operLog);
        }
    }
};
OperationLogInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [core_1.Reflector, Object, log_service_1.LogService,
        shared_service_1.SharedService])
], OperationLogInterceptor);
exports.OperationLogInterceptor = OperationLogInterceptor;
//# sourceMappingURL=operation-log.interceptor.js.map