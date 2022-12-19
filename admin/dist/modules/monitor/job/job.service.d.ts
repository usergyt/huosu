import { ModuleRef } from '@nestjs/core';
import { Queue } from 'bull';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository } from 'typeorm';
import { ReqAddJob, ReqChangStatusDto, ReqJobListDto, ReqJobLogList } from './dto/req-job.dto';
import { Job } from './entities/job.entity';
import { JobLog } from './entities/job_log.entity';
export declare class JobService {
    private readonly jobRepository;
    private readonly jobLogRepository;
    private jobQueue;
    private readonly moduleRef;
    constructor(jobRepository: Repository<Job>, jobLogRepository: Repository<JobLog>, jobQueue: Queue, moduleRef: ModuleRef);
    onModuleInit(): Promise<void>;
    addJob(reqAddJob: ReqAddJob): Promise<void>;
    updataJob(job: Job): Promise<void>;
    jobList(reqJobListDto: ReqJobListDto): Promise<PaginatedDto<Job>>;
    oneJob(jobId: number): Promise<Job>;
    findByIds(jobIdArr: number[]): Promise<Job[]>;
    deleteJob(jobIdArr: number[] | string[]): Promise<import("typeorm").DeleteResult>;
    changeStatus(reqChangStatusDto: ReqChangStatusDto, updateBy: string): Promise<void>;
    addJobLog(jobLog: JobLog): Promise<JobLog>;
    jobLogList(reqJobLogList: ReqJobLogList): Promise<PaginatedDto<JobLog>>;
    deleteJogLog(jobLogIdArr: string[] | number[]): Promise<import("typeorm").DeleteResult>;
    cleanJobLog(): Promise<import("typeorm").DeleteResult>;
    initJob(): Promise<void>;
    start(job: Job): Promise<void>;
    stop(job: Job): Promise<void>;
    once(job: Job): Promise<void>;
    misfirePolicy(jobArr: Job[]): Promise<void>;
    analysisinvokeTarget(job: Job): Promise<{
        serviceName: string;
        funName: string;
        argumens: any;
    }>;
    ceshi(a: any, b: any, c: any, d: any): Promise<void>;
}
