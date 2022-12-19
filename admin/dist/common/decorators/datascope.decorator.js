"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataScope = exports.DeptOrUserAlias = void 0;
const common_1 = require("@nestjs/common");
const decorator_contant_1 = require("../contants/decorator.contant");
class DeptOrUserAlias {
    constructor() {
        this.deptAlias = 'dept';
        this.userAlias = 'user';
    }
}
exports.DeptOrUserAlias = DeptOrUserAlias;
const DataScope = (deptOrUserAlias) => {
    const aliaObj = Object.assign(new DeptOrUserAlias(), deptOrUserAlias);
    return (0, common_1.SetMetadata)(decorator_contant_1.DATASCOPE_KEY_METADATA, aliaObj);
};
exports.DataScope = DataScope;
//# sourceMappingURL=datascope.decorator.js.map