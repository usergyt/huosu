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
exports.Job = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("../../../../common/entities/base.entity");
const excel_decorator_1 = require("../../../common/excel/excel.decorator");
const typeorm_1 = require("typeorm");
let Job = class Job extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { jobId: { required: true, type: () => Number, description: "\u4EFB\u52A1Id" }, jobName: { required: true, type: () => String, description: "\u4EFB\u52A1\u540D\u79F0" }, jobGroup: { required: true, type: () => String, description: "\u4EFB\u52A1\u7EC4\u540D" }, invokeTarget: { required: true, type: () => String, description: "\u8C03\u7528\u76EE\u6807\u5B57\u7B26\u4E32" }, cronExpression: { required: true, type: () => String, description: "cron\u6267\u884C\u8868\u8FBE\u5F0F" }, misfirePolicy: { required: true, type: () => String, description: "\u8BA1\u5212\u6267\u884C\u9519\u8BEF\u7B56\u7565\uFF081\u7ACB\u5373\u6267\u884C 2\u6267\u884C\u4E00\u6B21 3\u653E\u5F03\u6267\u884C\uFF09" }, concurrent: { required: true, type: () => String, description: "\u662F\u5426\u5E76\u53D1\u6267\u884C\uFF080\u5141\u8BB8 1\u7981\u6B62\uFF09" }, status: { required: true, type: () => String, description: "\u72B6\u6001\uFF080\u6B63\u5E38 1\u6682\u505C\uFF09" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'job_id',
        comment: '任务ID',
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Job.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'job_name',
        comment: '任务名称',
        default: '',
        length: 64,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '任务名称',
    }),
    __metadata("design:type", String)
], Job.prototype, "jobName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'job_group',
        comment: '任务组名',
        default: 'DEFAULT',
        length: 64,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '任务组名',
        dictType: 'sys_job_group',
    }),
    __metadata("design:type", String)
], Job.prototype, "jobGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'invoke_target',
        comment: '调用目标字符串',
        default: null,
        length: 225,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '调用目标字符串',
    }),
    __metadata("design:type", String)
], Job.prototype, "invokeTarget", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cron_expression',
        comment: 'cron执行表达式',
        default: '',
        length: 225,
    }),
    (0, excel_decorator_1.Excel)({
        name: 'cron执行表达式',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Job.prototype, "cronExpression", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'misfire_policy',
        comment: '计划执行错误策略（1立即执行 2执行一次 3放弃执行）',
        default: '3',
        length: 20,
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '计划执行错误策略',
        readConverterExp: {
            1: '立即执行',
            2: '执行一次',
            3: '放弃执行',
        },
    }),
    __metadata("design:type", String)
], Job.prototype, "misfirePolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'concurrent',
        comment: '是否并发执行（0允许 1禁止）',
        default: '1',
        type: 'char',
        length: 1,
    }),
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Job.prototype, "concurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        comment: '状态（0正常 1暂停）',
        default: '0',
        type: 'char',
        length: 1,
    }),
    (0, class_validator_1.IsString)(),
    (0, excel_decorator_1.Excel)({
        name: '状态',
        dictType: 'sys_job_status',
    }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
Job = __decorate([
    (0, typeorm_1.Entity)()
], Job);
exports.Job = Job;
//# sourceMappingURL=job.entity.js.map