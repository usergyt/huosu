import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { Role } from '../../role/entities/role.entity';
declare const ReqAddRoleDto_base: import("@nestjs/common").Type<Omit<Role, "roleId">>;
export declare class ReqAddRoleDto extends ReqAddRoleDto_base {
    menuIds: number[];
}
export declare class ReqUpdateRoleDto extends ReqAddRoleDto {
    roleId: number;
}
export declare class ReqDataScopeDto extends Role {
    deptIds: number[];
}
export declare class ReqRoleListDto extends PaginationDto {
    roleName?: string;
    roleKey?: string;
    status?: string;
    params: ParamsDto;
}
export declare class ReqChangeStatusDto {
    roleId: number;
    status: string;
}
export declare class ReqAllocatedListDto extends PaginationDto {
    roleId: number;
    userName?: string;
    phonenumber?: string;
}
export declare class ReqCancelDto {
    roleId: number;
    userId: number;
}
export declare class ReqCancelAllDto {
    roleId: number;
    userIds: string;
}
export {};
