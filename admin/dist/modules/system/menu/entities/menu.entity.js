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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../role/entities/role.entity");
let Menu = class Menu extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { menuId: { required: true, type: () => Number, description: "\u83DC\u5355ID" }, menuName: { required: true, type: () => String, description: "\u83DC\u5355\u540D\u79F0" }, orderNum: { required: true, type: () => Number, description: "\u663E\u793A\u987A\u5E8F" }, path: { required: true, type: () => String, description: "\u8DEF\u7531\u5730\u5740" }, component: { required: false, type: () => String, description: "\u7EC4\u4EF6\u8DEF\u5F84" }, query: { required: false, type: () => String, description: "\u8DEF\u7531\u53C2\u6570" }, isFrame: { required: true, type: () => Number, description: "\u662F\u5426\u4E3A\u5916\u94FE" }, isCache: { required: false, type: () => Number, description: "\u662F\u5426\u7F13\u5B58" }, menuType: { required: true, type: () => String, description: "'\u83DC\u5355\u7C7B\u578B" }, visible: { required: false, type: () => String, description: "\u83DC\u5355\u72B6\u6001(0\u663E\u793A 1\u9690\u85CF)" }, status: { required: false, type: () => String, description: "\u83DC\u5355\u72B6\u6001\uFF080\u6B63\u5E38 1\u505C\u7528\uFF09" }, perms: { required: false, type: () => String, description: "\u6743\u9650\u6807\u8BC6" }, icon: { required: false, type: () => String, description: "\u83DC\u5355\u56FE\u6807" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'menu_id',
        comment: '菜单ID',
        type: 'int',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Menu.prototype, "menuId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'menu_name',
        comment: '菜单名称',
        length: 50,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Menu.prototype, "menuName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'order_num',
        comment: '显示顺序',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Menu.prototype, "orderNum", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'path',
        comment: '路由地址',
        length: 200,
        default: '',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Menu.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'component',
        comment: '组件路径',
        length: 255,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Menu.prototype, "component", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'query',
        comment: '路由参数',
        length: 255,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Menu.prototype, "query", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_frame',
        comment: '是否为外链（0是 1否）',
        type: 'int',
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Menu.prototype, "isFrame", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_cache',
        comment: '是否缓存（0缓存 1不缓存）',
        type: 'int',
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Menu.prototype, "isCache", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'menu_type',
        comment: '菜单类型（M目录 C菜单 F按钮）',
        length: 1,
        type: 'char',
        default: '',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Menu.prototype, "menuType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'visible',
        comment: '菜单状态（0显示 1隐藏）',
        length: 1,
        type: 'char',
        default: '0',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Menu.prototype, "visible", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        comment: '菜单状态（0正常 1停用）',
        length: 1,
        type: 'char',
        default: '0',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Menu.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'perms',
        comment: '权限标识',
        length: 100,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Menu.prototype, "perms", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'icon',
        comment: '菜单图标',
        length: 100,
        type: 'char',
        default: '#',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Menu.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.TreeChildren)(),
    __metadata("design:type", Array)
], Menu.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.TreeParent)(),
    __metadata("design:type", Menu)
], Menu.prototype, "parent", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, (role) => role.menus),
    __metadata("design:type", Array)
], Menu.prototype, "roles", void 0);
Menu = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Tree)('materialized-path')
], Menu);
exports.Menu = Menu;
//# sourceMappingURL=menu.entity.js.map