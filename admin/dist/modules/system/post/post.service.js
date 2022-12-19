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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async findByPostCode(postCode) {
        return await this.postRepository.findOneBy({ postCode });
    }
    async addOrUpdate(reqAddPostDto) {
        await this.postRepository.save(reqAddPostDto);
    }
    async list(reqPostListDto) {
        const where = {};
        if (reqPostListDto.postCode) {
            where.postCode = (0, typeorm_2.Like)(`%${reqPostListDto.postCode}%`);
        }
        if (reqPostListDto.postName) {
            where.postName = (0, typeorm_2.Like)(`%${reqPostListDto.postName}%`);
        }
        if (reqPostListDto.status) {
            where.status = reqPostListDto.status;
        }
        const result = await this.postRepository.findAndCount({
            select: [
                'postId',
                'postCode',
                'postName',
                'createTime',
                'postSort',
                'status',
                'createBy',
                'remark',
            ],
            where,
            order: {
                postSort: 1,
                createTime: 1,
            },
            skip: reqPostListDto.skip,
            take: reqPostListDto.take,
        });
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async findById(postId) {
        return await this.postRepository.findOneBy({ postId });
    }
    async delete(postIdArr) {
        return await this.postRepository.delete(postIdArr);
    }
    async listByIdArr(idArr) {
        return this.postRepository.find({
            where: {
                postId: (0, typeorm_2.In)(idArr),
            },
        });
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map