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
exports.NoticeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notice_entity_1 = require("./entities/notice.entity");
let NoticeService = class NoticeService {
    constructor(noticeRepository) {
        this.noticeRepository = noticeRepository;
    }
    async addOrUpdate(reqAddNoticeDto) {
        return await this.noticeRepository.save(reqAddNoticeDto);
    }
    async list(reqNoeiceList) {
        const where = {};
        if (reqNoeiceList.noticeTitle) {
            where.noticeTitle = (0, typeorm_2.Like)(`%${reqNoeiceList.noticeTitle}%`);
        }
        if (reqNoeiceList.createBy) {
            where.createBy = (0, typeorm_2.Like)(`%${reqNoeiceList.createBy}%`);
        }
        if (reqNoeiceList.noticeType) {
            where.noticeType = reqNoeiceList.noticeType;
        }
        const result = await this.noticeRepository.findAndCount({
            select: [
                'noticeId',
                'noticeTitle',
                'createBy',
                'createTime',
                'noticeType',
                'status',
            ],
            where,
            skip: reqNoeiceList.skip,
            take: reqNoeiceList.take,
        });
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async findById(noticeId) {
        return this.noticeRepository.findOneBy({ noticeId });
    }
    async delete(noticeIdArr) {
        return this.noticeRepository.delete(noticeIdArr);
    }
};
NoticeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notice_entity_1.Notice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NoticeService);
exports.NoticeService = NoticeService;
//# sourceMappingURL=notice.service.js.map