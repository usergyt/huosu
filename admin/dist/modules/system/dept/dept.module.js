"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeptModule = void 0;
const dept_controller_1 = require("./dept.controller");
const dept_service_1 = require("./dept.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dept_entity_1 = require("./entities/dept.entity");
const role_module_1 = require("../role/role.module");
let DeptModule = class DeptModule {
};
DeptModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([dept_entity_1.Dept]), (0, common_1.forwardRef)(() => role_module_1.RoleModule)],
        controllers: [dept_controller_1.DeptController],
        providers: [dept_service_1.DeptService],
        exports: [dept_service_1.DeptService],
    })
], DeptModule);
exports.DeptModule = DeptModule;
//# sourceMappingURL=dept.module.js.map