import { BaseEntity } from 'src/common/entities/base.entity';
import { Role } from '../../role/entities/role.entity';
import { User } from '../../user/entities/user.entity';
export declare class Dept extends BaseEntity {
    deptId: number;
    deptName: string;
    orderNum: number;
    leader?: string;
    phone?: string;
    email?: string;
    status: string;
    delFlag: string;
    children: Dept[];
    parent: Dept;
    roles: Role[];
    users: User[];
}
