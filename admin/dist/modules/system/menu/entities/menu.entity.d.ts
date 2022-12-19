import { BaseEntity } from 'src/common/entities/base.entity';
import { Role } from '../../role/entities/role.entity';
export declare class Menu extends BaseEntity {
    menuId: number;
    menuName: string;
    orderNum: number;
    path: string;
    component?: string;
    query?: string;
    isFrame: number;
    isCache?: number;
    menuType: string;
    visible?: string;
    status?: string;
    perms?: string;
    icon?: string;
    children: Menu[];
    parent: Menu;
    roles: Role[];
}
