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
exports.ReponseTransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const operators_1 = require("rxjs/operators");
const ajax_result_class_1 = require("../class/ajax-result.class");
const decorator_contant_1 = require("../contants/decorator.contant");
let ReponseTransformInterceptor = class ReponseTransformInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            const keep = this.reflector.getAllAndOverride(decorator_contant_1.KEEP_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (keep)
                return data;
            const response = context.switchToHttp().getResponse();
            response.header('Content-Type', 'application/json; charset=utf-8');
            return ajax_result_class_1.AjaxResult.success(data);
        }));
    }
};
ReponseTransformInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ReponseTransformInterceptor);
exports.ReponseTransformInterceptor = ReponseTransformInterceptor;
//# sourceMappingURL=reponse-transform.interceptor.js.map