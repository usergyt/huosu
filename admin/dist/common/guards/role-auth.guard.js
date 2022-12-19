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
exports.RoleAuthGuard = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const decorator_contant_1 = require("../contants/decorator.contant");
const redis_contant_1 = require("../contants/redis.contant");
const logical_enum_1 = require("../enums/logical.enum");
const api_exception_1 = require("../exceptions/api.exception");
let RoleAuthGuard = class RoleAuthGuard {
    constructor(reflector, redis) {
        this.reflector = reflector;
        this.redis = redis;
    }
    async canActivate(context) {
        var _a;
        const roleObj = this.reflector.getAllAndOverride(decorator_contant_1.ROLES_KEY_METADATA, [context.getHandler(), context.getClass()]);
        if (!roleObj || !roleObj.roleArr.length)
            return true;
        const request = context.switchToHttp().getRequest();
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.userId;
        const userRoleArr = JSON.parse(await this.redis.get(`${redis_contant_1.USER_ROLEKEYS_KEY}:${userId}`));
        if (userRoleArr.includes('admin'))
            return true;
        let result = false;
        if (roleObj.logical === logical_enum_1.LogicalEnum.or) {
            result = roleObj.roleArr.some((userPermission) => {
                return userRoleArr.includes(userPermission);
            });
        }
        else if (roleObj.logical === logical_enum_1.LogicalEnum.and) {
            result = roleObj.roleArr.every((userPermission) => {
                return userRoleArr.includes(userPermission);
            });
        }
        if (!result)
            throw new api_exception_1.ApiException('暂无权限访问，请联系管理员');
        return result;
    }
};
RoleAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [core_1.Reflector, Object])
], RoleAuthGuard);
exports.RoleAuthGuard = RoleAuthGuard;
//# sourceMappingURL=role-auth.guard.js.map