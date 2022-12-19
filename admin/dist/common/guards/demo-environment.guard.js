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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoEnvironmentGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const api_exception_1 = require("../exceptions/api.exception");
let DemoEnvironmentGuard = class DemoEnvironmentGuard {
    constructor(configService) {
        this.configService = configService;
    }
    async canActivate(context) {
        const isDemoEnvironment = this.configService.get('isDemoEnvironment');
        if (!isDemoEnvironment)
            return true;
        const request = context.switchToHttp().getRequest();
        const allowUrlArr = ['/login', '/logout'];
        if (request.method.toLocaleLowerCase() != 'get' &&
            !allowUrlArr.includes(request.url))
            throw new api_exception_1.ApiException('演示环境,不允许操作');
        return true;
    }
};
DemoEnvironmentGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DemoEnvironmentGuard);
exports.DemoEnvironmentGuard = DemoEnvironmentGuard;
//# sourceMappingURL=demo-environment.guard.js.map