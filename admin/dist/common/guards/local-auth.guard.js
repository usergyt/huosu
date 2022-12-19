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
exports.LocalAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const api_exception_1 = require("../exceptions/api.exception");
const log_service_1 = require("../../modules/monitor/log/log.service");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
    constructor(logService) {
        super();
        this.logService = logService;
    }
    canActivate(context) {
        this.context = context;
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            const request = this.context.switchToHttp().getRequest();
            request.user = user;
            this.logService.addLogininfor(request, err.response);
            throw err || new api_exception_1.ApiException(err);
        }
        return user;
    }
};
LocalAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;
//# sourceMappingURL=local-auth.guard.js.map