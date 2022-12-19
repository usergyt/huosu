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
exports.OnlineController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_data_response_decorator_1 = require("../../../common/decorators/api-data-response.decorator");
const log_decorator_1 = require("../../../common/decorators/log.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const req_online_dto_1 = require("./dto/req-online.dto");
const res_online_dto_1 = require("./dto/res-online.dto");
const online_service_1 = require("./online.service");
let OnlineController = class OnlineController {
    constructor(onlineService) {
        this.onlineService = onlineService;
    }
    async online(reqOnline) {
        return this.onlineService.online(reqOnline);
    }
    async deletOnline(tokenKey) {
        await this.onlineService.deletOnline(tokenKey);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u67E5\u8BE2\u5728\u7EBF\u7528\u6237" }),
    (0, common_1.Get)('list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:online:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.objectArr, res_online_dto_1.ResOnlineDto),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_online_dto_1.ReqOnline]),
    __metadata("design:returntype", Promise)
], OnlineController.prototype, "online", null);
__decorate([
    openapi.ApiOperation({ description: "\u5F3A\u9000" }),
    (0, common_1.Delete)(':tokenKey'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:online:forceLogout'),
    (0, log_decorator_1.Log)({
        title: '强退用户',
        businessType: log_decorator_1.BusinessTypeEnum.force,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('tokenKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnlineController.prototype, "deletOnline", null);
OnlineController = __decorate([
    (0, swagger_1.ApiTags)('在线用户'),
    (0, common_1.Controller)('monitor/online'),
    __metadata("design:paramtypes", [online_service_1.OnlineService])
], OnlineController);
exports.OnlineController = OnlineController;
//# sourceMappingURL=online.controller.js.map