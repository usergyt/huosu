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
exports.JobService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const bull_contants_1 = require("../../../common/contants/bull.contants");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const typeorm_2 = require("typeorm");
const req_job_dto_1 = require("./dto/req-job.dto");
const job_entity_1 = require("./entities/job.entity");
const job_log_entity_1 = require("./entities/job_log.entity");
let JobService = class JobService {
    constructor(jobRepository, jobLogRepository, jobQueue, moduleRef) {
        this.jobRepository = jobRepository;
        this.jobLogRepository = jobLogRepository;
        this.jobQueue = jobQueue;
        this.moduleRef = moduleRef;
    }
    async onModuleInit() {
        await this.initJob();
    }
    async addJob(reqAddJob) {
        await this.analysisinvokeTarget(reqAddJob);
        const job = await this.jobRepository.save(reqAddJob);
        if (job.status == '0') {
            await this.start(job);
        }
    }
    async updataJob(job) {
        await this.analysisinvokeTarget(job);
        job = await this.jobRepository.save(job);
        if (job.status == '0') {
            await this.stop(job);
            await this.start(job);
        }
        else {
            await this.stop(job);
        }
    }
    async jobList(reqJobListDto) {
        const where = {};
        if (reqJobListDto.jobName) {
            where.jobName = (0, typeorm_2.Like)(`%${reqJobListDto.jobName}%`);
        }
        if (reqJobListDto.jobGroup) {
            where.jobGroup = reqJobListDto.jobGroup;
        }
        if (reqJobListDto.status) {
            where.status = reqJobListDto.status;
        }
        const result = await this.jobRepository.findAndCount({
            where,
            order: { createTime: 1 },
            skip: reqJobListDto.skip,
            take: reqJobListDto.take,
        });
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async oneJob(jobId) {
        return this.jobRepository.findOneBy({ jobId });
    }
    async findByIds(jobIdArr) {
        return await this.jobRepository.find({
            where: {
                jobId: (0, typeorm_2.In)(jobIdArr),
            },
        });
    }
    async deleteJob(jobIdArr) {
        return this.jobRepository.delete(jobIdArr);
    }
    async changeStatus(reqChangStatusDto, updateBy) {
        await this.jobRepository
            .createQueryBuilder('job')
            .update()
            .set({
            status: reqChangStatusDto.status,
            updateBy,
        })
            .where({ jobId: reqChangStatusDto.jobId })
            .execute();
        const job = await this.oneJob(reqChangStatusDto.jobId);
        if (job.status == '0') {
            await this.start(job);
        }
        else {
            await this.stop(job);
        }
    }
    async addJobLog(jobLog) {
        return await this.jobLogRepository.save(jobLog);
    }
    async jobLogList(reqJobLogList) {
        const where = {};
        if (reqJobLogList.jobName) {
            where.jobName = (0, typeorm_2.Like)(`%${reqJobLogList.jobName}%`);
        }
        if (reqJobLogList.jobGroup) {
            where.jobGroup = reqJobLogList.jobGroup;
        }
        if (reqJobLogList.status) {
            where.status = reqJobLogList.status;
        }
        if (reqJobLogList.params) {
            where.createTime = (0, typeorm_2.Between)(reqJobLogList.params.beginTime, moment(reqJobLogList.params.endTime).add(1, 'day').format());
        }
        const result = await this.jobLogRepository.findAndCount({
            where,
            order: { createTime: 1 },
            skip: reqJobLogList.skip,
            take: reqJobLogList.take,
        });
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async deleteJogLog(jobLogIdArr) {
        return await this.jobLogRepository.delete(jobLogIdArr);
    }
    async cleanJobLog() {
        return await this.jobLogRepository
            .createQueryBuilder('jobLog')
            .delete()
            .execute();
    }
    async initJob() {
        const jobObjArr = await this.jobQueue.getRepeatableJobs();
        await Promise.all(jobObjArr.map(async (item) => await this.jobQueue.removeRepeatableByKey(item.key)));
        await this.jobQueue.empty();
        const failJobArr = await this.jobQueue.getFailed();
        await this.misfirePolicy(failJobArr.map((item) => item.data));
        await this.jobQueue.clean(0, 'failed');
        const reqJobListDto = new req_job_dto_1.ReqJobListDto();
        reqJobListDto.status = '0';
        const { rows } = await this.jobList(reqJobListDto);
        await Promise.all(rows.map((job) => this.start(job)));
    }
    async start(job) {
        const repeat = {
            cron: job.cronExpression,
        };
        await this.jobQueue.add(job, {
            jobId: job.jobId,
            removeOnComplete: true,
            removeOnFail: false,
            repeat: repeat,
        });
    }
    async stop(job) {
        const jobObjArr = await this.jobQueue.getRepeatableJobs();
        const hasObj = jobObjArr.find((item) => item.id == job.jobId.toString());
        if (hasObj) {
            await this.jobQueue.removeRepeatableByKey(hasObj.key);
        }
    }
    async once(job) {
        await this.jobQueue.add(job, {
            jobId: job.jobId,
            removeOnComplete: true,
            removeOnFail: false,
        });
    }
    async misfirePolicy(jobArr) {
        jobArr = await this.findByIds(jobArr.map((item) => item.jobId));
        const immediately = [];
        const executeOnce = [];
        jobArr.forEach((job) => {
            if (job.misfirePolicy == '1') {
                immediately.push(job);
            }
            if (job.misfirePolicy == '2' &&
                !executeOnce.find((job2) => job.jobId == job2.jobId)) {
                executeOnce.push(job);
            }
        });
        await Promise.all([...immediately, ...executeOnce].map(async (job) => await this.once(job)));
    }
    async analysisinvokeTarget(job) {
        const invokeTarget = job.invokeTarget;
        const splitArr = invokeTarget.split('.');
        if (splitArr.length != 2)
            throw new api_exception_1.ApiException('调用方法格式错误');
        const serviceName = splitArr[0];
        if (!(splitArr[1].includes('(') && splitArr[1].includes(')')))
            throw new api_exception_1.ApiException('调用方法格式错误');
        const funName = splitArr[1].match(/(\S*)\(/)[1];
        if (!funName)
            throw new api_exception_1.ApiException('调用方法格式错误');
        const argumens = eval('[' + splitArr[1].match(/\((\S*)\)/)[1] + ']');
        let service;
        try {
            service = await this.moduleRef.get(serviceName, { strict: false });
            if (!service || !(funName in service)) {
                throw new api_exception_1.ApiException('调用方法未找到');
            }
        }
        catch (error) {
            throw new api_exception_1.ApiException('调用方法未找到');
        }
        return {
            serviceName,
            funName,
            argumens,
        };
    }
    async ceshi(a, b, c, d) {
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        console.log('试一试定时任务');
        console.log(new Date());
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 10 * 1000);
        });
    }
};
JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(1, (0, typeorm_1.InjectRepository)(job_log_entity_1.JobLog)),
    __param(2, (0, bull_1.InjectQueue)(bull_contants_1.JOB_BULL_KEY)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, core_1.ModuleRef])
], JobService);
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map