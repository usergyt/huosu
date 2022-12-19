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
exports.RepeatSubmitGuard = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const decorator_contant_1 = require("../contants/decorator.contant");
const api_exception_1 = require("../exceptions/api.exception");
let RepeatSubmitGuard = class RepeatSubmitGuard {
    constructor(reflector, redis) {
        this.reflector = reflector;
        this.redis = redis;
    }
    async canActivate(context) {
        const repeatSubmitOption = this.reflector.get(decorator_contant_1.REOEATSUBMIT_METADATA, context.getHandler());
        if (!repeatSubmitOption)
            return true;
        const request = context.switchToHttp().getRequest();
        const cache = await this.redis.get(request.url);
        const data = {
            body: request.body,
            prams: request.params,
            query: request.query,
        };
        const dataString = JSON.stringify(data);
        if (!cache) {
            if (dataString) {
                await this.redis.set(request.url, dataString, 'EX', repeatSubmitOption.interval);
            }
        }
        else {
            if (dataString && cache === dataString) {
                throw new api_exception_1.ApiException(repeatSubmitOption.message);
            }
        }
        return true;
    }
};
RepeatSubmitGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [core_1.Reflector, Object])
], RepeatSubmitGuard);
exports.RepeatSubmitGuard = RepeatSubmitGuard;
//# sourceMappingURL=repeat-submit.guard.js.map