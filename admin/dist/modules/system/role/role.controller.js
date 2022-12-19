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
exports.RoleController = void 0;
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
const user_entity_1 = require("../user/entities/user.entity");
const req_role_dto_1 = require("./dto/req-role.dto");
const role_entity_1 = require("./entities/role.entity");
const role_service_1 = require("./role.service");
let RoleController = class RoleController {
    constructor(roleService, excelService) {
        this.roleService = roleService;
        this.excelService = excelService;
    }
    async add(reqAddRoleDto, userName) {
        reqAddRoleDto.createBy = reqAddRoleDto.updateBy = userName;
        await this.roleService.addOrUpdate(reqAddRoleDto);
    }
    async list(reqRoleListDto) {
        return this.roleService.list(reqRoleListDto);
    }
    async one(roleId) {
        const role = await this.roleService.findById(roleId);
        return data_obj_class_1.DataObj.create(role);
    }
    async update(reqUpdateRoleDto, userName) {
        reqUpdateRoleDto.updateBy = userName;
        await this.roleService.addOrUpdate(reqUpdateRoleDto);
    }
    async dataScope(reqDataScopeDto, userName) {
        reqDataScopeDto.updateBy = userName;
        await this.roleService.updateDataScope(reqDataScopeDto);
    }
    async delete(roleIds, userName) {
        await this.roleService.delete(roleIds.split(','), userName);
    }
    async changeStatus(reqChangeStatusDto, userName) {
        await this.roleService.changeStatus(reqChangeStatusDto.roleId, reqChangeStatusDto.status, userName);
    }
    async export(reqRoleListDto) {
        const { rows } = await this.roleService.list(reqRoleListDto);
        const file = await this.excelService.export(role_entity_1.Role, rows);
        return new common_1.StreamableFile(file);
    }
    async allocatedList(reqAllocatedListDto) {
        return this.roleService.allocatedListByRoleId(reqAllocatedListDto);
    }
    async cancel(reqCancelDto) {
        const userIdArr = [reqCancelDto.userId];
        await this.roleService.cancel(reqCancelDto.roleId, userIdArr);
    }
    async cancelAll(reqCancelAllDto) {
        const userIdArr = reqCancelAllDto.userIds.split(',');
        await this.roleService.cancel(reqCancelAllDto.roleId, userIdArr);
    }
    async unallocatedList(reqAllocatedListDto) {
        return this.roleService.allocatedListByRoleId(reqAllocatedListDto, true);
    }
    async selectAll(reqCancelAllDto) {
        const userIdArr = reqCancelAllDto.userIds.split(',');
        await this.roleService.selectAll(reqCancelAllDto.roleId, userIdArr);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u89D2\u8272" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:role:add'),
    (0, log_decorator_1.Log)({
        title: '角色管理',
        businessType: log_decorator_1.BusinessTypeEnum.insert,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqAddRoleDto, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "add", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u89D2\u8272\u5217\u8868" }),
    (0, common_1.Get)('list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:role:query'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(role_entity_1.Role),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqRoleListDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "list", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7Id \u67E5\u8BE2\u89D2\u8272" }),
    (0, common_1.Get)(':roleId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:role:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, role_entity_1.Role),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "one", null);
__decorate([
    openapi.ApiOperation({ description: "\u7F16\u8F91\u89D2\u8272" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:role:edit'),
    (0, log_decorator_1.Log)({
        title: '角色管理',
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqUpdateRoleDto, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u914D\u6570\u636E\u6743\u9650" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('dataScope'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqDataScopeDto, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "dataScope", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u89D2\u8272" }),
    (0, common_1.Delete)(':roleIds'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:role:remove'),
    (0, log_decorator_1.Log)({
        title: '角色管理',
        businessType: log_decorator_1.BusinessTypeEnum.delete,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('roleIds')),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
__decorate([
    openapi.ApiOperation({ description: "\u66F4\u6539\u89D2\u8272\u72B6\u6001" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('changeStatus'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqChangeStatusDto, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "changeStatus", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA\u89D2\u8272\u5217\u8868" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('export'),
    (0, keep_decorator_1.Keep)(),
    (0, log_decorator_1.Log)({
        title: '角色管理',
        businessType: log_decorator_1.BusinessTypeEnum.export,
        isSaveResponseData: false,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqRoleListDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "export", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u83B7\u53D6\u89D2\u8272\u4E0B\u7684\u7528\u6237\u5217\u8868" }),
    (0, common_1.Get)('authUser/allocatedList'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(user_entity_1.User),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqAllocatedListDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "allocatedList", null);
__decorate([
    openapi.ApiOperation({ description: "\u5355\u4E2A\u53D6\u6D88\u7528\u6237\u89D2\u8272\u6388\u6743" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('authUser/cancel'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqCancelDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "cancel", null);
__decorate([
    openapi.ApiOperation({ description: "\u6279\u91CF\u53D6\u6D88\u7528\u6237\u89D2\u8272\u6388\u6743" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('authUser/cancelAll'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqCancelAllDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "cancelAll", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u83B7\u53D6\u8BE5\u89D2\u8272\u4E0B\u4E0D\u5B58\u5728\u7684\u7528\u6237\u5217\u8868" }),
    (0, common_1.Get)('authUser/unallocatedList'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqAllocatedListDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "unallocatedList", null);
__decorate([
    openapi.ApiOperation({ description: "\u7ED9\u89D2\u8272\u5206\u914D\u7528\u6237" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('authUser/selectAll'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_role_dto_1.ReqCancelAllDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "selectAll", null);
RoleController = __decorate([
    (0, swagger_1.ApiTags)('角色管理'),
    (0, common_1.Controller)('system/role'),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        excel_service_1.ExcelService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map