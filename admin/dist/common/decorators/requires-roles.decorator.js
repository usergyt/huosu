"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiresRoles = void 0;
const common_1 = require("@nestjs/common");
const decorator_contant_1 = require("../contants/decorator.contant");
const logical_enum_1 = require("../enums/logical.enum");
const RequiresRoles = (roles, logical = logical_enum_1.LogicalEnum.or) => {
    let roleObj = {
        roleArr: [],
        logical,
    };
    if (typeof roles === 'string') {
        roleObj = {
            roleArr: [roles],
            logical,
        };
    }
    else if (roles instanceof Array) {
        roleObj = {
            roleArr: roles,
            logical,
        };
    }
    return (0, common_1.SetMetadata)(decorator_contant_1.ROLES_KEY_METADATA, roleObj);
};
exports.RequiresRoles = RequiresRoles;
//# sourceMappingURL=requires-roles.decorator.js.map