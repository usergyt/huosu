import { TreeDataDto } from 'src/common/dto/tree-data.dto';
export declare class ResRoleMenuTreeselectDto {
    checkedKeys: number[];
    menus: TreeDataDto[];
}
export declare class Router {
    menuId: number;
    parentId: number;
    name?: string;
    path?: string;
    hidden?: boolean;
    redirect?: string;
    component?: string;
    alwaysShow?: boolean;
    meta?: {
        title?: string;
        icon?: string;
        noCache?: boolean;
        link?: string | null;
    };
    children?: Router[];
}
