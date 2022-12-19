"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keep = void 0;
const common_1 = require("@nestjs/common");
const decorator_contant_1 = require("../contants/decorator.contant");
const Keep = () => (0, common_1.SetMetadata)(decorator_contant_1.KEEP_KEY, true);
exports.Keep = Keep;
//# sourceMappingURL=keep.decorator.js.map