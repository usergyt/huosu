import { ParamsDto } from 'src/common/dto/params.dto';
import { User } from '../entities/user.entity';
export declare class ReqUserListDto {
    userName?: string;
    phonenumber?: string;
    status?: string;
    deptId?: number;
    params: ParamsDto;
}
declare const ReqAddUserDto_base: import("@nestjs/common").Type<Omit<User, "userId">>;
export declare class ReqAddUserDto extends ReqAddUserDto_base {
    deptId?: number;
    postIds: number[];
    roleIds: number[];
}
declare const ReqUpdateUserDto_base: import("@nestjs/common").Type<Omit<User, "password">>;
export declare class ReqUpdateUserDto extends ReqUpdateUserDto_base {
    deptId?: number;
    postIds: number[];
    roleIds: number[];
}
export declare class ReqResetPwdDto {
    userId: number;
    password: string;
}
export declare class ReqUpdateAuthRoleDto {
    userId: number;
    roleIds: string;
}
export declare class ReqChangeStatusDto {
    userId: number;
    status: string;
}
export declare class ReqUpdataSelfDto {
    nickName?: string;
    phonenumber?: string;
    email?: string;
    sex?: string;
    avatar: string;
}
export declare class ReqUpdateSelfPwd {
    oldPassword: string;
    newPassword: string;
}
export {};
