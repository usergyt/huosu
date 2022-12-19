import { Menu } from '../entities/menu.entity';
export declare class ReqMenuListDto {
    menuName?: string;
    status?: string;
}
declare const ReqAddMenuDto_base: import("@nestjs/common").Type<Omit<Menu, "menuId">>;
export declare class ReqAddMenuDto extends ReqAddMenuDto_base {
    parentId: number;
}
export declare class ReqUpdateMenu extends Menu {
    parentId: number;
}
export {};
