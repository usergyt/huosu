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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const excel_enum_1 = require("../../../common/excel/excel.enum");
const typeorm_1 = require("typeorm");
const dept_entity_1 = require("../../dept/entities/dept.entity");
const post_entity_1 = require("../../post/entities/post.entity");
const role_entity_1 = require("../../role/entities/role.entity");
let User = class User extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number, description: "\u7528\u6237Id" }, userName: { required: true, type: () => String, description: "\u7528\u6237\u8D26\u53F7" }, nickName: { required: true, type: () => String, description: "\u7528\u6237\u6635\u79F0" }, userType: { required: false, type: () => String, description: "\u7528\u6237\u7C7B\u578B" }, email: { required: false, type: () => String, description: "\u7528\u6237\u90AE\u7BB1" }, phonenumber: { required: false, type: () => String, description: "\u624B\u673A\u53F7\u7801" }, sex: { required: true, type: () => String }, avatar: { required: false, type: () => String, description: "\u5934\u50CF\u5730\u5740" }, password: { required: true, type: () => String, description: "\u5BC6\u7801" }, status: { required: true, type: () => String, description: "\u5E10\u53F7\u72B6\u6001" }, loginIp: { required: false, type: () => String, description: "\u6700\u540E\u767B\u5F55IP" }, loginDate: { required: false, type: () => Date, description: "\u6700\u540E\u767B\u5F55\u65F6\u95F4" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'user_id',
        comment: '用户ID',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '用户Id',
        type: excel_enum_1.ExcelTypeEnum.EXPORT,
    }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_name',
        comment: '用户账号',
        length: 30,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '用户账号',
    }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'nick_name',
        comment: '用户昵称',
        length: 30,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '用户昵称',
    }),
    __metadata("design:type", String)
], User.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_type',
        comment: '用户类型（00系统用户）',
        length: 2,
        default: '00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '用户邮箱',
        length: 50,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '手机号码',
        length: 11,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '手机号码',
    }),
    __metadata("design:type", String)
], User.prototype, "phonenumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '用户性别（0男 1女 2未知）',
        type: 'char',
        length: 1,
        default: '0',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '头像地址',
        length: 100,
        default: '',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '密码',
        length: 100,
        default: '',
        select: false,
    }),
    (0, excel_decorator_1.Excel)({
        type: excel_enum_1.ExcelTypeEnum.IMPORT,
        name: '密码',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({
        comment: '盐加密',
        length: 100,
        default: '',
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '帐号状态（0正常 1停用）',
        type: 'char',
        length: 1,
        default: '0',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '帐号状态',
        dictType: 'sys_normal_disable',
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({
        name: 'del_flag',
        comment: '删除标志（0代表存在 2代表删除）',
        type: 'char',
        length: 1,
        default: '0',
    }),
    __metadata("design:type", String)
], User.prototype, "delFlag", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'login_ip',
        comment: '最后登录IP',
        length: 128,
        default: '',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "loginIp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'login_date',
        comment: '最后登录时间',
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], User.prototype, "loginDate", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToOne)(() => dept_entity_1.Dept, (dept) => dept.users),
    __metadata("design:type", dept_entity_1.Dept)
], User.prototype, "dept", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => post_entity_1.Post, (post) => post.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, (role) => role.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map