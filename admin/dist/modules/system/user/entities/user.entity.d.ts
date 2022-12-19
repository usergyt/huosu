import { BaseEntity } from 'src/common/entities/base.entity';
import { Dept } from '../../dept/entities/dept.entity';
import { Post } from '../../post/entities/post.entity';
import { Role } from '../../role/entities/role.entity';
export declare class User extends BaseEntity {
    userId: number;
    userName: string;
    nickName: string;
    userType?: string;
    email?: string;
    phonenumber?: string;
    sex: string;
    avatar?: string;
    password: string;
    salt: string;
    status: string;
    delFlag: string;
    loginIp?: string;
    loginDate?: Date;
    dept: Dept;
    posts: Post[];
    roles: Role[];
}
