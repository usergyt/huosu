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
exports.NoticeController = void 0;
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
const req_notice_dto_1 = require("./dto/req-notice.dto");
const notice_entity_1 = require("./entities/notice.entity");
const notice_service_1 = require("./notice.service");
let NoticeController = class NoticeController {
    constructor(noticeService) {
        this.noticeService = noticeService;
    }
    async add(reqAddNoticeDto, userName) {
        reqAddNoticeDto.createBy = reqAddNoticeDto.updateBy = userName;
        await this.noticeService.addOrUpdate(reqAddNoticeDto);
    }
    async list(reqNoeiceList) {
        return this.noticeService.list(reqNoeiceList);
    }
    async one(noticeId) {
        const notice = await this.noticeService.findById(noticeId);
        return data_obj_class_1.DataObj.create(notice);
    }
    async update(notice, userName) {
        notice.updateBy = userName;
        await this.noticeService.addOrUpdate(notice);
    }
    async delete(noticeIds) {
        await this.noticeService.delete(noticeIds.split(','));
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u516C\u544A" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:notice:add'),
    (0, log_decorator_1.Log)({
        title: '通知公告',
        businessType: log_decorator_1.BusinessTypeEnum.insert,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_notice_dto_1.ReqAddNoticeDto, String]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "add", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u516C\u544A" }),
    (0, common_1.Get)('list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:notice:query'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(notice_entity_1.Notice),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_notice_dto_1.ReqNoeiceList]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "list", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7id\u67E5\u8BE2\u516C\u544A" }),
    (0, common_1.Get)(':noticeId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:notice:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, notice_entity_1.Notice),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('noticeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "one", null);
__decorate([
    openapi.ApiOperation({ description: "\u66F4\u65B0\u516C\u544A" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:notice:edit'),
    (0, log_decorator_1.Log)({
        title: '通知公告',
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_entity_1.Notice, String]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "update", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u516C\u544A" }),
    (0, common_1.Delete)(':noticeIds'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:notice:remove'),
    (0, log_decorator_1.Log)({
        title: '通知公告',
        businessType: log_decorator_1.BusinessTypeEnum.delete,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('noticeIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "delete", null);
NoticeController = __decorate([
    (0, swagger_1.ApiTags)('通知公告'),
    (0, common_1.Controller)('system/notice'),
    __metadata("design:paramtypes", [notice_service_1.NoticeService])
], NoticeController);
exports.NoticeController = NoticeController;
//# sourceMappingURL=notice.controller.js.map