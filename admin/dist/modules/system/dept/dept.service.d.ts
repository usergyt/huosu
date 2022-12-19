import { SharedService } from 'src/shared/shared.service';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { ReqAddDeptDto, ReqDeptListDto } from './dto/req-dept.dto';
import { Dept } from './entities/dept.entity';
export declare class DeptService {
    private readonly deptRepository;
    private readonly roleService;
    private readonly sharedService;
    constructor(deptRepository: Repository<Dept>, roleService: RoleService, sharedService: SharedService);
    addOrUpdate(reqAddDeptDto: ReqAddDeptDto): Promise<void>;
    list(reqDeptListDto: ReqDeptListDto): Promise<any[]>;
    findById(deptId: number): Promise<Dept>;
    findRawById(deptId: number | string): Promise<any>;
    outList(deptId: number | string): Promise<any[]>;
    findChildsByParentId(parentId: string): Promise<Dept[]>;
    delete(deptId: string, userName: string): Promise<import("typeorm").UpdateResult>;
    treeselect(): Promise<any[]>;
    getCheckedKeys(roleId: number | string): Promise<number[]>;
    listByIdArr(deptIdArr: number[]): Promise<Dept[]>;
    listByIdArrFilter(deptIdArr: number[]): Promise<Dept[]>;
}
