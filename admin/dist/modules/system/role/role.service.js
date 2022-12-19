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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const dept_service_1 = require("../dept/dept.service");
const menu_service_1 = require("../menu/menu.service");
const req_user_dto_1 = require("../user/dto/req-user.dto");
const user_service_1 = require("../user/user.service");
const role_entity_1 = require("./entities/role.entity");
let RoleService = class RoleService {
    constructor(roleRepository, menuService, deptService, userService) {
        this.roleRepository = roleRepository;
        this.menuService = menuService;
        this.deptService = deptService;
        this.userService = userService;
    }
    async addOrUpdate(reqAddRoleDto) {
        const menuArr = await this.menuService.listByIdArr(reqAddRoleDto.menuIds);
        reqAddRoleDto.menus = menuArr;
        await this.roleRepository.save(reqAddRoleDto);
    }
    async list(reqRoleListDto) {
        const where = {
            delFlag: '0',
        };
        if (reqRoleListDto.roleName) {
            where.roleName = (0, typeorm_2.Like)(`%${reqRoleListDto.roleName}%`);
        }
        if (reqRoleListDto.roleKey) {
            where.roleKey = (0, typeorm_2.Like)(`%${reqRoleListDto.roleKey}%`);
        }
        if (reqRoleListDto.status) {
            where.status = reqRoleListDto.status;
        }
        if (reqRoleListDto.params) {
            where.createTime = (0, typeorm_2.Between)(reqRoleListDto.params.beginTime, moment(reqRoleListDto.params.endTime).add(1, 'day').format());
        }
        const result = await this.roleRepository.findAndCount({
            select: [
                'roleId',
                'roleName',
                'roleKey',
                'createTime',
                'status',
                'roleSort',
                'createBy',
                'remark',
            ],
            where,
            order: {
                roleSort: 1,
                createTime: 1,
            },
            skip: reqRoleListDto.skip,
            take: reqRoleListDto.take,
        });
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async findById(roleId) {
        return this.roleRepository.findOneBy({ roleId });
    }
    async delete(roleIdArr, userName) {
        return await this.roleRepository
            .createQueryBuilder()
            .update()
            .set({ delFlag: '2', updateBy: userName })
            .where('roleId in (:...roleIdArr) ', { roleIdArr })
            .execute();
    }
    async updateDataScope(reqDataScopeDto) {
        let deptArr = [];
        if (reqDataScopeDto.deptCheckStrictly) {
            deptArr = await this.deptService.listByIdArrFilter(reqDataScopeDto.deptIds);
        }
        else {
            deptArr = await this.deptService.listByIdArr(reqDataScopeDto.deptIds);
        }
        reqDataScopeDto.depts = deptArr;
        return await this.roleRepository.save(reqDataScopeDto);
    }
    listByIdArr(idArr) {
        return this.roleRepository.find({
            where: {
                delFlag: '0',
                roleId: (0, typeorm_2.In)(idArr),
            },
        });
    }
    async changeStatus(roleId, status, updateBy) {
        return await this.roleRepository
            .createQueryBuilder()
            .update()
            .set({ status, updateBy })
            .where({ roleId })
            .execute();
    }
    async allocatedListByRoleId(reqAllocatedListDto, reverse) {
        let getUserDto = new req_user_dto_1.ReqUserListDto();
        getUserDto = Object.assign(getUserDto, reqAllocatedListDto);
        return this.userService.list(getUserDto, reqAllocatedListDto.roleId, reverse);
    }
    async cancel(roleId, userIdArr) {
        return await this.roleRepository
            .createQueryBuilder('role')
            .relation('users')
            .of(roleId)
            .remove(userIdArr);
    }
    async selectAll(roleId, userIdArr) {
        return await this.roleRepository
            .createQueryBuilder('role')
            .relation('users')
            .of(roleId)
            .add(userIdArr);
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => menu_service_1.MenuService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => dept_service_1.DeptService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        menu_service_1.MenuService,
        dept_service_1.DeptService,
        user_service_1.UserService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map