"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResRoleDeptTreeselectDto = void 0;
const openapi = require("@nestjs/swagger");
class ResRoleDeptTreeselectDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { checkedKeys: { required: true, type: () => [Number], description: "\u9009\u4E2D\u7684\u83DC\u5355id\u6570\u7EC4" }, depts: { required: true, type: () => [require("../../../../common/dto/tree-data.dto").TreeDataDto], description: "\u83DC\u5355\u5217\u8868" } };
    }
}
exports.ResRoleDeptTreeselectDto = ResRoleDeptTreeselectDto;
//# sourceMappingURL=res-dept.dto.js.map