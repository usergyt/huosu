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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_paginated_response_decorator_1 = require("../../../common/decorators/api-paginated-response.decorator");
const user_decorator_1 = require("../../../common/decorators/user.decorator");
const user_info_pipe_1 = require("../../../common/pipes/user-info.pipe");
const req_post_dto_1 = require("../post/dto/req-post.dto");
const post_service_1 = require("../post/post.service");
const req_role_dto_1 = require("../role/dto/req-role.dto");
const role_service_1 = require("../role/role.service");
const req_user_dto_1 = require("./dto/req-user.dto");
const user_entity_1 = require("./entities/user.entity");
const user_decorator_2 = require("../../../common/decorators/user.decorator");
const user_service_1 = require("./user.service");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const pagination_pipe_1 = require("../../../common/pipes/pagination.pipe");
const excel_service_1 = require("../../common/excel/excel.service");
const keep_decorator_1 = require("../../../common/decorators/keep.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const log_decorator_1 = require("../../../common/decorators/log.decorator");
const datascope_decorator_1 = require("../../../common/decorators/datascope.decorator");
const data_scope_sql_decorator_1 = require("../../../common/decorators/data-scope-sql.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const repeat_submit_decorator_1 = require("../../../common/decorators/repeat-submit.decorator");
let UserController = class UserController {
    constructor(userService, postService, excelService, roleService) {
        this.userService = userService;
        this.postService = postService;
        this.excelService = excelService;
        this.roleService = roleService;
    }
    async list(reqUserListDto, sataScopeSql) {
        return this.userService.list(reqUserListDto, null, null, sataScopeSql);
    }
    async getPostAndRole() {
        const posts = await this.postService.list(new req_post_dto_1.ReqPostListDto());
        const roles = await this.roleService.list(new req_role_dto_1.ReqRoleListDto());
        return {
            posts: posts.rows,
            roles: roles.rows,
        };
    }
    async profile(userId) {
        const data = await this.userService.userAllInfo(userId);
        const postGroup = data.posts.map((item) => item.postName).join('、');
        const roleGroup = data.roles.map((item) => item.roleName).join('、');
        return {
            data,
            postGroup,
            roleGroup,
        };
    }
    async updataProfile(reqUpdataSelfDto, userId) {
        await this.userService.updataProfile(reqUpdataSelfDto, userId);
    }
    async updateSelfPwd(reqUpdateSelfPwd, userName) {
        await this.userService.updateSelfPwd(reqUpdateSelfPwd, userName);
    }
    async avatar(file, fileName, userId) {
        const reqUpdataSelfDto = new req_user_dto_1.ReqUpdataSelfDto();
        reqUpdataSelfDto.avatar = fileName;
        await this.userService.updataProfile(reqUpdataSelfDto, userId);
        return {
            imgUrl: fileName,
        };
    }
    async one(userId) {
        const posts = await this.postService.list(new req_post_dto_1.ReqPostListDto());
        const roles = await this.roleService.list(new req_role_dto_1.ReqRoleListDto());
        const user = (await this.userService.userAllInfo(userId));
        user.deptId = user.dept ? user.dept.deptId : null;
        const postIds = user.posts.map((item) => item.postId);
        const roleIds = user.roles.map((item) => item.roleId);
        user.postIds = [];
        user.roleIds = [];
        return {
            data: user,
            postIds,
            roleIds,
            posts: posts.rows,
            roles: roles.rows,
        };
    }
    async add(reqAddUserDto, userName) {
        const user = await this.userService.findOneByUserNameState(reqAddUserDto.userName);
        if (user)
            throw new api_exception_1.ApiException('该用户名已存在，请更换');
        reqAddUserDto.createBy = reqAddUserDto.updateBy = userName;
        await this.userService.addUser(reqAddUserDto);
    }
    async update(reqUpdateUserDto, userName) {
        const user = await this.userService.findOneByUserNameState(reqUpdateUserDto.userName);
        if (user) {
            reqUpdateUserDto.updateBy = userName;
            await this.userService.updateUser(reqUpdateUserDto);
        }
        else {
            throw new api_exception_1.ApiException('该用户不存在');
        }
    }
    async delete(userIds, userName) {
        const userIdArr = userIds.split(',');
        await this.userService.delete(userIdArr, userName);
    }
    async resetPwd(reqResetPwdDto, userName) {
        await this.userService.resetPwd(reqResetPwdDto.userId, reqResetPwdDto.password, userName);
    }
    async authRole(userId) {
        return await this.userService.authRole(userId);
    }
    async updateAuthRole(reqUpdateAuthRoleDto, userName) {
        const roleIdArr = reqUpdateAuthRoleDto.roleIds
            .split(',')
            .map((item) => Number(item));
        await this.userService.updateAuthRole(reqUpdateAuthRoleDto.userId, roleIdArr, userName);
    }
    async changeStatus(reqChangeStatusDto, userName) {
        await this.userService.changeStatus(reqChangeStatusDto.userId, reqChangeStatusDto.status, userName);
    }
    async export(reqUserListDto) {
        const { rows } = await this.userService.list(reqUserListDto);
        const file = await this.excelService.export(user_entity_1.User, rows);
        return new common_1.StreamableFile(file);
    }
    async importTemplate() {
        const file = await this.excelService.importTemplate(user_entity_1.User);
        return new common_1.StreamableFile(file);
    }
    async importData(file, userName) {
        const data = await this.excelService.import(user_entity_1.User, file);
        await this.userService.insert(data, userName);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u7528\u6237\u5217\u8868" }),
    (0, common_1.Get)('list'),
    (0, datascope_decorator_1.DataScope)({
        userAlias: 'user2',
    }),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:user:query'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(user_entity_1.User),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __param(1, (0, data_scope_sql_decorator_1.DataScopeSql)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_user_dto_1.ReqUserListDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u7528\u6237\uFF0C\u83B7\u53D6\u9009\u9879" }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/res-user.dto").ResUserInfoDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPostAndRole", null);
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F" }),
    (0, common_1.Get)('profile'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "profile", null);
__decorate([
    openapi.ApiOperation({ description: "\u66F4\u6539\u4E2A\u4EBA\u7528\u6237\u4FE1\u606F" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('profile'),
    (0, log_decorator_1.Log)({
        title: '用户管理',
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_user_dto_1.ReqUpdataSelfDto, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updataProfile", null);
__decorate([
    openapi.ApiOperation({ description: "\u66F4\u6539\u4E2A\u4EBA\u5BC6\u7801" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('profile/updatePwd'),
    (0, log_decorator_1.Log)({
        title: '用户管理',
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_user_dto_1.ReqUpdateSelfPwd, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateSelfPwd", null);
__decorate([
    openapi.ApiOperation({ description: "\u4E0A\u4F20\u5934\u50CF" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('profile/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatarfile')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('fileName')),
    __param(2, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "avatar", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7id\u67E5\u8BE2\u7528\u6237\u4FE1\u606F" }),
    (0, common_1.Get)(':userId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:user:query'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res-user.dto").ResUserInfoDto }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "one", null);
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u7528\u6237" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:user:add'),
    (0, log_decorator_1.Log)({
        title: '用户管理',
        businessType: log_decorator_1.BusinessTypeEnum.insert,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_user_dto_1.ReqAddUserDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "add", null);
__decorate([
    openapi.ApiOperation({ description: "\u7F16\u8F91\u7528\u6237" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:user:edit'),
    (0, log_decorator_1.Log)({
        title: '用户管理',
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_user_dto_1.ReqUpdateUserDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u7528\u6237" }),
    (0, common_1.Delete)(':userIds'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:user:remove'),
    (0, log_decorator_1.Log)({
        title: '用户管理',
        businessType: log_decorator_1.BusinessTypeEnum.delete,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('userIds')),
    __param(1, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    openapi.ApiOperation({ description: "" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('resetPwd'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:user:resetPwd'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_user_dto_1.ReqResetPwdDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPwd", null);
__decorate([
    openapi.ApiOperation({ description: "\u67E5\u8BE2\u7528\u6237\u88AB\u5206\u914D\u7684\u89D2\u8272\u548C\u89D2\u8272\u5217\u8868" }),
    (0, common_1.Get)('authRole/:userId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res-user.dto").ResAuthRoleDto }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "authRole", null);
__decorate([
    openapi.ApiOperation({ description: "\u7ED9\u7528\u6237\u5206\u914D\u89D2\u8272" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('authRole'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_user_dto_1.ReqUpdateAuthRoleDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAuthRole", null);
__decorate([
    openapi.ApiOperation({ description: "\u6539\u53D8\u7528\u6237\u72B6\u6001" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('changeStatus'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_user_dto_1.ReqChangeStatusDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeStatus", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA\u7528\u6237" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('export'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:user:export'),
    (0, keep_decorator_1.Keep)(),
    (0, log_decorator_1.Log)({
        title: '用户管理',
        businessType: log_decorator_1.BusinessTypeEnum.export,
        isSaveResponseData: false,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_user_dto_1.ReqUserListDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "export", null);
__decorate([
    openapi.ApiOperation({ description: "\u4E0B\u8F7D\u6A21\u677F" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('importTemplate'),
    (0, keep_decorator_1.Keep)(),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "importTemplate", null);
__decorate([
    openapi.ApiOperation({ description: "\u7528\u6237\u5BFC\u5165" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('importData'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:user:import'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_2.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "importData", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('用户管理'),
    (0, common_1.Controller)('system/user'),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => role_service_1.RoleService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        post_service_1.PostService,
        excel_service_1.ExcelService,
        role_service_1.RoleService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map