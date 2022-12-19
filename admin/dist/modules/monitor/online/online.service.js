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
exports.OnlineService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const redis_contant_1 = require("../../../common/contants/redis.contant");
let OnlineService = class OnlineService {
    constructor(redis) {
        this.redis = redis;
    }
    async online({ ipaddr = '', userName = '', }) {
        const tokenKeyArr = await this.redis.keys(`${redis_contant_1.USER_TOKEN_KEY}:*`);
        const primiseArr = tokenKeyArr.map(async (item) => {
            const onlineKey = redis_contant_1.USER_ONLINE_KEY + item.replace(redis_contant_1.USER_TOKEN_KEY, '');
            return JSON.parse(await this.redis.get(onlineKey));
        });
        const allOnline = await Promise.all(primiseArr);
        const rows = allOnline.filter((item) => {
            if (!item)
                return false;
            return item.ipaddr.includes(ipaddr) && item.userName.includes(userName);
        });
        return {
            rows,
            total: rows.length,
        };
    }
    async deletOnline(tokenKey) {
        await this.redis.del(tokenKey);
    }
};
OnlineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [Object])
], OnlineService);
exports.OnlineService = OnlineService;
//# sourceMappingURL=online.service.js.map