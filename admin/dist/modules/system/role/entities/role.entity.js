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
exports.Role = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
const dept_entity_1 = require("../../dept/entities/dept.entity");
const menu_entity_1 = require("../../menu/entities/menu.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Role = class Role extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { roleId: { required: true, type: () => Number, description: "\u89D2\u8272ID" }, roleName: { required: true, type: () => String, description: "\u89D2\u8272\u540D\u79F0" }, roleKey: { required: true, type: () => String, description: "\u89D2\u8272\u6743\u9650\u5B57\u7B26\u4E32" }, roleSort: { required: true, type: () => Number, description: "\u663E\u793A\u987A\u5E8F" }, dataScope: { required: false, type: () => String, description: "\u6570\u636E\u8303\u56F4\uFF081\uFF1A\u5168\u90E8\u6570\u636E\u6743\u9650 2\uFF1A\u81EA\u5B9A\u6570\u636E\u6743\u9650 3\uFF1A\u672C\u90E8\u95E8\u6570\u636E\u6743\u9650 4\uFF1A\u672C\u90E8\u95E8\u53CA\u4EE5\u4E0B\u6570\u636E\u6743\u9650  5\uFF1A\u4EC5\u672C\u4EBA\u6570\u636E\u6743\u9650\uFF09" }, menuCheckStrictly: { required: true, type: () => Boolean, description: "\u83DC\u5355\u6811\u9009\u62E9\u9879\u662F\u5426\u5173\u8054\u663E\u793A" }, deptCheckStrictly: { required: true, type: () => Boolean, description: "\u83DC\u5355\u6811\u9009\u62E9\u9879\u662F\u5426\u5173\u8054\u663E\u793A" }, status: { required: true, type: () => String, description: "\u89D2\u8272\u72B6\u6001\uFF080\u6B63\u5E38 1\u505C\u7528\uFF09" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'role_id',
        comment: '角色ID',
        type: 'int',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '角色ID',
    }),
    __metadata("design:type", Number)
], Role.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'role_name',
        comment: '角色名称',
        length: 30,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '角色名称',
    }),
    __metadata("design:type", String)
], Role.prototype, "roleName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'role_key',
        comment: '角色权限字符串',
        length: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '角色权限字符串',
    }),
    __metadata("design:type", String)
], Role.prototype, "roleKey", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'role_sort',
        comment: '显示顺序',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '显示顺序',
    }),
    __metadata("design:type", Number)
], Role.prototype, "roleSort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'data_scope',
        comment: '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限 5：仅本人数据权限）',
        length: 1,
        type: 'char',
        default: '1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Role.prototype, "dataScope", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'menu_check_strictly',
        comment: '菜单树选择项是否关联显示',
        type: 'boolean',
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Role.prototype, "menuCheckStrictly", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dept_check_strictly',
        comment: '菜单树选择项是否关联显示',
        type: 'boolean',
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Role.prototype, "deptCheckStrictly", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        comment: '角色状态（0正常 1停用）',
        length: 1,
        type: 'char',
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '角色状态',
        dictType: 'sys_normal_disable',
    }),
    __metadata("design:type", String)
], Role.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'del_flag',
        comment: '删除标志（0代表存在 2代表删除）',
        length: 1,
        type: 'char',
        default: '0',
    }),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], Role.prototype, "delFlag", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => dept_entity_1.Dept, (dept) => dept.roles),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Role.prototype, "depts", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => menu_entity_1.Menu, (menu) => menu.roles),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Role.prototype, "menus", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.roles),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
Role = __decorate([
    (0, typeorm_1.Entity)()
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map