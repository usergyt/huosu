import { ModuleRef } from '@nestjs/core';
import { Job } from 'bull';
import { Job as SysJob } from './entities/job.entity';
import { JobService } from './job.service';
export declare class JobConsumer {
    private jobService;
    private readonly moduleRef;
    constructor(jobService: JobService, moduleRef: ModuleRef);
    handle(job: Job<SysJob>): Promise<void>;
    onCompleted(job: Job<SysJob>): Promise<void>;
    onFailed(job: Job<SysJob>, err: Error): Promise<void>;
}
