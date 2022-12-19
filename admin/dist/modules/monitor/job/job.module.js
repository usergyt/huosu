"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModule = void 0;
const job_service_1 = require("./job.service");
const job_controller_1 = require("./job.controller");
const common_1 = require("@nestjs/common");
const job_entity_1 = require("./entities/job.entity");
const job_log_entity_1 = require("./entities/job_log.entity");
const typeorm_1 = require("@nestjs/typeorm");
const bull_1 = require("@nestjs/bull");
const bull_contants_1 = require("../../../common/contants/bull.contants");
const job_processor_1 = require("./job.processor");
let JobModule = class JobModule {
};
JobModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([job_entity_1.Job, job_log_entity_1.JobLog]),
            bull_1.BullModule.registerQueue({
                name: bull_contants_1.JOB_BULL_KEY,
            }),
        ],
        controllers: [job_controller_1.JobController],
        providers: [job_service_1.JobService, job_processor_1.JobConsumer],
        exports: [job_service_1.JobService, job_processor_1.JobConsumer],
    })
], JobModule);
exports.JobModule = JobModule;
//# sourceMappingURL=job.module.js.map