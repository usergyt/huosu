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
exports.JobConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const core_1 = require("@nestjs/core");
const bull_contants_1 = require("../../../common/contants/bull.contants");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const job_log_entity_1 = require("./entities/job_log.entity");
const job_service_1 = require("./job.service");
let JobConsumer = class JobConsumer {
    constructor(jobService, moduleRef) {
        this.jobService = jobService;
        this.moduleRef = moduleRef;
    }
    async handle(job) {
        try {
            const { serviceName, funName, argumens } = await this.jobService.analysisinvokeTarget(job.data);
            const service = await this.moduleRef.get(serviceName, { strict: false });
            if (job.data.concurrent == '0') {
                service[funName](...argumens);
            }
            else if (job.data.concurrent == '1') {
                await service[funName](...argumens);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async onCompleted(job) {
        const jobLog = new job_log_entity_1.JobLog();
        const oneJob = job.data;
        jobLog.jobName = oneJob.jobName;
        jobLog.jobGroup = oneJob.jobGroup;
        jobLog.invokeTarget = oneJob.invokeTarget;
        jobLog.jobMessage = '执行成功';
        jobLog.status = '0';
        jobLog.createTime = new Date();
        await this.jobService.addJobLog(jobLog);
    }
    async onFailed(job, err) {
        const jobLog = new job_log_entity_1.JobLog();
        const oneJob = job.data;
        jobLog.jobName = oneJob.jobName;
        jobLog.jobGroup = oneJob.jobGroup;
        jobLog.invokeTarget = oneJob.invokeTarget;
        jobLog.jobMessage = '执行失败了';
        jobLog.exceptionInfo =
            err instanceof api_exception_1.ApiException ? err.getResponse().toString() : err.message;
        jobLog.status = '1';
        jobLog.createTime = new Date();
        await this.jobService.addJobLog(jobLog);
    }
};
__decorate([
    (0, bull_1.Process)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobConsumer.prototype, "handle", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobConsumer.prototype, "onCompleted", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", Promise)
], JobConsumer.prototype, "onFailed", null);
JobConsumer = __decorate([
    (0, bull_1.Processor)(bull_contants_1.JOB_BULL_KEY),
    __metadata("design:paramtypes", [job_service_1.JobService,
        core_1.ModuleRef])
], JobConsumer);
exports.JobConsumer = JobConsumer;
//# sourceMappingURL=job.processor.js.map