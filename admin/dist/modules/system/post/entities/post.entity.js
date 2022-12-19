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
exports.Post = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
let Post = class Post extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { postId: { required: true, type: () => Number, description: "\u5C97\u4F4DID" }, postCode: { required: true, type: () => String, description: "\u5C97\u4F4D\u7F16\u7801" }, postName: { required: true, type: () => String, description: "\u5C97\u4F4D\u540D\u79F0" }, postSort: { required: true, type: () => Number, description: "\u663E\u793A\u987A\u5E8F" }, status: { required: true, type: () => String, description: "\u72B6\u6001\uFF080\u6B63\u5E38 1\u505C\u7528" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'post_id',
        comment: '岗位ID',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '岗位ID',
    }),
    __metadata("design:type", Number)
], Post.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        name: 'post_code',
        comment: '岗位编码',
        length: 64,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '岗位编码',
    }),
    __metadata("design:type", String)
], Post.prototype, "postCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'post_name',
        comment: '岗位名称',
        length: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '岗位名称',
    }),
    __metadata("design:type", String)
], Post.prototype, "postName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'post_sort',
        comment: '显示顺序',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, excel_decorator_1.Excel)({
        name: '显示顺序',
    }),
    __metadata("design:type", Number)
], Post.prototype, "postSort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        comment: '状态（0正常 1停用）',
        length: 1,
        type: 'char',
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '状态',
        dictType: 'sys_normal_disable',
    }),
    __metadata("design:type", String)
], Post.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.posts),
    __metadata("design:type", Array)
], Post.prototype, "users", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map