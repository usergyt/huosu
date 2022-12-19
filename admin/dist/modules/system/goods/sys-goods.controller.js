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
exports.SysGoodsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const data_obj_class_1 = require("../../../common/class/data-obj.class");
const api_data_response_decorator_1 = require("../../../common/decorators/api-data-response.decorator");
const api_paginated_response_decorator_1 = require("../../../common/decorators/api-paginated-response.decorator");
const log_decorator_1 = require("../../../common/decorators/log.decorator");
const repeat_submit_decorator_1 = require("../../../common/decorators/repeat-submit.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const user_decorator_1 = require("../../../common/decorators/user.decorator");
const pagination_pipe_1 = require("../../../common/pipes/pagination.pipe");
const user_info_pipe_1 = require("../../../common/pipes/user-info.pipe");
const excel_service_1 = require("../../common/excel/excel.service");
const req_sys_goods_dto_1 = require("./dto/req-sys-goods.dto");
const sys_goods_entity_1 = require("./entities/sys-goods.entity");
const sys_goods_service_1 = require("./sys-goods.service");
const httpServiceApi_service_1 = require("../server-common/httpServiceApi.service");
let SysGoodsController = class SysGoodsController {
    constructor(sysGoodsService, excelService, HttpServiceApi) {
        this.sysGoodsService = sysGoodsService;
        this.excelService = excelService;
        this.HttpServiceApi = HttpServiceApi;
    }
    async add(reqAddGoodsDto, userName) {
        reqAddGoodsDto.createBy = reqAddGoodsDto.updateBy = userName;
        await this.sysGoodsService.addOrUpdate(reqAddGoodsDto);
    }
    async collectList(reqGoodsListByUrlDto) {
        return await this.sysGoodsService.getGoodsInfo(reqGoodsListByUrlDto);
    }
    async list(reqGoodsListDto) {
        const tasklist = await this.sysGoodsService.list(reqGoodsListDto);
        return data_obj_class_1.DataObj.create(tasklist);
    }
    async delete(goods_id) {
        await this.sysGoodsService.delete(goods_id.split(","));
    }
    async getCategory() {
        return await this.HttpServiceApi.getCategory();
    }
    async getExpressList(userId) {
        return this.HttpServiceApi.getgoodsDetail(15283320074654);
    }
    async submit(reqGoodsListByUrlDto) {
        return await this.sysGoodsService.getGoodsInfo(reqGoodsListByUrlDto);
    }
    async refreshCache() {
        await this.sysGoodsService.refreshCache();
    }
    async oneByconfigKey(configKey) {
        const sysConfig = await this.sysGoodsService.lazyFindByConfigKey(configKey);
        return data_obj_class_1.DataObj.create(sysConfig);
    }
    async one(configId) {
        const sysConfig = await this.sysGoodsService.findById(configId);
        return data_obj_class_1.DataObj.create(sysConfig);
    }
    async updata(sysConfig, userName) {
        sysConfig.updateBy = userName;
        await this.sysGoodsService.addOrUpdate(sysConfig);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u5546\u54C1" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)(),
    (0, log_decorator_1.Log)({
        title: "商品新增",
        businessType: log_decorator_1.BusinessTypeEnum.insert,
    }),
    (0, requires_permissions_decorator_1.RequiresPermissions)("system:goods:add"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_sys_goods_dto_1.ReqAddGoodsDto, String]),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "add", null);
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u91C7\u96C6\u5730\u5740-\u642C\u5BB6" }),
    (0, common_1.Post)("collect"),
    (0, requires_permissions_decorator_1.RequiresPermissions)("system:goods:query"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_sys_goods_dto_1.ReqGoodsListByUrlDto]),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "collectList", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u53C2\u6570\u5217\u8868" }),
    (0, common_1.Get)("tasklist"),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(sys_goods_entity_1.GoodsCopy),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_sys_goods_dto_1.ReqGoodsListDto]),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "list", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u8BB0\u5F55" }),
    (0, common_1.Delete)(":goods_id"),
    (0, log_decorator_1.Log)({
        title: "复制记录",
        businessType: log_decorator_1.BusinessTypeEnum.delete,
    }),
    (0, requires_permissions_decorator_1.RequiresPermissions)("system:goods:remove"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("goods_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "delete", null);
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u7C7B\u76EE" }),
    (0, common_1.Get)("categoryList"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "getCategory", null);
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u8FD0\u8D39\u6A21\u7248" }),
    (0, common_1.Get)("expressList"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userId, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "getExpressList", null);
__decorate([
    openapi.ApiOperation({ description: "\u63D0\u4EA4" }),
    (0, common_1.Post)("submit"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_sys_goods_dto_1.ReqGoodsListByUrlDto]),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "submit", null);
__decorate([
    openapi.ApiOperation({ description: "\u6E05\u9664\u7F13\u5B58" }),
    (0, common_1.Delete)("refreshCache"),
    (0, log_decorator_1.Log)({
        title: "参数设置",
        businessType: log_decorator_1.BusinessTypeEnum.clean,
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "refreshCache", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7 configKey \u67E5\u8BE2\u53C2\u6570(\u7F13\u5B58\u67E5\u8BE2)" }),
    (0, common_1.Get)("/configKey/:configKey"),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.string, sys_goods_entity_1.GoodsCopy),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("configKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "oneByconfigKey", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7id\u67E5\u8BE2\u53C2\u6570" }),
    (0, common_1.Get)(":configId"),
    (0, requires_permissions_decorator_1.RequiresPermissions)("system:goods:query"),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, sys_goods_entity_1.GoodsCopy),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("configId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "one", null);
__decorate([
    openapi.ApiOperation({ description: "\u4FEE\u6539\u53C2\u6570" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)(),
    (0, log_decorator_1.Log)({
        title: "参数设置",
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    (0, requires_permissions_decorator_1.RequiresPermissions)("system:goods:edit"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sys_goods_entity_1.GoodsCopy, String]),
    __metadata("design:returntype", Promise)
], SysGoodsController.prototype, "updata", null);
SysGoodsController = __decorate([
    (0, swagger_1.ApiTags)("商品复制"),
    (0, common_1.Controller)("system/goods"),
    __metadata("design:paramtypes", [sys_goods_service_1.SysGoodsService,
        excel_service_1.ExcelService,
        httpServiceApi_service_1.HttpServiceApi])
], SysGoodsController);
exports.SysGoodsController = SysGoodsController;
//# sourceMappingURL=sys-goods.controller.js.map