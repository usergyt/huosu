"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysGoodsModule = void 0;
const sys_goods_service_1 = require("./sys-goods.service");
const sys_goods_controller_1 = require("./sys-goods.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sys_goods_entity_1 = require("./entities/sys-goods.entity");
let SysGoodsModule = class SysGoodsModule {
};
SysGoodsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sys_goods_entity_1.GoodsCopy])],
        controllers: [sys_goods_controller_1.SysGoodsController],
        providers: [sys_goods_service_1.SysGoodsService],
    })
], SysGoodsModule);
exports.SysGoodsModule = SysGoodsModule;
//# sourceMappingURL=sys-goods.module.js.map