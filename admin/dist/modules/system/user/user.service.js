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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const redis_contant_1 = require("../../../common/contants/redis.contant");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const shared_service_1 = require("../../../shared/shared.service");
const typeorm_2 = require("typeorm");
const dept_service_1 = require("../dept/dept.service");
const post_service_1 = require("../post/post.service");
const req_role_dto_1 = require("../role/dto/req-role.dto");
const role_service_1 = require("../role/role.service");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository, roleService, postService, deptService, sharedService, redis) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.postService = postService;
        this.deptService = deptService;
        this.sharedService = sharedService;
        this.redis = redis;
    }
    async findOneByUsername(username) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select('user.userId')
            .addSelect('user.userName')
            .addSelect('user.password')
            .addSelect('user.salt')
            .addSelect('user.dept')
            .leftJoinAndSelect('user.dept', 'dept')
            .where({
            userName: username,
            delFlag: '0',
            status: '0',
        })
            .getOne();
        return user;
    }
    async findOneByUserNameState(username) {
        return await this.userRepository.findOne({
            select: ['userId', 'userName', 'password', 'salt', 'status', 'delFlag'],
            where: {
                userName: username,
                delFlag: '0',
            },
        });
    }
    async list(reqUserListDto, roleId, reverse, sataScopeSql) {
        var _a;
        const where = { delFlag: '0' };
        if (reqUserListDto.userName) {
            where.userName = (0, typeorm_2.Like)(`%${reqUserListDto.userName}%`);
        }
        if (reqUserListDto.phonenumber) {
            where.phonenumber = (0, typeorm_2.Like)(`%${reqUserListDto.phonenumber}%`);
        }
        if (reqUserListDto.status) {
            where.status = reqUserListDto.status;
        }
        if (reqUserListDto.params) {
            where.createTime = (0, typeorm_2.Between)(reqUserListDto.params.beginTime, moment(reqUserListDto.params.endTime).add(1, 'day').format());
        }
        const deptId = (_a = reqUserListDto.deptId) !== null && _a !== void 0 ? _a : '';
        const queryBuilde = this.userRepository
            .createQueryBuilder('user')
            .innerJoin(user_entity_1.User, 'user2', 'user.createBy = user2.userName');
        if (deptId) {
            queryBuilde.innerJoinAndSelect('user.dept', 'dept', "concat('.',dept.mpath) like :v", { v: '%.' + deptId + '.%' });
        }
        else {
            queryBuilde.leftJoinAndSelect('user.dept', 'dept');
        }
        if (roleId && !reverse) {
            queryBuilde
                .innerJoin('user.roles', 'role', 'role.roleId = :roleId', { roleId })
                .andWhere('role.delFlag = 0');
        }
        if (roleId && reverse) {
            queryBuilde.andWhere((qb) => {
                const subQuery = qb
                    .subQuery()
                    .select('user.userId')
                    .from(user_entity_1.User, 'user')
                    .leftJoin('user.roles', 'role')
                    .where('role.roleId = :roleId', { roleId })
                    .getQuery();
                return 'user.userId not in ' + subQuery;
            });
        }
        if (sataScopeSql) {
            queryBuilde.andWhere(sataScopeSql);
        }
        const result = await queryBuilde
            .andWhere(where)
            .orderBy('user.createTime', 'ASC')
            .getManyAndCount();
        return {
            rows: result[0],
            total: result[1],
        };
    }
    async userAllInfo(userId) {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.dept', 'dept', 'dept.delFlag = 0')
            .leftJoinAndSelect('user.posts', 'post')
            .leftJoinAndSelect('user.roles', 'role', 'role.delFlag = 0')
            .where('user.userId = :userId', { userId })
            .getOne();
    }
    async findOneUserAllById(userId) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.dept', 'dept', 'dept.delFlag = 0 and dept.status = 0')
            .leftJoinAndSelect('user.posts', 'post', 'dept.status = 0')
            .leftJoinAndSelect('user.roles', 'role', 'role.delFlag = 0 and role.status = 0')
            .where({
            userId,
            delFlag: '0',
            status: '0',
        })
            .getOne();
        return user;
    }
    async addUser(reqAddUserDto) {
        const dept = await this.deptService.findById(reqAddUserDto.deptId);
        const posts = await this.postService.listByIdArr(reqAddUserDto.postIds);
        const roles = await this.roleService.listByIdArr(reqAddUserDto.roleIds);
        reqAddUserDto.dept = dept;
        reqAddUserDto.posts = posts;
        reqAddUserDto.roles = roles;
        if (reqAddUserDto.password) {
            reqAddUserDto.salt = this.sharedService.generateUUID();
            reqAddUserDto.password = this.sharedService.md5(reqAddUserDto.password + reqAddUserDto.salt);
        }
        await this.userRepository.save(reqAddUserDto);
    }
    async updateUser(reqUpdateUserDto) {
        const dept = await this.deptService.findById(reqUpdateUserDto.deptId);
        const posts = await this.postService.listByIdArr(reqUpdateUserDto.postIds);
        const roles = await this.roleService.listByIdArr(reqUpdateUserDto.roleIds);
        reqUpdateUserDto.dept = dept;
        reqUpdateUserDto.posts = posts;
        reqUpdateUserDto.roles = roles;
        await this.userRepository.save(reqUpdateUserDto);
        if (await this.redis.get(`${redis_contant_1.USER_VERSION_KEY}:${reqUpdateUserDto.userId}`)) {
            await this.redis.set(`${redis_contant_1.USER_VERSION_KEY}:${reqUpdateUserDto.userId}`, 2);
        }
    }
    async delete(userIdArr, userName) {
        return await this.userRepository
            .createQueryBuilder()
            .update()
            .set({
            updateBy: userName,
            delFlag: '2',
        })
            .where({
            userId: (0, typeorm_2.In)(userIdArr),
        })
            .execute();
    }
    async findById(userId) {
        return await this.userRepository.findOneBy({ userId });
    }
    async resetPwd(userId, password, updateBy) {
        const user = await this.findById(userId);
        user.updateBy = updateBy;
        user.salt = this.sharedService.generateUUID();
        user.password = this.sharedService.md5(password + user.salt);
        await this.userRepository.save(user);
        if (await this.redis.get(`${redis_contant_1.USER_VERSION_KEY}:${userId}`)) {
            await this.redis.set(`${redis_contant_1.USER_VERSION_KEY}:${userId}`, 2);
        }
    }
    async authRole(userId) {
        const { rows } = await this.roleService.list(new req_role_dto_1.ReqRoleListDto());
        const user = await this.userAllInfo(userId);
        const roles = rows.map((item) => {
            if (user.roles.find((role) => role.roleId === item.roleId)) {
                item.flag = true;
            }
            else {
                item.flag = false;
            }
            return item;
        });
        roles.forEach((item) => {
            if (user.roles.find((role) => role.roleId === item.roleId)) {
                item.flag = true;
            }
        });
        return {
            roles,
            user,
        };
    }
    async updateAuthRole(userId, roleIdArr, updateBy) {
        const user = await this.findById(userId);
        const roles = await this.roleService.listByIdArr(roleIdArr);
        user.updateBy = updateBy;
        user.roles = roles;
        return await this.userRepository.save(user);
    }
    async changeStatus(userId, status, updateBy) {
        return await this.userRepository
            .createQueryBuilder()
            .update()
            .set({ status, updateBy })
            .where({ userId })
            .execute();
    }
    async updataProfile(reqUpdataSelfDto, userId) {
        return await this.userRepository
            .createQueryBuilder()
            .update()
            .set(reqUpdataSelfDto)
            .where({ userId })
            .execute();
    }
    async updateSelfPwd(reqUpdateSelfPwd, userName) {
        const user = await this.findOneByUsername(userName);
        const password = this.sharedService.md5(reqUpdateSelfPwd.oldPassword + user.salt);
        if (password !== user.password)
            throw new api_exception_1.ApiException('旧密码错误');
        user.password = this.sharedService.md5(reqUpdateSelfPwd.newPassword + user.salt);
        await this.userRepository.save(user);
        if (await this.redis.get(`${redis_contant_1.USER_VERSION_KEY}:${user.userId}`)) {
            await this.redis.set(`${redis_contant_1.USER_VERSION_KEY}:${user.userId}`, 2);
        }
    }
    async insert(data, userName) {
        var e_1, _a;
        const userArr = [];
        try {
            for (var data_1 = __asyncValues(data), data_1_1; data_1_1 = await data_1.next(), !data_1_1.done;) {
                const iterator = data_1_1.value;
                let user = new user_entity_1.User();
                if (!iterator.userName || !iterator.password || !iterator.nickName)
                    throw new api_exception_1.ApiException('用户账号、用户昵称、用户密码不能为空');
                const one = await this.findOneByUsername(iterator.userName);
                if (one)
                    throw new api_exception_1.ApiException('用户账号已存在，请检查');
                iterator.salt = await this.sharedService.generateUUID();
                iterator.password = this.sharedService.md5(iterator.password + iterator.salt);
                iterator.createBy = iterator.updateBy = userName;
                const dept = await this.deptService.findById(1);
                iterator.dept = dept;
                user = Object.assign(user, iterator);
                userArr.push(user);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) await _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        await this.userRepository
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.User)
            .values(userArr)
            .execute();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => role_service_1.RoleService))),
    __param(5, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        role_service_1.RoleService,
        post_service_1.PostService,
        dept_service_1.DeptService,
        shared_service_1.SharedService, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map