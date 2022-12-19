import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { Job } from '../entities/job.entity';
declare const ReqAddJob_base: import("@nestjs/common").Type<Omit<Job, "jobId">>;
export declare class ReqAddJob extends ReqAddJob_base {
}
export declare class ReqJobListDto extends PaginationDto {
    jobName?: string;
    jobGroup?: string;
    status?: string;
}
export declare class ReqChangStatusDto {
    jobId: number;
    status: string;
}
export declare class ReqJobLogList extends PaginationDto {
    jobName?: string;
    jobGroup?: string;
    status?: string;
    params?: ParamsDto;
}
export declare class ReqJobRunDto {
    jobGroup: string;
    jobId: number;
}
export {};
