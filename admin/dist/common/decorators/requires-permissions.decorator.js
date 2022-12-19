"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiresPermissions = void 0;
const common_1 = require("@nestjs/common");
const decorator_contant_1 = require("../contants/decorator.contant");
const logical_enum_1 = require("../enums/logical.enum");
const RequiresPermissions = (permissions, logical = logical_enum_1.LogicalEnum.or) => {
    let permissionObj = {
        permissionArr: [],
        logical,
    };
    if (typeof permissions === 'string') {
        permissionObj = {
            permissionArr: [permissions],
            logical,
        };
    }
    else if (permissions instanceof Array) {
        permissionObj = {
            permissionArr: permissions,
            logical,
        };
    }
    return (0, common_1.SetMetadata)(decorator_contant_1.PERMISSION_KEY_METADATA, permissionObj);
};
exports.RequiresPermissions = RequiresPermissions;
//# sourceMappingURL=requires-permissions.decorator.js.map