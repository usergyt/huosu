"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeDataDto = void 0;
const openapi = require("@nestjs/swagger");
class TreeDataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number, description: "id\u503C" }, label: { required: true, type: () => String, description: "\u540D\u79F0" }, children: { required: false, type: () => [require("./tree-data.dto").TreeDataDto], description: "\u5B50\u9879\u6570\u7EC4" } };
    }
}
exports.TreeDataDto = TreeDataDto;
//# sourceMappingURL=tree-data.dto.js.map