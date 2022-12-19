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
exports.SellerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../../common/decorators/user.decorator");
const user_info_pipe_1 = require("../../../common/pipes/user-info.pipe");
const req_seller_dto_1 = require("./dto/req-seller.dto");
const user_decorator_2 = require("../../../common/decorators/user.decorator");
const seller_service_1 = require("./seller.service");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const log_decorator_1 = require("../../../common/decorators/log.decorator");
const repeat_submit_decorator_1 = require("../../../common/decorators/repeat-submit.decorator");
let SellerController = class SellerController {
    constructor(sellerService) {
        this.sellerService = sellerService;
    }
    async profile(sellerId) {
        const data = await this.sellerService.sellerAllInfo(sellerId);
        return {
            data,
        };
    }
    async updataProfile(reqUpdataSelfDto, sellerId) {
        await this.sellerService.updataProfile(reqUpdataSelfDto, sellerId);
    }
    async one(sellerId) {
        const seller = (await this.sellerService.sellerAllInfo(sellerId));
        return seller;
    }
    async add(reqAddSellerDto, sellerId) {
        const seller = await this.sellerService.findOneBySellerId(reqAddSellerDto.sellerId);
        if (seller)
            throw new api_exception_1.ApiException('该用户名已存在，请更换');
        reqAddSellerDto.createBy = reqAddSellerDto.updateBy = sellerId;
        await this.sellerService.addSeller(reqAddSellerDto);
    }
    async changeStatus(reqChangeStatusDto, sellerId) {
        await this.sellerService.changeStatus(reqChangeStatusDto.sellerId, reqChangeStatusDto.state, sellerId);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F" }),
    (0, common_1.Get)('profile'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, user_decorator_2.Seller)(user_decorator_1.SellerEnum.sellerId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "profile", null);
__decorate([
    openapi.ApiOperation({ description: "\u66F4\u6539\u4E2A\u4EBA\u7528\u6237\u4FE1\u606F" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('profile'),
    (0, log_decorator_1.Log)({
        title: '商户管理',
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_2.Seller)(user_decorator_1.SellerEnum.sellerId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_seller_dto_1.ReqUpdateSellerDto, String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "updataProfile", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7id\u67E5\u8BE2\u7528\u6237\u4FE1\u606F" }),
    (0, common_1.Get)(':sellerId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res-seller.dto").ResSellerDto }),
    __param(0, (0, common_1.Param)('sellerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "one", null);
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u7528\u6237" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)(),
    (0, log_decorator_1.Log)({
        title: '商户管理',
        businessType: log_decorator_1.BusinessTypeEnum.insert,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_2.Seller)(user_decorator_1.SellerEnum.sellerId, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_seller_dto_1.ReqAddSellerDto, String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "add", null);
__decorate([
    openapi.ApiOperation({ description: "\u6539\u53D8\u7528\u6237\u72B6\u6001" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('changeStatus'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_2.Seller)(user_decorator_1.SellerEnum.sellerId, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_seller_dto_1.ReqAddSellerDto, String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "changeStatus", null);
SellerController = __decorate([
    (0, swagger_1.ApiTags)('商户管理'),
    (0, common_1.Controller)('system/seller'),
    __metadata("design:paramtypes", [seller_service_1.SellerService])
], SellerController);
exports.SellerController = SellerController;
//# sourceMappingURL=seller.controller.js.map