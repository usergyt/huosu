import { LogicalEnum } from '../enums/logical.enum';
export declare type RoleObj = {
    roleArr: string[];
    logical: LogicalEnum;
};
export declare const RequiresRoles: (roles: string | string[], logical?: LogicalEnum) => import("@nestjs/common").CustomDecorator<string>;
