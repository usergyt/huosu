"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResOnlineDto = void 0;
const openapi = require("@nestjs/swagger");
class ResOnlineDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { tokenId: { required: true, type: () => String, description: "\u56DE\u8BDD\u7F16\u53F7" }, userName: { required: true, type: () => String, description: "\u7528\u6237\u540D" }, browser: { required: true, type: () => String, description: "\u6D4F\u89C8\u5668" }, deptName: { required: true, type: () => String, description: "\u90E8\u95E8\u540D\u79F0" }, ipaddr: { required: true, type: () => String, description: "\u4E3B\u673A" }, loginLocation: { required: true, type: () => String, description: "\u767B\u5F55\u5730\u70B9" }, loginTime: { required: true, type: () => String, description: "\u767B\u5F55\u65F6\u95F4" }, os: { required: true, type: () => String, description: "\u64CD\u4F5C\u7CFB\u7EDF" } };
    }
}
exports.ResOnlineDto = ResOnlineDto;
//# sourceMappingURL=res-log.dto.js.map