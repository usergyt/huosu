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
exports.Logininfor = void 0;
const openapi = require("@nestjs/swagger");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
let Logininfor = class Logininfor {
    static _OPENAPI_METADATA_FACTORY() {
        return { infoId: { required: true, type: () => Number, description: "\u8BBF\u95EEid" }, userName: { required: true, type: () => String, description: "\u7528\u6237\u8D26\u53F7" }, ipaddr: { required: true, type: () => String, description: "\u767B\u5F55IP\u5730\u5740" }, loginLocation: { required: true, type: () => String, description: "\u767B\u5F55\u5730\u70B9" }, browser: { required: true, type: () => String, description: "\u6D4F\u89C8\u5668\u7C7B\u578B" }, os: { required: true, type: () => String, description: "\u6D4F\u89C8\u5668\u64CD\u4F5C\u7CFB\u7EDF\u7C7B\u578B" }, status: { required: true, type: () => String, description: "\u767B\u5F55\u72B6\u6001\uFF080\u6210\u529F 1\u5931\u8D25\uFF09" }, msg: { required: true, type: () => String, description: "\u63D0\u793A\u6D88\u606F" }, loginTime: { required: true, type: () => String, description: "\u8BBF\u95EE\u65F6\u95F4" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'info_id',
        comment: '访问ID',
    }),
    __metadata("design:type", Number)
], Logininfor.prototype, "infoId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_name',
        comment: '用户账号',
        length: 50,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '用户账号',
    }),
    __metadata("design:type", String)
], Logininfor.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ipaddr',
        comment: '登录IP地址',
        length: 128,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '登录IP地址',
    }),
    __metadata("design:type", String)
], Logininfor.prototype, "ipaddr", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'login_location',
        comment: '登录地点',
        length: 255,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '登录地点',
    }),
    __metadata("design:type", String)
], Logininfor.prototype, "loginLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'browser',
        comment: '浏览器类型',
        length: 50,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '浏览器类型',
    }),
    __metadata("design:type", String)
], Logininfor.prototype, "browser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'os',
        comment: '浏览器操作系统类型',
        length: 50,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '浏览器操作系统类型',
    }),
    __metadata("design:type", String)
], Logininfor.prototype, "os", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        comment: '登录状态（0成功 1失败）',
        length: 1,
        type: 'char',
        default: '0',
    }),
    (0, excel_decorator_1.Excel)({
        name: '登录状态',
        dictType: 'sys_common_status',
    }),
    __metadata("design:type", String)
], Logininfor.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'msg',
        comment: '提示消息',
        length: 255,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '登录状态',
    }),
    __metadata("design:type", String)
], Logininfor.prototype, "msg", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'login_time',
        comment: '访问时间',
        type: 'datetime',
    }),
    (0, excel_decorator_1.Excel)({
        name: '操作时间',
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
    }),
    __metadata("design:type", String)
], Logininfor.prototype, "loginTime", void 0);
Logininfor = __decorate([
    (0, typeorm_1.Entity)()
], Logininfor);
exports.Logininfor = Logininfor;
//# sourceMappingURL=logininfor.entity.js.map