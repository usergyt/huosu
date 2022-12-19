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
exports.SellerService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const redis_contant_1 = require("../../../common/contants/redis.contant");
const shared_service_1 = require("../../../shared/shared.service");
const typeorm_2 = require("typeorm");
const seller_entity_1 = require("./entities/seller.entity");
let SellerService = class SellerService {
    constructor(sellerRepository, sharedService, redis) {
        this.sellerRepository = sellerRepository;
        this.sharedService = sharedService;
        this.redis = redis;
    }
    async sellerAllInfo(sellerId) {
        const seller = await this.sellerRepository
            .createQueryBuilder('seller')
            .select('seller.sellerId')
            .addSelect('seller.name')
            .addSelect('seller.sex')
            .addSelect('seller.head')
            .addSelect('seller.bigHead')
            .where({
            sellerId: sellerId
        })
            .getOne();
        return seller;
    }
    async findOneBySellerId(sellerId) {
        return await this.sellerRepository.findOne({
            select: ['sellerId', 'name', 'sex', 'head', 'bigHead', 'staffId'],
            where: {
                sellerId: sellerId,
            },
        });
    }
    async addSeller(reqAddSellerDto) {
        await this.sellerRepository.save(reqAddSellerDto);
    }
    async updateSeller(reqUpdateSellerDto) {
        await this.sellerRepository.save(reqUpdateSellerDto);
        if (await this.redis.get(`${redis_contant_1.USER_VERSION_KEY}:${reqUpdateSellerDto.sellerId}`)) {
            await this.redis.set(`${redis_contant_1.USER_VERSION_KEY}:${reqUpdateSellerDto.sellerId}`, 2);
        }
    }
    async delete(sellerId, sellerIdOper) {
        return await this.sellerRepository
            .createQueryBuilder()
            .update()
            .set({
            updateBy: sellerId,
            state: '2',
        })
            .where({
            userId: sellerId,
        })
            .execute();
    }
    async findById(sellerId) {
        return await this.sellerRepository.findOneBy({ sellerId });
    }
    async changeStatus(sellerId, state, updateBy) {
        return await this.sellerRepository
            .createQueryBuilder()
            .update()
            .set({ state, updateBy })
            .where({ sellerId })
            .execute();
    }
    async updataProfile(reqUpdataSelfDto, sellerId) {
        return await this.sellerRepository
            .createQueryBuilder()
            .update()
            .set(reqUpdataSelfDto)
            .where({ sellerId })
            .execute();
    }
};
SellerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(seller_entity_1.Seller)),
    __param(2, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        shared_service_1.SharedService, Object])
], SellerService);
exports.SellerService = SellerService;
//# sourceMappingURL=seller.service.js.map