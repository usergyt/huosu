import { StreamableFile } from '@nestjs/common';
import { DataObj } from 'src/common/class/data-obj.class';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { User as UserEntity } from '../user/entities/user.entity';
import { ReqAddRoleDto, ReqAllocatedListDto, ReqCancelAllDto, ReqCancelDto, ReqChangeStatusDto, ReqDataScopeDto, ReqRoleListDto, ReqUpdateRoleDto } from './dto/req-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';
export declare class RoleController {
    private readonly roleService;
    private readonly excelService;
    constructor(roleService: RoleService, excelService: ExcelService);
    add(reqAddRoleDto: ReqAddRoleDto, userName: string): Promise<void>;
    list(reqRoleListDto: ReqRoleListDto): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<Role>>;
    one(roleId: number): Promise<DataObj<Role>>;
    update(reqUpdateRoleDto: ReqUpdateRoleDto, userName: string): Promise<void>;
    dataScope(reqDataScopeDto: ReqDataScopeDto, userName: string): Promise<void>;
    delete(roleIds: string, userName: string): Promise<void>;
    changeStatus(reqChangeStatusDto: ReqChangeStatusDto, userName: string): Promise<void>;
    export(reqRoleListDto: ReqRoleListDto): Promise<StreamableFile>;
    allocatedList(reqAllocatedListDto: ReqAllocatedListDto): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<UserEntity>>;
    cancel(reqCancelDto: ReqCancelDto): Promise<void>;
    cancelAll(reqCancelAllDto: ReqCancelAllDto): Promise<void>;
    unallocatedList(reqAllocatedListDto: ReqAllocatedListDto): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<UserEntity>>;
    selectAll(reqCancelAllDto: ReqCancelAllDto): Promise<void>;
}
