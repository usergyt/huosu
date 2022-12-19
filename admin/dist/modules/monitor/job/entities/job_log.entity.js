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
exports.JobLog = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
let JobLog = class JobLog {
    static _OPENAPI_METADATA_FACTORY() {
        return { jobLogId: { required: true, type: () => Number, description: "\u4EFB\u52A1\u65E5\u5FD7ID" }, jobName: { required: true, type: () => String, description: "\u4EFB\u52A1\u540D\u79F0" }, jobGroup: { required: true, type: () => String, description: "\u4EFB\u52A1\u7EC4\u540D" }, invokeTarget: { required: true, type: () => String, description: "\u8C03\u7528\u76EE\u6807\u5B57\u7B26\u4E32" }, jobMessage: { required: true, type: () => String, description: "\u65E5\u5FD7\u4FE1\u606F" }, status: { required: true, type: () => String, description: "\u6267\u884C\u72B6\u6001\uFF080\u6B63\u5E38 1\u5931\u8D25\uFF09" }, exceptionInfo: { required: true, type: () => String, description: "\u5F02\u5E38\u4FE1\u606F" }, createTime: { required: true, type: () => Object } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'job_log_id',
        comment: '任务日志ID',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobLog.prototype, "jobLogId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'job_name',
        comment: '任务名称',
        length: 64,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '任务名称',
    }),
    __metadata("design:type", String)
], JobLog.prototype, "jobName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'job_group',
        comment: '任务组名',
        length: 64,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '任务组名',
        dictType: 'sys_job_group',
    }),
    __metadata("design:type", String)
], JobLog.prototype, "jobGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'invoke_target',
        comment: '调用目标字符串',
        length: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '调用目标字符串',
    }),
    __metadata("design:type", String)
], JobLog.prototype, "invokeTarget", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'job_message',
        comment: '日志信息',
        length: 500,
        default: null,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '日志信息',
    }),
    __metadata("design:type", String)
], JobLog.prototype, "jobMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        comment: '执行状态（0正常 1失败）',
        default: '0',
        type: 'char',
        length: 1,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '执行状态',
        dictType: 'sys_common_status',
    }),
    __metadata("design:type", String)
], JobLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'exception_info',
        comment: '异常信息',
        length: 2000,
        default: '',
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '异常信息',
    }),
    __metadata("design:type", String)
], JobLog.prototype, "exceptionInfo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_time', comment: '创建时间' }),
    (0, excel_decorator_1.Excel)({
        name: '创建时间',
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
    }),
    __metadata("design:type", Object)
], JobLog.prototype, "createTime", void 0);
JobLog = __decorate([
    (0, typeorm_1.Entity)({
        name: 'job_log',
    })
], JobLog);
exports.JobLog = JobLog;
//# sourceMappingURL=job_log.entity.js.map