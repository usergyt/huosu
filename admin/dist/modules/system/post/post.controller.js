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
exports.PostController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_paginated_response_decorator_1 = require("../../../common/decorators/api-paginated-response.decorator");
const user_decorator_1 = require("../../../common/decorators/user.decorator");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const pagination_pipe_1 = require("../../../common/pipes/pagination.pipe");
const user_info_pipe_1 = require("../../../common/pipes/user-info.pipe");
const req_post_dto_1 = require("./dto/req-post.dto");
const post_service_1 = require("./post.service");
const post_entity_1 = require("./entities/post.entity");
const api_data_response_decorator_1 = require("../../../common/decorators/api-data-response.decorator");
const data_obj_class_1 = require("../../../common/class/data-obj.class");
const keep_decorator_1 = require("../../../common/decorators/keep.decorator");
const excel_service_1 = require("../../common/excel/excel.service");
const log_decorator_1 = require("../../../common/decorators/log.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const repeat_submit_decorator_1 = require("../../../common/decorators/repeat-submit.decorator");
let PostController = class PostController {
    constructor(postService, excelService) {
        this.postService = postService;
        this.excelService = excelService;
    }
    async add(reqAddPostDto, userName) {
        const post = await this.postService.findByPostCode(reqAddPostDto.postCode);
        if (post)
            throw new api_exception_1.ApiException('岗位编码已存在，请更换');
        reqAddPostDto.createBy = reqAddPostDto.updateBy = userName;
        await this.postService.addOrUpdate(reqAddPostDto);
    }
    async list(reqPostListDto) {
        return this.postService.list(reqPostListDto);
    }
    async one(postId) {
        const post = await this.postService.findById(postId);
        return data_obj_class_1.DataObj.create(post);
    }
    async update(post, userName) {
        post.updateBy = userName;
        await this.postService.addOrUpdate(post);
    }
    async delete(postIds) {
        await this.postService.delete(postIds.split(','));
    }
    async export(reqPostListDto) {
        const { rows } = await this.postService.list(reqPostListDto);
        const file = await this.excelService.export(post_entity_1.Post, rows);
        return new common_1.StreamableFile(file);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u5C97\u4F4D" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:post:add'),
    (0, log_decorator_1.Log)({
        title: '岗位管理',
        businessType: log_decorator_1.BusinessTypeEnum.insert,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_post_dto_1.ReqAddPostDto, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "add", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u5C97\u4F4D\u5217\u8868" }),
    (0, common_1.Get)('list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:post:query'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(post_entity_1.Post),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_post_dto_1.ReqPostListDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "list", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7id\u67E5\u8BE2\u5C97\u4F4D" }),
    (0, common_1.Get)(':postId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:post:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, post_entity_1.Post),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "one", null);
__decorate([
    openapi.ApiOperation({ description: "\u4FEE\u6539\u5C97\u4F4D" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:post:edit'),
    (0, log_decorator_1.Log)({
        title: '岗位管理',
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.Post, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u5C97\u4F4D" }),
    (0, common_1.Delete)(':postIds'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:post:remove'),
    (0, log_decorator_1.Log)({
        title: '岗位管理',
        businessType: log_decorator_1.BusinessTypeEnum.delete,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('postIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "delete", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA\u5C97\u4F4D" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('export'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:post:export'),
    (0, keep_decorator_1.Keep)(),
    (0, log_decorator_1.Log)({
        title: '岗位管理',
        businessType: log_decorator_1.BusinessTypeEnum.export,
        isSaveResponseData: false,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_post_dto_1.ReqPostListDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "export", null);
PostController = __decorate([
    (0, swagger_1.ApiTags)('岗位管理'),
    (0, common_1.Controller)('system/post'),
    __metadata("design:paramtypes", [post_service_1.PostService,
        excel_service_1.ExcelService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map