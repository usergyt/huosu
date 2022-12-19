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
exports.DataScopeInterceptor = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const decorator_contant_1 = require("../contants/decorator.contant");
const redis_contant_1 = require("../contants/redis.contant");
let DataScopeInterceptor = class DataScopeInterceptor {
    constructor(reflector, redis) {
        this.reflector = reflector;
        this.redis = redis;
    }
    intercept(context, next) {
        const aliaObj = this.reflector.get(decorator_contant_1.DATASCOPE_KEY_METADATA, context.getHandler());
        if (aliaObj) {
            const request = context.switchToHttp().getRequest();
            return (0, rxjs_1.concat)(this.setDataScope(request, aliaObj), next.handle());
        }
        else {
            return next.handle();
        }
    }
    async setDataScope(request, aliaObj) {
        const { userId } = request.user;
        let sqlString = '';
        const roleArr = JSON.parse(await this.redis.get(`${redis_contant_1.USER_ROLEKS_KEY}:${userId}`));
        if (!roleArr.map((role) => role.roleKey).includes('admin')) {
            const userDeptId = await this.redis.get(`${redis_contant_1.USER_DEPTID_KEY}:${userId}`);
            const deptId = userDeptId ? userDeptId : null;
            roleArr.forEach((role) => {
                const dataScope = role.dataScope;
                if (dataScope == '1') {
                    sqlString = '';
                }
                else if (dataScope == '2') {
                    sqlString += ` OR ${aliaObj.deptAlias}.dept_id IN ( SELECT deptDeptId FROM role_depts_dept WHERE roleRoleId = ${role.roleId} )`;
                }
                else if (dataScope == '3') {
                    sqlString += ` OR ${aliaObj.deptAlias}.dept_id = ${deptId}`;
                }
                else if (dataScope == '4') {
                    sqlString += ` OR ${aliaObj.deptAlias}.dept_id IN ( SELECT dept_id FROM dept WHERE concat('.',mpath) like '%.${deptId}.%')`;
                }
                else if (dataScope == '5') {
                    sqlString += ` OR ${aliaObj.userAlias}.user_id = ${userId}`;
                }
            });
        }
        if (sqlString) {
            request.dataScope = '(' + sqlString.substring(4) + ')';
        }
    }
};
DataScopeInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [core_1.Reflector, Object])
], DataScopeInterceptor);
exports.DataScopeInterceptor = DataScopeInterceptor;
//# sourceMappingURL=data-scope.interceptor.js.map