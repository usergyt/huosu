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
exports.DeptService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_service_1 = require("../../../shared/shared.service");
const typeorm_2 = require("typeorm");
const role_service_1 = require("../role/role.service");
const dept_entity_1 = require("./entities/dept.entity");
let DeptService = class DeptService {
    constructor(deptRepository, roleService, sharedService) {
        this.deptRepository = deptRepository;
        this.roleService = roleService;
        this.sharedService = sharedService;
    }
    async addOrUpdate(reqAddDeptDto) {
        if (reqAddDeptDto.parentId) {
            const parentDept = await this.findById(reqAddDeptDto.parentId);
            reqAddDeptDto.parent = parentDept;
        }
        await this.deptRepository.save(reqAddDeptDto);
    }
    async list(reqDeptListDto) {
        const where = { delFlag: '0' };
        if (reqDeptListDto.deptName) {
            where.deptName = (0, typeorm_2.Like)(`%${reqDeptListDto.deptName}%`);
        }
        if (reqDeptListDto.status) {
            where.status = reqDeptListDto.status;
        }
        return this.deptRepository
            .createQueryBuilder('dept')
            .select('dept.deptId', 'deptId')
            .addSelect('dept.createTime', 'createTime')
            .addSelect('dept.deptName', 'deptName')
            .addSelect('dept.orderNum', 'orderNum')
            .addSelect('dept.status', 'status')
            .addSelect('ifnull(dept.parentDeptId,0)', 'parentId')
            .where(where)
            .orderBy('dept.orderNum', 'ASC')
            .addOrderBy('dept.createTime', 'ASC')
            .getRawMany();
    }
    async findById(deptId) {
        return this.deptRepository.findOneBy({ deptId });
    }
    async findRawById(deptId) {
        return await this.deptRepository
            .createQueryBuilder('dept')
            .select('dept.deptId', 'deptId')
            .addSelect('dept.createTime', 'createTime')
            .addSelect('dept.deptName', 'deptName')
            .addSelect('dept.orderNum', 'orderNum')
            .addSelect('dept.status', 'status')
            .addSelect('dept.leader', 'leader')
            .addSelect('dept.phone', 'phone')
            .addSelect('dept.email', 'email')
            .addSelect('ifnull(dept.parentDeptId,0)', 'parentId')
            .where('dept.delFlag = 0')
            .andWhere('dept.deptId = :deptId', { deptId })
            .getRawOne();
    }
    async outList(deptId) {
        return await this.deptRepository
            .createQueryBuilder('dept')
            .select('dept.deptId', 'deptId')
            .addSelect('dept.createTime', 'createTime')
            .addSelect('dept.deptName', 'deptName')
            .addSelect('dept.orderNum', 'orderNum')
            .addSelect('dept.status', 'status')
            .addSelect('ifnull(dept.parentDeptId,0)', 'parentId')
            .where('dept.delFlag = 0')
            .andWhere("concat('.',dept.mpath) not like :v", {
            v: '%.' + deptId + '.%',
        })
            .getRawMany();
    }
    async findChildsByParentId(parentId) {
        return this.deptRepository
            .createQueryBuilder('dept')
            .where('dept.delFlag = 0')
            .andWhere('dept.parentDeptId = :parentId', { parentId })
            .getMany();
    }
    async delete(deptId, userName) {
        return this.deptRepository
            .createQueryBuilder()
            .update()
            .set({ delFlag: '2', updateBy: userName })
            .where({
            deptId,
        })
            .execute();
    }
    async treeselect() {
        const deptArr = await this.deptRepository
            .createQueryBuilder('dept')
            .select('dept.deptId', 'id')
            .addSelect('dept.deptName', 'label')
            .addSelect('dept.parentDeptId', 'parentId')
            .where('dept.delFlag = 0')
            .getRawMany();
        return this.sharedService.handleTree(deptArr);
    }
    async getCheckedKeys(roleId) {
        const deptArr = await this.deptRepository
            .createQueryBuilder('dept')
            .select('dept.deptId', 'deptId')
            .addSelect('dept.mpath', 'mpath')
            .innerJoin('dept.roles', 'role', 'role.roleId = :roleId', { roleId })
            .where('dept.delFlag = 0')
            .andWhere('role.delFlag = 0')
            .getRawMany();
        return deptArr.map((dept) => dept.deptId);
    }
    async listByIdArr(deptIdArr) {
        return this.deptRepository.find({
            where: {
                deptId: (0, typeorm_2.In)(deptIdArr),
                delFlag: '0',
            },
        });
    }
    async listByIdArrFilter(deptIdArr) {
        const queryBuilder = this.deptRepository.createQueryBuilder('dept');
        queryBuilder
            .select('dept.deptId', 'deptId')
            .addSelect('dept.mpath')
            .where('dept.delFlag = 0')
            .andWhere({
            deptId: (0, typeorm_2.In)(deptIdArr),
        })
            .andWhere((qb) => {
            const subQuery = qb
                .subQuery()
                .select('dept2.deptId')
                .from(dept_entity_1.Dept, 'dept2')
                .where('dept2.delFlag = 0')
                .andWhere('dept.deptId != dept2.deptId')
                .andWhere({
                deptId: (0, typeorm_2.In)(deptIdArr),
            })
                .andWhere("concat('.',dept2.mpath) like concat('%.',dept.dept_id,'.%')")
                .getQuery();
            return 'not exists' + subQuery;
        });
        const DeptArr = await queryBuilder.getRawMany();
        return DeptArr;
    }
};
DeptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dept_entity_1.Dept)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => role_service_1.RoleService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        role_service_1.RoleService,
        shared_service_1.SharedService])
], DeptService);
exports.DeptService = DeptService;
//# sourceMappingURL=dept.service.js.map