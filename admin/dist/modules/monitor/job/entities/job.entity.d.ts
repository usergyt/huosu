import { BaseEntity } from 'src/common/entities/base.entity';
export declare class Job extends BaseEntity {
    jobId: number;
    jobName: string;
    jobGroup: string;
    invokeTarget: string;
    cronExpression: string;
    misfirePolicy: string;
    concurrent: string;
    status: string;
}
