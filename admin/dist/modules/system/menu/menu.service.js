"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_service_1 = require("../../../shared/shared.service");
const typeorm_2 = require("typeorm");
const role_service_1 = require("../role/role.service");
const res_menu_dto_1 = require("./dto/res-menu.dto");
const menu_entity_1 = require("./entities/menu.entity");
let MenuService = class MenuService {
    constructor(menuRepository, sharedService, roleService) {
        this.menuRepository = menuRepository;
        this.sharedService = sharedService;
        this.roleService = roleService;
    }
    async addOrUpdate(reqAddMenuDto) {
        if (reqAddMenuDto.parentId) {
            const parentMenu = await this.findById(reqAddMenuDto.parentId);
            reqAddMenuDto.parent = parentMenu;
        }
        await this.menuRepository.save(reqAddMenuDto);
    }
    async list(reqMenuListDto) {
        const where = {};
        if (reqMenuListDto.menuName) {
            where.menuName = (0, typeorm_2.Like)(`%${reqMenuListDto.menuName}%`);
        }
        if (reqMenuListDto.status) {
            where.status = reqMenuListDto.status;
        }
        return await this.menuRepository
            .createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.createTime', 'createTime')
            .addSelect('menu.menuName', 'menuName')
            .addSelect('menu.orderNum', 'orderNum')
            .addSelect('menu.status', 'status')
            .addSelect('menu.perms', 'perms')
            .addSelect('menu.icon', 'icon')
            .addSelect('menu.component', 'component')
            .addSelect('menu.menuType', 'menuType')
            .addSelect('ifnull(menu.parentMenuId,0)', 'parentId')
            .where(where)
            .orderBy('menu.orderNum', 'ASC')
            .addOrderBy('menu.createTime', 'ASC')
            .getRawMany();
    }
    async findById(menuId) {
        return this.menuRepository.findOneBy({ menuId });
    }
    async findRawById(menuId) {
        return await this.menuRepository
            .createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.createTime', 'createTime')
            .addSelect('menu.menuName', 'menuName')
            .addSelect('menu.orderNum', 'orderNum')
            .addSelect('menu.status', 'status')
            .addSelect('menu.perms', 'perms')
            .addSelect('menu.icon', 'icon')
            .addSelect('menu.component', 'component')
            .addSelect('menu.menuType', 'menuType')
            .addSelect('menu.isFrame', 'isFrame')
            .addSelect('menu.isCache', 'isCache')
            .addSelect('menu.visible', 'visible')
            .addSelect('menu.path', 'path')
            .addSelect('menu.query', 'query')
            .addSelect('ifnull(menu.parentMenuId,0)', 'parentId')
            .andWhere('menu.menuId = :menuId', { menuId })
            .getRawOne();
    }
    async outList(menuId) {
        return this.menuRepository
            .createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.createTime', 'createTime')
            .addSelect('menu.menuName', 'menuName')
            .addSelect('menu.orderNum', 'orderNum')
            .addSelect('menu.status', 'status')
            .addSelect('menu.perms', 'perms')
            .addSelect('menu.icon', 'icon')
            .addSelect('menu.component', 'component')
            .addSelect('menu.menuType', 'menuType')
            .addSelect('ifnull(menu.parentMenuId,0)', 'parentId')
            .andWhere("concat('.',menu.mpath) not like :v", {
            v: '%.' + menuId + '.%',
        })
            .getRawMany();
    }
    async findChildsByParentId(parentId) {
        return this.menuRepository
            .createQueryBuilder('menu')
            .where('menu.parentmenuId = :parentId', { parentId })
            .getMany();
    }
    async delete(menuId) {
        const menu = await this.menuRepository.findOneBy({ menuId });
        if (!menu)
            return;
        menu.roles = [];
        await this.menuRepository.save(menu);
        return this.menuRepository.delete(menuId);
    }
    async listByIdArr(menuIdArr) {
        return this.menuRepository.find({
            where: {
                menuId: (0, typeorm_2.In)(menuIdArr),
            },
        });
    }
    async treeselect() {
        const menuArr = await this.menuRepository
            .createQueryBuilder('menu')
            .select('menu.menuId', 'id')
            .addSelect('menu.menuName', 'label')
            .addSelect('menu.parentmenuId', 'parentId')
            .getRawMany();
        return this.sharedService.handleTree(menuArr);
    }
    async getCheckedKeys(roleId) {
        let menuArr = await this.menuRepository
            .createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.mpath', 'mpath')
            .innerJoin('menu.roles', 'role', 'role.roleId = :roleId', { roleId })
            .where('role.delFlag = 0')
            .getRawMany();
        const { menuCheckStrictly } = await this.roleService.findById(roleId);
        if (menuCheckStrictly) {
            menuArr = menuArr.filter((menu) => !menuArr.find((menuSub) => menu.menuId !== menuSub.menuId &&
                ('.' + menuSub.mpath).includes('.' + menu.menuId + '.')));
        }
        return menuArr.map((menu) => menu.menuId);
    }
    async getAllPermissionsByRoles(roleIdArr) {
        const menuList = await this.menuRepository
            .createQueryBuilder('menu')
            .select('menu.perms')
            .innerJoin('menu.roles', 'role', 'role.delFlag = 0')
            .where('menu.perms is not null')
            .andWhere((qb) => {
            const subQuery = qb
                .subQuery()
                .select('menu2.menu_id')
                .from(menu_entity_1.Menu, 'menu2')
                .where('menu2.status=1')
                .andWhere("concat('.',menu.mpath) like concat('%.',menu2.menu_id,'.%')")
                .getQuery();
            return 'not exists' + subQuery;
        })
            .andWhere('role.status = 0 and role.roleId IN (:...roleIdArr)', {
            roleIdArr,
        })
            .getMany();
        return menuList.map((item) => item.perms);
    }
    async getMenuList(isAdmin, roleIdArr) {
        const queryBuilder = this.menuRepository
            .createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.createTime', 'createTime')
            .addSelect('menu.menuName', 'menuName')
            .addSelect('menu.orderNum', 'orderNum')
            .addSelect('menu.status', 'status')
            .addSelect('menu.perms', 'perms')
            .addSelect('menu.icon', 'icon')
            .addSelect('menu.component', 'component')
            .addSelect('menu.menuType', 'menuType')
            .addSelect('menu.isFrame', 'isFrame')
            .addSelect('menu.isCache', 'isCache')
            .addSelect('menu.visible', 'visible')
            .addSelect('menu.path', 'path')
            .addSelect('menu.query', 'query')
            .addSelect('ifnull(menu.parentMenuId,0)', 'parentId')
            .andWhere("menu.menuType in ('M','C')")
            .andWhere((qb) => {
            const subQuery = qb
                .subQuery()
                .select('menu2.menu_id')
                .from(menu_entity_1.Menu, 'menu2')
                .where('menu2.status=1')
                .andWhere("concat('.',menu.mpath) like concat('%.',menu2.menu_id,'.%')")
                .getQuery();
            return 'not exists' + subQuery;
        });
        if (!isAdmin && roleIdArr) {
            queryBuilder
                .innerJoin('menu.roles', 'role', 'role.delFlag = 0')
                .andWhere('role.status = 0 and role.roleId IN (:...roleIdArr)', {
                roleIdArr,
            });
        }
        const menuList = await queryBuilder
            .groupBy('menu.menuId')
            .orderBy('menu.orderNum')
            .getRawMany();
        const menuTreeList = [];
        this.sharedService.handleTree(menuList, 'menuId').forEach((item) => {
            if (item.parentId == 0) {
                if (item.menuType == 'C') {
                    const obj = {
                        component: 'Layout',
                        hidden: false,
                        path: '/',
                        visible: '0',
                        children: [JSON.parse(JSON.stringify(item))],
                    };
                    menuTreeList.push(obj);
                }
                else {
                    item.path = '/' + item.path;
                    menuTreeList.push(item);
                }
            }
        });
        return this.createRouterTree(menuTreeList);
    }
    createRouterTree(menuArr) {
        const routerList = [];
        menuArr.forEach((item) => {
            const router = new res_menu_dto_1.Router();
            if (this.firstToUpper(item.path)) {
                router.name = this.firstToUpper(item.path);
            }
            router.hidden = item.visible == '0' ? false : true;
            if (item.menuType == 'M' && item.isFrame == 1) {
                router.redirect = 'noRedirect';
            }
            if (item.menuType == 'M') {
                if (item.path.includes('/')) {
                    router.component = 'Layout';
                }
                else {
                    router.component = 'ParentView';
                }
            }
            else {
                router.component = item.component;
            }
            if (item.menuType == 'M') {
                router.alwaysShow = true;
            }
            router.path = item.path;
            router.meta = {
                title: item.menuName,
                icon: item.icon,
                noCache: item.isCache == 0 ? false : true,
                link: item.isFrame == 0 ? item.component : null,
            };
            if (item.children && item.children.length) {
                router.children = this.createRouterTree(item.children);
            }
            routerList.push(router);
        });
        return routerList;
    }
    firstToUpper(pathStr) {
        const str = pathStr.replace('/', '').trim();
        if (str) {
            return str.toLowerCase().replace(str[0], str[0].toUpperCase());
        }
        return '';
    }
};
MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => role_service_1.RoleService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        shared_service_1.SharedService,
        role_service_1.RoleService])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map