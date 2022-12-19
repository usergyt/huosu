export declare class DeptOrUserAlias {
    deptAlias?: string;
    userAlias?: string;
}
export declare const DataScope: (deptOrUserAlias?: DeptOrUserAlias) => import("@nestjs/common").CustomDecorator<string>;
