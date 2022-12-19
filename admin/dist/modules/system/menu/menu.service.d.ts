import { TreeDataDto } from 'src/common/dto/tree-data.dto';
import { SharedService } from 'src/shared/shared.service';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { ReqAddMenuDto, ReqMenuListDto } from './dto/req-menu.dto';
import { Router } from './dto/res-menu.dto';
import { Menu } from './entities/menu.entity';
export declare class MenuService {
    private readonly menuRepository;
    private readonly sharedService;
    private readonly roleService;
    constructor(menuRepository: Repository<Menu>, sharedService: SharedService, roleService: RoleService);
    addOrUpdate(reqAddMenuDto: ReqAddMenuDto): Promise<void>;
    list(reqMenuListDto: ReqMenuListDto): Promise<any[]>;
    findById(menuId: number): Promise<Menu>;
    findRawById(menuId: number | string): Promise<any>;
    outList(menuId: number | string): Promise<any[]>;
    findChildsByParentId(parentId: number): Promise<Menu[]>;
    delete(menuId: number): Promise<import("typeorm").DeleteResult>;
    listByIdArr(menuIdArr: number[]): Promise<Menu[]>;
    treeselect(): Promise<TreeDataDto[]>;
    getCheckedKeys(roleId: number): Promise<number[]>;
    getAllPermissionsByRoles(roleIdArr: number[]): Promise<string[]>;
    getMenuList(isAdmin: boolean, roleIdArr: number[]): Promise<Router[]>;
    createRouterTree(menuArr: Menu[]): Router[];
    firstToUpper(pathStr: string): string;
}
