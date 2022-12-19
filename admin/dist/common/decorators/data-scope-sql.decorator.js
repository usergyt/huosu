"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataScopeSql = void 0;
const common_1 = require("@nestjs/common");
exports.DataScopeSql = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.dataScope;
});
//# sourceMappingURL=data-scope-sql.decorator.js.map