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
exports.DeptController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const data_obj_class_1 = require("../../../common/class/data-obj.class");
const api_data_response_decorator_1 = require("../../../common/decorators/api-data-response.decorator");
const log_decorator_1 = require("../../../common/decorators/log.decorator");
const repeat_submit_decorator_1 = require("../../../common/decorators/repeat-submit.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const user_decorator_1 = require("../../../common/decorators/user.decorator");
const tree_data_dto_1 = require("../../../common/dto/tree-data.dto");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const user_info_pipe_1 = require("../../../common/pipes/user-info.pipe");
const dept_service_1 = require("./dept.service");
const req_dept_dto_1 = require("./dto/req-dept.dto");
const res_dept_dto_1 = require("./dto/res-dept.dto");
let DeptController = class DeptController {
    constructor(deptService) {
        this.deptService = deptService;
    }
    async add(ReqAddDeptDto, userName) {
        ReqAddDeptDto.createBy = ReqAddDeptDto.updateBy = userName;
        await this.deptService.addOrUpdate(ReqAddDeptDto);
    }
    async list(reqDeptListDto) {
        const deptArr = await this.deptService.list(reqDeptListDto);
        return data_obj_class_1.DataObj.create(deptArr);
    }
    async treeselect() {
        const deptTree = await this.deptService.treeselect();
        return data_obj_class_1.DataObj.create(deptTree);
    }
    async one(deptId) {
        const dept = await this.deptService.findRawById(deptId);
        return data_obj_class_1.DataObj.create(dept);
    }
    async outList(deptId) {
        const deptArr = await this.deptService.outList(deptId);
        return data_obj_class_1.DataObj.create(deptArr);
    }
    async update(reqUpdateDept, userName) {
        reqUpdateDept.updateBy = userName;
        await this.deptService.addOrUpdate(reqUpdateDept);
    }
    async delete(deptId, userName) {
        const childs = await this.deptService.findChildsByParentId(deptId);
        if (childs && childs.length)
            throw new api_exception_1.ApiException('该部门下还存在其他部门，无法删除');
        await this.deptService.delete(deptId, userName);
    }
    async roleDeptTreeselect(roleId) {
        const depts = await this.deptService.treeselect();
        const checkedKeys = await this.deptService.getCheckedKeys(roleId);
        return {
            depts,
            checkedKeys,
        };
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u90E8\u95E8" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dept:add'),
    (0, log_decorator_1.Log)({
        title: '部门管理',
        businessType: log_decorator_1.BusinessTypeEnum.insert,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dept_dto_1.ReqAddDeptDto, String]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "add", null);
__decorate([
    openapi.ApiOperation({ description: "\u90E8\u95E8\u5217\u8868" }),
    (0, common_1.Get)('list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dept:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.objectArr, req_dept_dto_1.ReqAddDeptDto),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dept_dto_1.ReqDeptListDto]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "list", null);
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u90E8\u95E8\u6811\u7ED3\u6784" }),
    (0, common_1.Get)('treeselect'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.objectArr, tree_data_dto_1.TreeDataDto),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "treeselect", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7id\u67E5\u8BE2\u90E8\u95E8" }),
    (0, common_1.Get)(':deptId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dept:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, req_dept_dto_1.ReqAddDeptDto),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('deptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "one", null);
__decorate([
    openapi.ApiOperation({ description: "\u67E5\u8BE2\u9664\u81EA\u5DF1(\u5305\u62EC\u5B50\u7C7B)\u5916\u90E8\u95E8\u5217\u8868" }),
    (0, common_1.Get)('list/exclude/:deptId'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.objectArr, req_dept_dto_1.ReqAddDeptDto),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('deptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "outList", null);
__decorate([
    openapi.ApiOperation({ description: "\u4FEE\u6539\u90E8\u95E8" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dept:edit'),
    (0, log_decorator_1.Log)({
        title: '部门管理',
        businessType: log_decorator_1.BusinessTypeEnum.update,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dept_dto_1.ReqUpdateDept, String]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "update", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u90E8\u95E8" }),
    (0, common_1.Delete)(':deptId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dept:remove'),
    (0, log_decorator_1.Log)({
        title: '部门管理',
        businessType: log_decorator_1.BusinessTypeEnum.delete,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('deptId')),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "delete", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7\u89D2\u8272Id\u67E5\u8BE2\u8BE5\u89D2\u8272\u7684\u6570\u636E\u6743\u9650" }),
    (0, common_1.Get)('roleDeptTreeselect/:roleId'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, res_dept_dto_1.ResRoleDeptTreeselectDto),
    openapi.ApiResponse({ status: 200, type: require("./dto/res-dept.dto").ResRoleDeptTreeselectDto }),
    __param(0, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "roleDeptTreeselect", null);
DeptController = __decorate([
    (0, swagger_1.ApiTags)('部门管理'),
    (0, common_1.Controller)('system/dept'),
    __metadata("design:paramtypes", [dept_service_1.DeptService])
], DeptController);
exports.DeptController = DeptController;
//# sourceMappingURL=dept.controller.js.map