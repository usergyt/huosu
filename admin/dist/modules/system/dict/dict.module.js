"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictModule = void 0;
const dict_service_1 = require("./dict.service");
const dict_controller_1 = require("./dict.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dict_type_entity_1 = require("./entities/dict_type.entity");
const dict_data_entity_1 = require("./entities/dict_data.entity");
let DictModule = class DictModule {
};
DictModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([dict_type_entity_1.DictType, dict_data_entity_1.DictData])],
        controllers: [dict_controller_1.DictController],
        providers: [dict_service_1.DictService],
        exports: [dict_service_1.DictService],
    })
], DictModule);
exports.DictModule = DictModule;
//# sourceMappingURL=dict.module.js.map