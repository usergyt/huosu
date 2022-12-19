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
exports.ServerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const data_obj_class_1 = require("../../../common/class/data-obj.class");
const server_service_1 = require("./server.service");
let ServerController = class ServerController {
    constructor(serverService) {
        this.serverService = serverService;
    }
    async data() {
        const cpu = this.serverService.getCpu();
        const mem = this.serverService.getMem();
        const sys = this.serverService.getSys();
        const sysFiles = this.serverService.getSysFiles();
        const promiseArr = await Promise.all([cpu, mem, sys, sysFiles]);
        const data = {
            cpu: promiseArr[0],
            mem: promiseArr[1],
            sys: promiseArr[2],
            sysFiles: promiseArr[3],
        };
        return data_obj_class_1.DataObj.create(data);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u83B7\u53D6\u76D1\u63A7\u6570\u636E" }),
    (0, common_1.Get)('server'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "data", null);
ServerController = __decorate([
    (0, swagger_1.ApiTags)('服务监控'),
    (0, common_1.Controller)('monitor'),
    __metadata("design:paramtypes", [server_service_1.ServerService])
], ServerController);
exports.ServerController = ServerController;
//# sourceMappingURL=server.controller.js.map