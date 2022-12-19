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
exports.OperLog = void 0;
const openapi = require("@nestjs/swagger");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
let OperLog = class OperLog {
    static _OPENAPI_METADATA_FACTORY() {
        return { operId: { required: true, type: () => Number, description: "\u65E5\u5FD7\u4E3B\u952E" }, title: { required: true, type: () => String, description: "\u6A21\u5757\u6807\u9898" }, businessType: { required: true, type: () => String, description: "'\u4E1A\u52A1\u7C7B\u578B" }, method: { required: true, type: () => String, description: "\u65B9\u6CD5\u540D\u79F0" }, requestMethod: { required: true, type: () => String, description: "\u8BF7\u6C42\u65B9\u5F0F" }, operatorType: { required: true, type: () => String, description: "\u64CD\u4F5C\u7C7B\u522B\uFF080\u5176\u5B83 1\u540E\u53F0\u7528\u6237 2\u624B\u673A\u7AEF\u7528\u6237\uFF09" }, operName: { required: true, type: () => String, description: "\u64CD\u4F5C\u4EBA\u5458" }, deptName: { required: true, type: () => String, description: "\u90E8\u95E8\u540D\u79F0" }, operUrl: { required: true, type: () => String, description: "\u8BF7\u6C42URL" }, operIp: { required: true, type: () => String, description: "\u4E3B\u673A\u5730\u5740" }, operLocation: { required: true, type: () => String, description: "\u64CD\u4F5C\u5730\u70B9" }, operParam: { required: true, type: () => String, description: "\u8BF7\u6C42\u53C2\u6570" }, jsonResult: { required: true, type: () => String, description: "\u8FD4\u56DE\u53C2\u6570" }, status: { required: true, type: () => Number, description: "\u64CD\u4F5C\u72B6\u6001\uFF080\u6B63\u5E38 1\u5F02\u5E38\uFF09" }, errorMsg: { required: true, type: () => String, description: "\u8FD4\u56DE\u53C2\u6570" }, operTime: { required: true, type: () => String, description: "\u64CD\u4F5C\u65F6\u95F4" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'oper_id',
        comment: '日志主键',
    }),
    __metadata("design:type", Number)
], OperLog.prototype, "operId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        comment: '模块标题',
        length: 50,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '模块标题',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_type',
        comment: '业务类型',
        default: '0',
        type: 'char',
        length: 1,
    }),
    (0, excel_decorator_1.Excel)({
        name: '业务类型',
        dictType: 'sys_oper_type',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'method',
        comment: '方法名称',
        length: 100,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '方法名称',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'request_method',
        comment: '请求方式',
        length: 10,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '请求方式',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "requestMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operator_type',
        comment: '操作类别（0其它 1后台用户 2手机端用户）',
        default: '0',
        type: 'char',
        length: 1,
    }),
    __metadata("design:type", String)
], OperLog.prototype, "operatorType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'oper_name',
        comment: '操作人员',
        length: 50,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '操作人员',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "operName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dept_name',
        comment: '部门名称',
        length: 50,
        default: '',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "deptName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'oper_url',
        comment: '请求URL',
        length: 255,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '请求URL',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "operUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'oper_ip',
        comment: '主机地址',
        length: 128,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '主机地址',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "operIp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'oper_location',
        comment: '操作地点',
        length: 255,
        default: '',
    }),
    (0, excel_decorator_1.Excel)({
        name: '操作地点',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "operLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'oper_param',
        comment: '请求参数',
        length: 2000,
        default: '',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "operParam", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'json_result',
        comment: '返回参数',
        length: 2000,
        default: '',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "jsonResult", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        comment: '操作状态（0正常 1异常）',
        default: 0,
        type: 'int',
    }),
    (0, excel_decorator_1.Excel)({
        name: '操作状态',
        dictType: 'sys_common_status',
    }),
    __metadata("design:type", Number)
], OperLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'errorMsg',
        comment: '返回参数',
        length: 2000,
        default: '',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "errorMsg", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'oper_time',
        comment: '操作时间',
        type: 'datetime',
    }),
    (0, excel_decorator_1.Excel)({
        name: '操作时间',
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
    }),
    __metadata("design:type", String)
], OperLog.prototype, "operTime", void 0);
OperLog = __decorate([
    (0, typeorm_1.Entity)({
        name: 'oper_log',
    })
], OperLog);
exports.OperLog = OperLog;
//# sourceMappingURL=oper_log.entity.js.map