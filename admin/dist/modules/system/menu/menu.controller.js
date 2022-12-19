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
exports.MenuController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const data_obj_class_1 = require("../../../common/class/data-obj.class");
const api_data_response_decorator_1 = require("../../../common/decorators/api-data-response.decorator");
const repeat_submit_decorator_1 = require("../../../common/decorators/repeat-submit.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const user_decorator_1 = require("../../../common/decorators/user.decorator");
const tree_data_dto_1 = require("../../../common/dto/tree-data.dto");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const user_info_pipe_1 = require("../../../common/pipes/user-info.pipe");
const req_menu_dto_1 = require("./dto/req-menu.dto");
const res_menu_dto_1 = require("./dto/res-menu.dto");
const menu_service_1 = require("./menu.service");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    async add(reqAddMenuDto, userName) {
        reqAddMenuDto.createBy = reqAddMenuDto.updateBy = userName;
        await this.menuService.addOrUpdate(reqAddMenuDto);
    }
    async list(reqMenuListDto) {
        const menutArr = await this.menuService.list(reqMenuListDto);
        return data_obj_class_1.DataObj.create(menutArr);
    }
    async treeselect() {
        const menuTree = await this.menuService.treeselect();
        return data_obj_class_1.DataObj.create(menuTree);
    }
    async one(menuId) {
        const menu = await this.menuService.findRawById(menuId);
        return data_obj_class_1.DataObj.create(menu);
    }
    async outList(menuId) {
        const menuArr = await this.menuService.outList(menuId);
        return data_obj_class_1.DataObj.create(menuArr);
    }
    async update(reqUpdateMenu, userName) {
        reqUpdateMenu.updateBy = userName;
        await this.menuService.addOrUpdate(reqUpdateMenu);
    }
    async delete(menuId) {
        const childs = await this.menuService.findChildsByParentId(menuId);
        if (childs && childs.length)
            throw new api_exception_1.ApiException('该菜单下还存在其他菜单，无法删除');
        await this.menuService.delete(menuId);
    }
    async roleMenuTreeselect(roleId) {
        const menus = await this.menuService.treeselect();
        const checkedKeys = await this.menuService.getCheckedKeys(roleId);
        return {
            menus,
            checkedKeys,
        };
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u83DC\u5355" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:menu:add'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_menu_dto_1.ReqAddMenuDto, String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "add", null);
__decorate([
    openapi.ApiOperation({ description: "\u83DC\u5355\u5217\u8868" }),
    (0, common_1.Get)('list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:menu:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.objectArr, req_menu_dto_1.ReqAddMenuDto),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_menu_dto_1.ReqMenuListDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "list", null);
__decorate([
    openapi.ApiOperation({ description: "\u67E5\u8BE2\u83DC\u5355\u6811\u7ED3\u6784" }),
    (0, common_1.Get)('treeselect'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.objectArr, tree_data_dto_1.TreeDataDto),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "treeselect", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7id\u67E5\u8BE2\u5217\u8868" }),
    (0, common_1.Get)(':menuId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:menu:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, req_menu_dto_1.ReqAddMenuDto),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('menuId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "one", null);
__decorate([
    openapi.ApiOperation({ description: "\u67E5\u8BE2\u9664\u81EA\u5DF1(\u5305\u62EC\u5B50\u7C7B)\u5916\u83DC\u5355\u5217\u8868" }),
    (0, common_1.Get)('list/exclude/:menuId'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.objectArr, req_menu_dto_1.ReqAddMenuDto),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('menuId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "outList", null);
__decorate([
    openapi.ApiOperation({ description: "\u4FEE\u6539\u83DC\u5355" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)(),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:menu:edit'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_menu_dto_1.ReqUpdateMenu, String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "update", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u83DC\u5355" }),
    (0, common_1.Delete)(':menuId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:menu:remove'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('menuId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "delete", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7\u89D2\u8272Id\u67E5\u8BE2\u8BE5\u89D2\u8272\u7684\u83DC\u5355\u6743\u9650" }),
    (0, common_1.Get)('roleMenuTreeselect/:roleId'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, res_menu_dto_1.ResRoleMenuTreeselectDto),
    openapi.ApiResponse({ status: 200, type: require("./dto/res-menu.dto").ResRoleMenuTreeselectDto }),
    __param(0, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "roleMenuTreeselect", null);
MenuController = __decorate([
    (0, swagger_1.ApiTags)('菜单管理'),
    (0, common_1.Controller)('system/menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
exports.MenuController = MenuController;
//# sourceMappingURL=menu.controller.js.map