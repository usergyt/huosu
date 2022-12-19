import { Dept } from '../entities/dept.entity';
export declare class ReqDeptListDto {
    deptName?: string;
    status?: string;
}
declare const ReqAddDeptDto_base: import("@nestjs/common").Type<Omit<Dept, "deptId">>;
export declare class ReqAddDeptDto extends ReqAddDeptDto_base {
    parentId: number;
}
export declare class ReqUpdateDept extends Dept {
    parentId: number;
}
export {};
