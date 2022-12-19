import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository } from 'typeorm';
import { DeptService } from '../dept/dept.service';
import { MenuService } from '../menu/menu.service';
import { UserService } from '../user/user.service';
import { ReqAddRoleDto, ReqAllocatedListDto, ReqDataScopeDto, ReqRoleListDto } from './dto/req-role.dto';
import { Role } from './entities/role.entity';
export declare class RoleService {
    private readonly roleRepository;
    private readonly menuService;
    private readonly deptService;
    private readonly userService;
    constructor(roleRepository: Repository<Role>, menuService: MenuService, deptService: DeptService, userService: UserService);
    addOrUpdate(reqAddRoleDto: ReqAddRoleDto): Promise<void>;
    list(reqRoleListDto: ReqRoleListDto): Promise<PaginatedDto<Role>>;
    findById(roleId: number): Promise<Role>;
    delete(roleIdArr: string[], userName: string): Promise<import("typeorm").UpdateResult>;
    updateDataScope(reqDataScopeDto: ReqDataScopeDto): Promise<ReqDataScopeDto & Role>;
    listByIdArr(idArr: number[]): Promise<Role[]>;
    changeStatus(roleId: number, status: string, updateBy: string): Promise<import("typeorm").UpdateResult>;
    allocatedListByRoleId(reqAllocatedListDto: ReqAllocatedListDto, reverse?: boolean): Promise<PaginatedDto<import("../user/entities/user.entity").User>>;
    cancel(roleId: number, userIdArr: number[] | string[]): Promise<void>;
    selectAll(roleId: number, userIdArr: number[] | string[]): Promise<void>;
}
