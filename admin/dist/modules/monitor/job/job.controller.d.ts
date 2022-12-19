import { StreamableFile } from '@nestjs/common';
import { DataObj } from 'src/common/class/data-obj.class';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ReqAddJob, ReqChangStatusDto, ReqJobListDto, ReqJobLogList, ReqJobRunDto } from './dto/req-job.dto';
import { Job } from './entities/job.entity';
import { JobLog } from './entities/job_log.entity';
import { JobService } from './job.service';
export declare class JobController {
    private readonly jobService;
    private readonly excelService;
    constructor(jobService: JobService, excelService: ExcelService);
    addJob(reqAddJob: ReqAddJob, userName: string): Promise<void>;
    jobList(reqJobListDto: ReqJobListDto): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<Job>>;
    oneJob(jobId: number): Promise<DataObj<Job>>;
    updataJob(job: Job, userName: string): Promise<void>;
    run(reqJobRunDto: ReqJobRunDto): Promise<void>;
    deleteJob(jobIds: string): Promise<void>;
    changeStatus(reqChangStatusDto: ReqChangStatusDto, userName: string): Promise<void>;
    exportJob(reqJobListDto: ReqJobListDto): Promise<StreamableFile>;
    jobLogList(reqJobLogList: ReqJobLogList): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<JobLog>>;
    cleanJobLog(): Promise<void>;
    deleteJogLog(jobLogIds: string): Promise<void>;
    exportJobLog(reqJobLogList: ReqJobLogList): Promise<StreamableFile>;
}
