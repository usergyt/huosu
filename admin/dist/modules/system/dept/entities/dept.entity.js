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
exports.Dept = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../role/entities/role.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Dept = class Dept extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { deptId: { required: true, type: () => Number, description: "\u90E8\u95E8id" }, deptName: { required: true, type: () => String, description: "\u90E8\u95E8\u540D\u79F0" }, orderNum: { required: true, type: () => Number, description: "\u663E\u793A\u987A\u5E8F" }, leader: { required: false, type: () => String, description: "\u8D1F\u8D23\u4EBA" }, phone: { required: false, type: () => String, description: "\u8054\u7CFB\u7535\u8BDD" }, email: { required: false, type: () => String, description: "\u90AE\u7BB1" }, status: { required: true, type: () => String, description: "\u90E8\u95E8\u72B6\u6001" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'dept_id',
        comment: '部门id',
        type: 'int',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Dept.prototype, "deptId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dept_name',
        comment: '部门名称',
        default: '',
        length: 50,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Dept.prototype, "deptName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'order_num',
        comment: '显示顺序',
        default: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Dept.prototype, "orderNum", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'leader',
        comment: '负责人',
        length: 20,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Dept.prototype, "leader", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'phone',
        comment: '联系电话',
        length: 11,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Dept.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        comment: '邮箱',
        length: 50,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Dept.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        comment: '部门状态（0正常 1停用）',
        length: 1,
        default: '0',
        type: 'char',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Dept.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({
        name: 'del_flag',
        comment: '删除标志（0代表存在 2代表删除）',
        length: 1,
        default: '0',
        type: 'char',
    }),
    __metadata("design:type", String)
], Dept.prototype, "delFlag", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.TreeChildren)(),
    __metadata("design:type", Array)
], Dept.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.TreeParent)(),
    __metadata("design:type", Dept)
], Dept.prototype, "parent", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, (role) => role.depts),
    __metadata("design:type", Array)
], Dept.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.dept),
    __metadata("design:type", Array)
], Dept.prototype, "users", void 0);
Dept = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Tree)('materialized-path')
], Dept);
exports.Dept = Dept;
//# sourceMappingURL=dept.entity.js.map