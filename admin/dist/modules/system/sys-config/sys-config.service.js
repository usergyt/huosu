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
exports.SysConfigService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const typeorm_2 = require("typeorm");
const sys_config_entity_1 = require("./entities/sys-config.entity");
const sys_config_contant_1 = require("./sys-config.contant");
let SysConfigService = class SysConfigService {
    constructor(sysConfigRepository, redis) {
        this.sysConfigRepository = sysConfigRepository;
        this.redis = redis;
    }
    async addOrUpdate(reqAddConfigDto) {
        const sysConfig = await this.findByConfigKey(reqAddConfigDto.configKey, reqAddConfigDto.configId);
        if (sysConfig)
            throw new api_exception_1.ApiException('参数键值已存在，请更换');
        return await this.sysConfigRepository.save(reqAddConfigDto);
    }
    async list(reqConfigListDto) {
        const where = {};
        if (reqConfigListDto.configName) {
            where.configName = (0, typeorm_2.Like)(`%${reqConfigListDto.configName}%`);
        }
        if (reqConfigListDto.configKey) {
            where.configKey = (0, typeorm_2.Like)(`%${reqConfigListDto.configKey}%`);
        }
        if (reqConfigListDto.configType) {
            where.configType = reqConfigListDto.configType;
        }
        if (reqConfigListDto.params) {
            where.createTime = (0, typeorm_2.Between)(reqConfigListDto.params.beginTime, moment(reqConfigListDto.params.endTime).add(1, 'day').format());
        }
        const result = await this.sysConfigRepository.findAndCount({
            where,
            skip: reqConfigListDto.skip,
            take: reqConfigListDto.take,
        });
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async findById(configId) {
        return await this.sysConfigRepository.findOneBy({ configId });
    }
    async delete(configIdArr) {
        return await this.sysConfigRepository.delete(configIdArr);
    }
    async findByConfigKey(configKey, configId) {
        const where = { configKey };
        if (configId) {
            where.configId = (0, typeorm_2.Not)(configId);
        }
        return await this.sysConfigRepository.findOne({ where });
    }
    async lazyFindByConfigKey(configKey) {
        let configValue = await this.redis.get(`${sys_config_contant_1.SYSCONFIG_KEY}:${configKey}`);
        if (configValue) {
            return configValue;
        }
        else {
            const sysConfig = await this.sysConfigRepository.findOneBy({ configKey });
            configValue = sysConfig ? sysConfig.configValue : '';
            await this.redis.set(`${sys_config_contant_1.SYSCONFIG_KEY}:${configKey}`, configValue);
            return configValue;
        }
    }
    async refreshCache() {
        const keyArr = await this.redis.keys(`${sys_config_contant_1.SYSCONFIG_KEY}:*`);
        if (keyArr && keyArr.length) {
            await this.redis.del(keyArr);
        }
    }
};
SysConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sys_config_entity_1.SysConfig)),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], SysConfigService);
exports.SysConfigService = SysConfigService;
//# sourceMappingURL=sys-config.service.js.map