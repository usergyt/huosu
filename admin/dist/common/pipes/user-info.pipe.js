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
exports.UserInfoPipe = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const redis_contant_1 = require("../contants/redis.contant");
const user_decorator_1 = require("../decorators/user.decorator");
let UserInfoPipe = class UserInfoPipe {
    constructor(redis) {
        this.redis = redis;
    }
    async transform(value, metadata) {
        const { data } = metadata;
        if (!data)
            return value;
        if (data === user_decorator_1.SellerEnum.sellerId)
            return value;
        if (data === user_decorator_1.SellerEnum.name)
            return await this.redis.get(`${redis_contant_1.USER_USERNAME_KEY}:${value}`);
        if (data === user_decorator_1.UserEnum.userId)
            return value;
        if (data === user_decorator_1.UserEnum.userName)
            return await this.redis.get(`${redis_contant_1.USER_USERNAME_KEY}:${value}`);
        if (data === user_decorator_1.UserEnum.nickName)
            return await this.redis.get(`${redis_contant_1.USER_NICKNAME_KEY}:${value}`);
        if (data === user_decorator_1.UserEnum.deptId)
            return await this.redis.get(`${redis_contant_1.USER_DEPTID_KEY}:${value}`);
        if (data === user_decorator_1.UserEnum.deptName)
            return await this.redis.get(`${redis_contant_1.USER_DEPTNAME_KEY}:${value}`);
    }
};
UserInfoPipe = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [Object])
], UserInfoPipe);
exports.UserInfoPipe = UserInfoPipe;
//# sourceMappingURL=user-info.pipe.js.map