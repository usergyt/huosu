import { Post } from '../../post/entities/post.entity';
import { Role } from '../../role/entities/role.entity';
import { User } from '../entities/user.entity';
export declare class ResUserDto extends User {
    deptId: number;
    postIds: number[];
    roleIds: number[];
}
export declare class ResUserInfoDto {
    data?: ResUserDto;
    postIds?: number[];
    roleIds?: number[];
    posts: Post[];
    roles: Role[];
}
export declare class ResHasRoleDto extends Role {
    flag: boolean;
}
export declare class ResAuthRoleDto {
    roles: ResHasRoleDto[];
    user: User;
}
