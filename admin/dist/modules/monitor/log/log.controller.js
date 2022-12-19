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
exports.LogController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_paginated_response_decorator_1 = require("../../../common/decorators/api-paginated-response.decorator");
const keep_decorator_1 = require("../../../common/decorators/keep.decorator");
const log_decorator_1 = require("../../../common/decorators/log.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const pagination_pipe_1 = require("../../../common/pipes/pagination.pipe");
const excel_service_1 = require("../../common/excel/excel.service");
const req_log_dto_1 = require("./dto/req-log.dto");
const logininfor_entity_1 = require("./entities/logininfor.entity");
const oper_log_entity_1 = require("./entities/oper_log.entity");
const log_service_1 = require("./log.service");
let LogController = class LogController {
    constructor(logService, excelService) {
        this.logService = logService;
        this.excelService = excelService;
    }
    async operLogList(reqOperLogDto) {
        return await this.logService.operLogList(reqOperLogDto);
    }
    async cleanOperLog() {
        await this.logService.cleanOperLog();
    }
    async deleteOperLog(operLogIds) {
        const operLogArr = operLogIds.split(',');
        await this.logService.deleteOperLog(operLogArr);
    }
    async exportOperlog(reqOperLogDto) {
        const { rows } = await this.logService.operLogList(reqOperLogDto);
        const file = await this.excelService.export(oper_log_entity_1.OperLog, rows);
        return new common_1.StreamableFile(file);
    }
    async logininforList(reqLogininforDto) {
        return await this.logService.logininforList(reqLogininforDto);
    }
    async cleanLogininfor() {
        await this.logService.cleanLogininfor();
    }
    async deleteLogininfor(logininforIds) {
        const logininforArr = logininforIds.split(',');
        await this.logService.deleteLogininfor(logininforArr);
    }
    async exportLogininfor(reqLogininforDto) {
        const { rows } = await this.logService.logininforList(reqLogininforDto);
        const file = await this.excelService.export(logininfor_entity_1.Logininfor, rows);
        return new common_1.StreamableFile(file);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u64CD\u4F5C\u8BB0\u5F55" }),
    (0, common_1.Get)('operlog/list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:operlog:query'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(oper_log_entity_1.OperLog),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_log_dto_1.ReqOperLogDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "operLogList", null);
__decorate([
    openapi.ApiOperation({ description: "\u6E05\u7A7A\u64CD\u4F5C\u8BB0\u5F55" }),
    (0, common_1.Delete)('operlog/clean'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:operlog:remove'),
    (0, log_decorator_1.Log)({
        title: '日志管理',
        businessType: log_decorator_1.BusinessTypeEnum.clean,
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LogController.prototype, "cleanOperLog", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u64CD\u4F5C\u65E5\u5FD7" }),
    (0, common_1.Delete)('operlog/:operLogIds'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:operlog:remove'),
    (0, log_decorator_1.Log)({
        title: '日志管理',
        businessType: log_decorator_1.BusinessTypeEnum.delete,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('operLogIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "deleteOperLog", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA\u64CD\u4F5C\u65E5\u5FD7" }),
    (0, common_1.Post)('operlog/export'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:operlog:export'),
    (0, keep_decorator_1.Keep)(),
    (0, log_decorator_1.Log)({
        title: '日志管理',
        businessType: log_decorator_1.BusinessTypeEnum.export,
        isSaveResponseData: false,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_log_dto_1.ReqOperLogDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "exportOperlog", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u767B\u5F55\u65E5\u5FD7" }),
    (0, common_1.Get)('logininfor/list'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(logininfor_entity_1.Logininfor),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:logininfor:query'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_log_dto_1.ReqLogininforDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "logininforList", null);
__decorate([
    openapi.ApiOperation({ description: "\u6E05\u7A7A\u767B\u5F55\u65E5\u5FD7" }),
    (0, common_1.Delete)('logininfor/clean'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:logininfor:remove'),
    (0, log_decorator_1.Log)({
        title: '日志记录',
        businessType: log_decorator_1.BusinessTypeEnum.clean,
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LogController.prototype, "cleanLogininfor", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u64CD\u4F5C\u65E5\u5FD7" }),
    (0, common_1.Delete)('logininfor/:logininforIds'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:logininfor:remove'),
    (0, log_decorator_1.Log)({
        title: '日志记录',
        businessType: log_decorator_1.BusinessTypeEnum.delete,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('logininforIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "deleteLogininfor", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA\u767B\u5F55\u65E5\u5FD7" }),
    (0, common_1.Post)('logininfor/export'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:logininfor:export'),
    (0, keep_decorator_1.Keep)(),
    (0, log_decorator_1.Log)({
        title: '日志记录',
        businessType: log_decorator_1.BusinessTypeEnum.export,
        isSaveResponseData: false,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_log_dto_1.ReqLogininforDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "exportLogininfor", null);
LogController = __decorate([
    (0, swagger_1.ApiTags)('日志管理'),
    (0, common_1.Controller)('monitor'),
    __metadata("design:paramtypes", [log_service_1.LogService,
        excel_service_1.ExcelService])
], LogController);
exports.LogController = LogController;
//# sourceMappingURL=log.controller.js.map