import { BaseEntity } from 'src/common/entities/base.entity';
import { Dept } from '../../dept/entities/dept.entity';
import { Menu } from '../../menu/entities/menu.entity';
import { User } from '../../user/entities/user.entity';
export declare class Role extends BaseEntity {
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope?: string;
    menuCheckStrictly: boolean;
    deptCheckStrictly: boolean;
    status: string;
    delFlag: string;
    depts: Dept[];
    menus: Menu[];
    users: User[];
}
