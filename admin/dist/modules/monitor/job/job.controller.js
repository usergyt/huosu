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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const data_obj_class_1 = require("../../../common/class/data-obj.class");
const api_data_response_decorator_1 = require("../../../common/decorators/api-data-response.decorator");
const api_paginated_response_decorator_1 = require("../../../common/decorators/api-paginated-response.decorator");
const keep_decorator_1 = require("../../../common/decorators/keep.decorator");
const repeat_submit_decorator_1 = require("../../../common/decorators/repeat-submit.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const user_decorator_1 = require("../../../common/decorators/user.decorator");
const pagination_pipe_1 = require("../../../common/pipes/pagination.pipe");
const user_info_pipe_1 = require("../../../common/pipes/user-info.pipe");
const excel_service_1 = require("../../common/excel/excel.service");
const req_job_dto_1 = require("./dto/req-job.dto");
const job_entity_1 = require("./entities/job.entity");
const job_log_entity_1 = require("./entities/job_log.entity");
const job_service_1 = require("./job.service");
let JobController = class JobController {
    constructor(jobService, excelService) {
        this.jobService = jobService;
        this.excelService = excelService;
    }
    async addJob(reqAddJob, userName) {
        reqAddJob.createBy = reqAddJob.updateBy = userName;
        await this.jobService.addJob(reqAddJob);
    }
    async jobList(reqJobListDto) {
        return this.jobService.jobList(reqJobListDto);
    }
    async oneJob(jobId) {
        const job = await this.jobService.oneJob(jobId);
        return data_obj_class_1.DataObj.create(job);
    }
    async updataJob(job, userName) {
        job.updateBy = userName;
        await this.jobService.updataJob(job);
    }
    async run(reqJobRunDto) {
        const job = await this.jobService.oneJob(reqJobRunDto.jobId);
        await this.jobService.once(job);
    }
    async deleteJob(jobIds) {
        await this.jobService.deleteJob(jobIds.split(','));
    }
    async changeStatus(reqChangStatusDto, userName) {
        await this.jobService.changeStatus(reqChangStatusDto, userName);
    }
    async exportJob(reqJobListDto) {
        const { rows } = await this.jobService.jobList(reqJobListDto);
        const file = await this.excelService.export(job_entity_1.Job, rows);
        return new common_1.StreamableFile(file);
    }
    async jobLogList(reqJobLogList) {
        return await this.jobService.jobLogList(reqJobLogList);
    }
    async cleanJobLog() {
        await this.jobService.cleanJobLog();
    }
    async deleteJogLog(jobLogIds) {
        await this.jobService.deleteJogLog(jobLogIds.split(','));
    }
    async exportJobLog(reqJobLogList) {
        const { rows } = await this.jobService.jobLogList(reqJobLogList);
        const file = await this.excelService.export(job_log_entity_1.JobLog, rows);
        return new common_1.StreamableFile(file);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u4EFB\u52A1" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('job'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:job:add'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_job_dto_1.ReqAddJob, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "addJob", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u4EFB\u52A1\u5217\u8868" }),
    (0, common_1.Get)('job/list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:job:query'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(job_entity_1.Job),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_job_dto_1.ReqJobListDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "jobList", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7id\u67E5\u8BE2\u4EFB\u52A1" }),
    (0, common_1.Get)('job/:jobId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:job:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, job_entity_1.Job),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "oneJob", null);
__decorate([
    openapi.ApiOperation({ description: "\u7F16\u8F91\u4EFB\u52A1" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('job'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:job:edit'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_entity_1.Job, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "updataJob", null);
__decorate([
    openapi.ApiOperation({ description: "\u6267\u884C\u4E00\u6B21" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('job/run'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:job:edit'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_job_dto_1.ReqJobRunDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "run", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u4EFB\u52A1" }),
    (0, common_1.Delete)('job/:jobIds'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:job:remove'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('jobIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "deleteJob", null);
__decorate([
    openapi.ApiOperation({ description: "\u66F4\u6539\u4EFB\u52A1\u72B6\u6001" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('job/changeStatus'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:job:changeStatus'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_job_dto_1.ReqChangStatusDto, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "changeStatus", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA\u5B9A\u65F6\u4EFB\u52A1" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('job/export'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('monitor:job:export'),
    (0, keep_decorator_1.Keep)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_job_dto_1.ReqJobListDto]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "exportJob", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u4EFB\u52A1\u8C03\u5EA6\u65E5\u5FD7" }),
    (0, common_1.Get)('jobLog/list'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(job_log_entity_1.JobLog),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_job_dto_1.ReqJobLogList]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "jobLogList", null);
__decorate([
    openapi.ApiOperation({ description: "\u6E05\u7A7A\u4EFB\u52A1\u8C03\u5EA6\u65E5\u5FD7" }),
    (0, common_1.Delete)('jobLog/clean'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "cleanJobLog", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u4EFB\u52A1\u8C03\u5EA6\u65E5\u5FD7" }),
    (0, common_1.Delete)('jobLog/:jobLogIds'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('jobLogIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "deleteJogLog", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA\u5B9A\u65F6\u4EFB\u52A1\u65E5\u5FD7" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('jobLog/export'),
    (0, keep_decorator_1.Keep)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_job_dto_1.ReqJobLogList]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "exportJobLog", null);
JobController = __decorate([
    (0, swagger_1.ApiTags)('任务管理'),
    (0, common_1.Controller)('monitor'),
    __metadata("design:paramtypes", [job_service_1.JobService,
        excel_service_1.ExcelService])
], JobController);
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map