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
exports.DictController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const data_obj_class_1 = require("../../../common/class/data-obj.class");
const api_data_response_decorator_1 = require("../../../common/decorators/api-data-response.decorator");
const api_paginated_response_decorator_1 = require("../../../common/decorators/api-paginated-response.decorator");
const keep_decorator_1 = require("../../../common/decorators/keep.decorator");
const repeat_submit_decorator_1 = require("../../../common/decorators/repeat-submit.decorator");
const requires_permissions_decorator_1 = require("../../../common/decorators/requires-permissions.decorator");
const user_decorator_1 = require("../../../common/decorators/user.decorator");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const pagination_pipe_1 = require("../../../common/pipes/pagination.pipe");
const user_info_pipe_1 = require("../../../common/pipes/user-info.pipe");
const excel_service_1 = require("../../common/excel/excel.service");
const dict_service_1 = require("./dict.service");
const req_dict_dto_1 = require("./dto/req-dict.dto");
const dict_data_entity_1 = require("./entities/dict_data.entity");
const dict_type_entity_1 = require("./entities/dict_type.entity");
let DictController = class DictController {
    constructor(dictService, excelService) {
        this.dictService = dictService;
        this.excelService = excelService;
    }
    async addType(reqAddDictTypeDto, userName) {
        reqAddDictTypeDto.createBy = reqAddDictTypeDto.updateBy = userName;
        await this.dictService.addOrUpdateType(reqAddDictTypeDto);
    }
    async typeList(reqDictTypeListDto) {
        return this.dictService.typeList(reqDictTypeListDto);
    }
    async refreshCache() {
        await this.dictService.refreshCache();
    }
    async deleteDictType(typeIds) {
        await this.dictService.deleteByDictIdArr(typeIds.split(','));
    }
    async oneDictType(typeId) {
        const dictType = await this.dictService.findDictTypeById(typeId);
        return data_obj_class_1.DataObj.create(dictType);
    }
    async updateDictType(dictType, userName) {
        dictType.updateBy = userName;
        await this.dictService.addOrUpdateType(dictType);
    }
    async dictDataByDictType(dictType) {
        const dictDataArr = await this.dictService.getDictDataByDictType(dictType);
        return data_obj_class_1.DataObj.create(dictDataArr);
    }
    async dictDataList(reqDictDataListDto) {
        return await this.dictService.dictDataList(reqDictDataListDto);
    }
    async addDictData(reqAddDictDataDto, userName) {
        const dictData = await this.dictService.getDictDataByTypeOrValue(reqAddDictDataDto.dictType, reqAddDictDataDto.dictValue);
        if (dictData)
            throw new api_exception_1.ApiException('该数据键值已存在，请更换');
        reqAddDictDataDto.createBy = reqAddDictDataDto.updateBy = userName;
        await this.dictService.addOrUpdateDictData(reqAddDictDataDto);
    }
    async oneDictData(dictCode) {
        const dictData = await this.dictService.findDictDataById(dictCode);
        return data_obj_class_1.DataObj.create(dictData);
    }
    async updateDictData(reqUpdateDictDataDto, userName) {
        reqUpdateDictDataDto.updateBy = userName;
        await this.dictService.addOrUpdateDictData(reqUpdateDictDataDto);
    }
    async deleteDictData(dictDatas) {
        await this.dictService.deleteDictDataByids(dictDatas.split(','));
    }
    async export(reqDictTypeListDto) {
        const { rows } = await this.dictService.typeList(reqDictTypeListDto);
        const file = await this.excelService.export(dict_type_entity_1.DictType, rows);
        return new common_1.StreamableFile(file);
    }
    async exportData(reqDictDataListDto) {
        const { rows } = await this.dictService.dictDataList(reqDictDataListDto);
        const file = await this.excelService.export(dict_data_entity_1.DictData, rows);
        return new common_1.StreamableFile(file);
    }
};
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u5B57\u5178\u7C7B\u578B" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('dict/type'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dict:add'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dict_dto_1.ReqAddDictTypeDto, String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "addType", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u5B57\u5178\u7C7B\u578B\u5217\u8868" }),
    (0, common_1.Get)('dict/type/list'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dict:query'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(dict_type_entity_1.DictType),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dict_dto_1.ReqDictTypeListDto]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "typeList", null);
__decorate([
    openapi.ApiOperation({ description: "\u5237\u65B0\u7F13\u5B58" }),
    (0, common_1.Delete)('dict/type/refreshCache'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DictController.prototype, "refreshCache", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u5B57\u5178\u7C7B\u578B" }),
    (0, common_1.Delete)('dict/type/:typeIds'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dict:remove'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('typeIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "deleteDictType", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7 id \u67E5\u8BE2\u5B57\u5178\u7C7B\u578B" }),
    (0, common_1.Get)('/dict/type/:typeId'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dict:query'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, dict_type_entity_1.DictType),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "oneDictType", null);
__decorate([
    openapi.ApiOperation({ description: "\u7F16\u8F91\u5B57\u5178\u7C7B\u578B" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('dict/type'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dict:edit'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_type_entity_1.DictType, String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "updateDictType", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7\u5B57\u5178\u7C7B\u578B\u67E5\u8BE2\u5B57\u5178\u6570\u636E" }),
    (0, common_1.Get)('dict/data/type/:dictType'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('dictType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "dictDataByDictType", null);
__decorate([
    openapi.ApiOperation({ description: "\u5206\u9875\u67E5\u8BE2\u5B57\u5178\u6570\u636E\u5217\u8868" }),
    (0, common_1.Get)('dict/data/list'),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(dict_data_entity_1.DictData),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dict_dto_1.ReqDictDataListDto]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "dictDataList", null);
__decorate([
    openapi.ApiOperation({ description: "\u65B0\u589E\u5B57\u5178\u6570\u636E" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('dict/data'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dict_dto_1.ReqAddDictDataDto, String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "addDictData", null);
__decorate([
    openapi.ApiOperation({ description: "\u901A\u8FC7dictCode\u83B7\u53D6\u5B57\u5178\u6570\u636E" }),
    (0, common_1.Get)('dict/data/:dictCode'),
    (0, api_data_response_decorator_1.ApiDataResponse)(api_data_response_decorator_1.typeEnum.object, req_dict_dto_1.ReqUpdateDictDataDto),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('dictCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "oneDictData", null);
__decorate([
    openapi.ApiOperation({ description: "\u7F16\u8F91\u5B57\u5178\u6570\u636E" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Put)('dict/data'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)(user_decorator_1.UserEnum.userName, user_info_pipe_1.UserInfoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dict_dto_1.ReqUpdateDictDataDto, String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "updateDictData", null);
__decorate([
    openapi.ApiOperation({ description: "\u5220\u9664\u5B57\u5178\u6570\u636E" }),
    (0, common_1.Delete)('dict/data/:dictDatas'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('dictDatas')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "deleteDictData", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA\u5B57\u5178" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('dict/type/export'),
    (0, requires_permissions_decorator_1.RequiresPermissions)('system:dict:export'),
    (0, keep_decorator_1.Keep)(),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(dict_type_entity_1.DictType),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dict_dto_1.ReqDictTypeListDto]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "export", null);
__decorate([
    openapi.ApiOperation({ description: "\u5BFC\u51FA\u5B57\u5178" }),
    (0, repeat_submit_decorator_1.RepeatSubmit)(),
    (0, common_1.Post)('dict/data/export'),
    (0, keep_decorator_1.Keep)(),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(dict_type_entity_1.DictType),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)(pagination_pipe_1.PaginationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dict_dto_1.ReqDictDataListDto]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "exportData", null);
DictController = __decorate([
    (0, swagger_1.ApiTags)('字典管理'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('system'),
    __metadata("design:paramtypes", [dict_service_1.DictService,
        excel_service_1.ExcelService])
], DictController);
exports.DictController = DictController;
//# sourceMappingURL=dict.controller.js.map