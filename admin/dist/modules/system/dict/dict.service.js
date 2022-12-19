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
exports.DictService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const typeorm_2 = require("typeorm");
const dict_contant_1 = require("./dict.contant");
const req_dict_dto_1 = require("./dto/req-dict.dto");
const dict_data_entity_1 = require("./entities/dict_data.entity");
const dict_type_entity_1 = require("./entities/dict_type.entity");
let DictService = class DictService {
    constructor(dictTypeRepository, dictDataRepository, redis) {
        this.dictTypeRepository = dictTypeRepository;
        this.dictDataRepository = dictDataRepository;
        this.redis = redis;
    }
    async addOrUpdateType(reqAddDictTypeDto) {
        const dictType = await this.findByDictType(reqAddDictTypeDto.dictType, reqAddDictTypeDto.dictId);
        if (dictType)
            throw new api_exception_1.ApiException('该字典类型已存在，请更换');
        await this.dictTypeRepository.save(reqAddDictTypeDto);
    }
    async typeList(reqDictTypeListDto) {
        const where = {};
        if (reqDictTypeListDto.dictName) {
            where.dictName = (0, typeorm_2.Like)(`%${reqDictTypeListDto.dictName}%`);
        }
        if (reqDictTypeListDto.dictType) {
            where.dictType = (0, typeorm_2.Like)(`%${reqDictTypeListDto.dictType}%`);
        }
        if (reqDictTypeListDto.status) {
            where.status = reqDictTypeListDto.status;
        }
        if (reqDictTypeListDto.params) {
            where.createTime = (0, typeorm_2.Between)(reqDictTypeListDto.params.beginTime, moment(reqDictTypeListDto.params.endTime).add(1, 'day').format());
        }
        const result = await this.dictTypeRepository.findAndCount({
            where,
            order: { createTime: 1 },
            skip: reqDictTypeListDto.skip,
            take: reqDictTypeListDto.take,
        });
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async findByDictType(dictType, dictId) {
        const where = {
            dictType,
        };
        if (dictId) {
            where.dictId = (0, typeorm_2.Not)(dictId);
        }
        return this.dictTypeRepository.findOne({
            where,
        });
    }
    async deleteByDictIdArr(dictIdArr) {
        await this.dictTypeRepository.delete(dictIdArr);
    }
    async findDictTypeById(dictId) {
        return await this.dictTypeRepository.findOneBy({ dictId });
    }
    async getDictDataByDictType(dictType) {
        const dictDataArrString = await this.redis.get(`${dict_contant_1.DICTTYPE_KEY}:${dictType}`);
        if (dictDataArrString) {
            return JSON.parse(dictDataArrString);
        }
        else {
            const dictDataArr = await this.dictDataRepository
                .createQueryBuilder('dictData')
                .innerJoin('dictData.dictType', 'dictType', 'dictType.status = 0 and dictType.dictType = :dictType', { dictType })
                .where('dictData.status = 0')
                .getMany();
            await this.redis.set(`${dict_contant_1.DICTTYPE_KEY}:${dictType}`, JSON.stringify(dictDataArr));
            return dictDataArr;
        }
    }
    async refreshCache() {
        const keyArr = await this.redis.keys(`${dict_contant_1.DICTTYPE_KEY}:*`);
        if (keyArr && keyArr.length) {
            await this.redis.del(keyArr);
        }
    }
    async dictDataList(reqDictDataListDto) {
        const where = {};
        if (reqDictDataListDto.status) {
            where.status = reqDictDataListDto.status;
        }
        if (reqDictDataListDto.dictLabel) {
            where.dictLabel = (0, typeorm_2.Like)(`%${reqDictDataListDto.dictLabel}%`);
        }
        const result = await this.dictDataRepository
            .createQueryBuilder('dictData')
            .innerJoin('dictData.dictType', 'dictType', 'dictType.dictType = :dictType', { dictType: reqDictDataListDto.dictType })
            .where(where)
            .orderBy('dictData.dictSort', 'ASC')
            .addOrderBy('dictData.createTime', 'ASC')
            .skip(reqDictDataListDto.skip)
            .take(reqDictDataListDto.take)
            .getManyAndCount();
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async addOrUpdateDictData(reqAddDictDataDto) {
        const oneDictData = await this.getDictDataByTypeOrValue(reqAddDictDataDto.dictType, reqAddDictDataDto.dictValue, reqAddDictDataDto.dictCode);
        if (oneDictData)
            throw new api_exception_1.ApiException('该数据键值已存在，请更换');
        const dictType = await this.findByDictType(reqAddDictDataDto.dictType);
        const dictData = Object.assign(new dict_data_entity_1.DictData(), reqAddDictDataDto);
        dictData.dictType = dictType;
        return this.dictDataRepository.save(dictData);
    }
    async findDictDataById(dictCode) {
        const dictData = await this.dictDataRepository.findOne({
            where: {
                dictCode,
            },
            relations: {
                dictType: true,
            },
        });
        const reqUpdateDictDataDto = Object.assign(new req_dict_dto_1.ReqUpdateDictDataDto(), dictData);
        reqUpdateDictDataDto.dictType = dictData.dictType.dictType;
        return reqUpdateDictDataDto;
    }
    async deleteDictDataByids(dictDataArr) {
        return await this.dictDataRepository.delete(dictDataArr);
    }
    async getDictDataByTypeOrValue(dictType, dictValue, dictCode) {
        const queryBuilder = this.dictDataRepository
            .createQueryBuilder('dictData')
            .innerJoin('dictData.dictType', 'dictType', 'dictType.dictType = :dictType', { dictType })
            .where({ dictValue });
        if (dictCode) {
            queryBuilder.andWhere({
                dictCode: (0, typeorm_2.Not)(dictCode),
            });
        }
        return await queryBuilder.getOne();
    }
};
DictService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dict_type_entity_1.DictType)),
    __param(1, (0, typeorm_1.InjectRepository)(dict_data_entity_1.DictData)),
    __param(2, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object])
], DictService);
exports.DictService = DictService;
//# sourceMappingURL=dict.service.js.map