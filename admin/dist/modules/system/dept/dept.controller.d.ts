import { DataObj } from 'src/common/class/data-obj.class';
import { DeptService } from './dept.service';
import { ReqAddDeptDto, ReqDeptListDto, ReqUpdateDept } from './dto/req-dept.dto';
import { ResRoleDeptTreeselectDto } from './dto/res-dept.dto';
export declare class DeptController {
    private readonly deptService;
    constructor(deptService: DeptService);
    add(ReqAddDeptDto: ReqAddDeptDto, userName: string): Promise<void>;
    list(reqDeptListDto: ReqDeptListDto): Promise<DataObj<any[]>>;
    treeselect(): Promise<DataObj<any[]>>;
    one(deptId: number): Promise<DataObj<any>>;
    outList(deptId: number): Promise<DataObj<any[]>>;
    update(reqUpdateDept: ReqUpdateDept, userName: string): Promise<void>;
    delete(deptId: string, userName: string): Promise<void>;
    roleDeptTreeselect(roleId: number): Promise<ResRoleDeptTreeselectDto>;
}
