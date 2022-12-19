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
exports.SysConfigController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const data_obj_class_1 = require("../../../common/class/data-obj.class");
const api_data_response_decorator_1 = require("../../../common/decorators/api-data-response.decorator");
const api_paginated_response_decorator_1 = require("../../../common/decorators/api-paginated-response.decorator");
const keep_decorator_1 = require("../../../common/decorators/keep.decorator");
const log_decorator_1 = require("../../../common/decorators/log.decorator");
const repeat_submit_decorator_1 = require("../../../common/decorators/repeat-submit.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const user_decorator_1 = require("../../../common/decorators/user.decorator");
const pagination_pipe_1 = require("../../../common/pipes/pagination.pipe");
const user_info_pipe_1 = require("../../../common/pipes/user-info.pipe");
const excel_service_1 = require("../../common/excel/excel.service");
const req_sys_config_dto_1 = require("./dto/req-sys-config.dto");
const sys_config_entity_1 = require("./entities/sys-config.entity");
const sys_config_service_1 = require("./sys-config.service");
let SysConfigController = class SysConfigController {
    constructor(sysConfigService, excelService) {
        this.sysConfigService = sysConfigService;
        this.excelService = excelService;
    }
    async add(reqAddConfigDto, userName) {
        reqAddConfigDto.createBy = reqAddConfigDto.updateBy = userName;
        await this.sysConfigService.addOrUpdate(reqAddConfigDto);
    }
    async list(reqConfigListDto) {
        return await this.sysConfigService.list(reqConfigListDto);
    }
    async refreshCache() {
        await this.sysConfigService.refreshCache();
    }
    async oneByconfigKey(configKey) {
        const sysConfig = await this.sysConfigService.lazyFindByConfigKey(configKey);
        return data_obj_class_1.DataObj.create(sysConfig);
    }
    async one(configId) {
        const sysConfig = await this.sysConfigService.findById(configId);
        return data_obj_class_1.DataObj.create(sysConfig);
    }
    async updata(sysConfig, userName) {
        sysConfig.updateBy = userName;
        await this.sysConfigService.addOrUpdate(sysConfig);
    }
    async delete(configIds) {
        await this.sysConfigService.delete(configIds.split(','));
    }
    async export(reqConfigListDto) {
        const { rows } = await this.sysConfigService.list(reqConfigListDto);
        const file = await this.excelService.export(sys_config_entity_1.SysConfig, rows);
        return new common_1.StreamableFile(file);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u53C2\u6570" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)(),
    (0, log_decorator_1.Log)({
        title: '参数设置',
        businessType: log_decorator_1.BusinessTypeEnum.insert,
    }),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:config:add'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_sys_config_dto_1.ReqAddConfigDto, String]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "add", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u53C2\u6570\u5217\u8868" }),
    (0, common_1.Get)('list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:config:query'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(sys_config_entity_1.SysConfig),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_sys_config_dto_1.ReqConfigListDto]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "list", null);
__decorate([
    openapi.ApiOperation({ description: "\u6E05\u9664\u7F13\u5B58" }),
    (0, common_1.Delete)('refreshCache'),
    (0, log_decorator_1.Log)({
        title: '参数设置',
        businessType: log_decorator_1.BusinessTypeEnum.clean,
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "refreshCache", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7 configKey \u67E5\u8BE2\u53C2\u6570(\u7F13\u5B58\u67E5\u8BE2)" }),
    (0, common_1.Get)('/configKey/:configKey'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.string, sys_config_entity_1.SysConfig),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('configKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "oneByconfigKey", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7id\u67E5\u8BE2\u53C2\u6570" }),
    (0, common_1.Get)(':configId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:config:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, sys_config_entity_1.SysConfig),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "one", null);
__decorate([
    openapi.ApiOperation({ description: "\u4FEE\u6539\u53C2\u6570" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)(),
    (0, log_decorator_1.Log)({
        title: '参数设置',
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:config:edit'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sys_config_entity_1.SysConfig, String]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "updata", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u53C2\u6570" }),
    (0, common_1.Delete)(':configIds'),
    (0, log_decorator_1.Log)({
        title: '参数设置',
        businessType: log_decorator_1.BusinessTypeEnum.delete,
    }),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:config:remove'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('configIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "delete", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('export'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:config:export'),
    (0, log_decorator_1.Log)({
        title: '参数设置',
        businessType: log_decorator_1.BusinessTypeEnum.export,
    }),
    (0, keep_decorator_1.Keep)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_sys_config_dto_1.ReqConfigListDto]),
    __metadata("design:returntype", Promise)
], SysConfigController.prototype, "export", null);
SysConfigController = __decorate([
    (0, swagger_1.ApiTags)('参数设置'),
    (0, common_1.Controller)('system/config'),
    __metadata("design:paramtypes", [sys_config_service_1.SysConfigService,
        excel_service_1.ExcelService])
], SysConfigController);
exports.SysConfigController = SysConfigController;
//# sourceMappingURL=sys-config.controller.js.map