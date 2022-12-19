"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.ResRoleMenuTreeselectDto = void 0;
const openapi = require("@nestjs/swagger");
class ResRoleMenuTreeselectDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { checkedKeys: { required: true, type: () => [Number], description: "\u9009\u4E2D\u7684\u83DC\u5355id\u6570\u7EC4" }, menus: { required: true, type: () => [require("../../../../common/dto/tree-data.dto").TreeDataDto], description: "\u83DC\u5355\u5217\u8868" } };
    }
}
exports.ResRoleMenuTreeselectDto = ResRoleMenuTreeselectDto;
class Router {
    static _OPENAPI_METADATA_FACTORY() {
        return { menuId: { required: true, type: () => Number }, parentId: { required: true, type: () => Number }, name: { required: false, type: () => String }, path: { required: false, type: () => String }, hidden: { required: false, type: () => Boolean }, redirect: { required: false, type: () => String }, component: { required: false, type: () => String }, alwaysShow: { required: false, type: () => Boolean }, meta: { required: false, type: () => ({ title: { required: false, type: () => String }, icon: { required: false, type: () => String }, noCache: { required: false, type: () => Boolean }, link: { required: false, type: () => String, nullable: true } }) }, children: { required: false, type: () => [require("./res-menu.dto").Router] } };
    }
}
exports.Router = Router;
//# sourceMappingURL=res-menu.dto.js.map