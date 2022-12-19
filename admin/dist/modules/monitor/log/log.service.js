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
exports.LogService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const redis_contant_1 = require("../../../common/contants/redis.contant");
const shared_service_1 = require("../../../shared/shared.service");
const typeorm_2 = require("typeorm");
const logininfor_entity_1 = require("./entities/logininfor.entity");
const oper_log_entity_1 = require("./entities/oper_log.entity");
const uaParser = require("ua-parser-js");
let LogService = class LogService {
    constructor(logininforRepository, operLogRepository, redis, sharedService) {
        this.logininforRepository = logininforRepository;
        this.operLogRepository = operLogRepository;
        this.redis = redis;
        this.sharedService = sharedService;
    }
    async addOperLog(operLog) {
        return await this.operLogRepository.save(operLog);
    }
    async operLogList(reqOperLogDto) {
        const where = {};
        if (reqOperLogDto.title) {
            where.title = (0, typeorm_2.Like)(`%${reqOperLogDto.title}%`);
        }
        if (reqOperLogDto.operName) {
            where.operName = (0, typeorm_2.Like)(`%${reqOperLogDto.operName}%`);
        }
        if (reqOperLogDto.businessType) {
            where.businessType = reqOperLogDto.businessType;
        }
        if (reqOperLogDto.status) {
            where.status = reqOperLogDto.status;
        }
        if (reqOperLogDto.params) {
            where.operTime = (0, typeorm_2.Between)(reqOperLogDto.params.beginTime, moment(reqOperLogDto.params.endTime).add(1, 'day').format());
        }
        const queryBuilder = this.operLogRepository
            .createQueryBuilder('operLog')
            .where(where);
        if (reqOperLogDto.orderByColumn) {
            const order = reqOperLogDto.isAsc === 'descending' ? 'DESC' : 'ASC';
            queryBuilder.orderBy(`operLog.${reqOperLogDto.orderByColumn}`, order);
        }
        const result = await queryBuilder
            .addOrderBy('operLog.operTime', 'DESC')
            .skip(reqOperLogDto.skip)
            .take(reqOperLogDto.take)
            .getManyAndCount();
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async deleteOperLog(operLogArr) {
        return this.operLogRepository.delete(operLogArr);
    }
    async cleanOperLog() {
        return this.operLogRepository
            .createQueryBuilder('operLog')
            .delete()
            .execute();
    }
    async addLogininfor(request, msg, token) {
        const logininfor = new logininfor_entity_1.Logininfor();
        const { username } = request.body;
        const { browser, os } = uaParser(request.headers['user-agent']);
        logininfor.userName = username;
        logininfor.ipaddr = this.sharedService.getReqIP(request);
        logininfor.loginLocation = await this.sharedService.getLocation(logininfor.ipaddr);
        logininfor.status = token ? '0' : '1';
        logininfor.msg = msg;
        logininfor.loginTime = moment().format('YYYY-MM-DDTHH:mm:ss');
        logininfor.browser = browser.name + browser.version.split('.')[0];
        logininfor.os = os.name + os.version;
        if (token) {
            const user = request.user;
            const data = { deptName: '', tokenId: token };
            if (user.dept) {
                data.deptName = user.dept.deptName;
            }
            const loginUser = Object.assign(logininfor, data);
            await this.redis.set(`${redis_contant_1.USER_ONLINE_KEY}:${user.userId}`, JSON.stringify(loginUser), 'EX', 60 * 60 * 24);
        }
        return await this.logininforRepository.save(logininfor);
    }
    async logininforList(reqLogininforDto) {
        const where = {};
        if (reqLogininforDto.ipaddr) {
            where.ipaddr = (0, typeorm_2.Like)(`%${reqLogininforDto.ipaddr}%`);
        }
        if (reqLogininforDto.userName) {
            where.userName = (0, typeorm_2.Like)(`%${reqLogininforDto.userName}%`);
        }
        if (reqLogininforDto.status) {
            where.status = reqLogininforDto.status;
        }
        if (reqLogininforDto.params) {
            where.loginTime = (0, typeorm_2.Between)(reqLogininforDto.params.beginTime, moment(reqLogininforDto.params.endTime).add(1, 'day').format());
        }
        const queryBuilder = this.logininforRepository
            .createQueryBuilder('logininfor')
            .where(where);
        if (reqLogininforDto.orderByColumn) {
            const order = reqLogininforDto.isAsc === 'descending' ? 'DESC' : 'ASC';
            queryBuilder.orderBy(`logininfor.${reqLogininforDto.orderByColumn}`, order);
        }
        const result = await queryBuilder
            .skip(reqLogininforDto.skip)
            .take(reqLogininforDto.take)
            .getManyAndCount();
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async deleteLogininfor(logininforArr) {
        return this.logininforRepository.delete(logininforArr);
    }
    async cleanLogininfor() {
        return this.logininforRepository
            .createQueryBuilder('logininfor')
            .delete()
            .execute();
    }
};
LogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(logininfor_entity_1.Logininfor)),
    __param(1, (0, typeorm_1.InjectRepository)(oper_log_entity_1.OperLog)),
    __param(2, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, shared_service_1.SharedService])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map