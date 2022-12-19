import { DataObj } from 'src/common/class/data-obj.class';
import { TreeDataDto } from 'src/common/dto/tree-data.dto';
import { ReqAddMenuDto, ReqMenuListDto, ReqUpdateMenu } from './dto/req-menu.dto';
import { ResRoleMenuTreeselectDto } from './dto/res-menu.dto';
import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    add(reqAddMenuDto: ReqAddMenuDto, userName: string): Promise<void>;
    list(reqMenuListDto: ReqMenuListDto): Promise<DataObj<any[]>>;
    treeselect(): Promise<DataObj<TreeDataDto[]>>;
    one(menuId: number): Promise<DataObj<any>>;
    outList(menuId: number): Promise<DataObj<any[]>>;
    update(reqUpdateMenu: ReqUpdateMenu, userName: string): Promise<void>;
    delete(menuId: number): Promise<void>;
    roleMenuTreeselect(roleId: number): Promise<ResRoleMenuTreeselectDto>;
}
