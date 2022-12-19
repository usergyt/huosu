"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDev = void 0;
const common_1 = require("@nestjs/common");
function isDev() {
    return process.env.NODE_ENV === 'development';
}
exports.isDev = isDev;
exports.default = () => {
    var _a;
    let envConfig = {};
    try {
        envConfig = require(`./config.${process.env.NODE_ENV}`).default;
        process.env.uploadPath = (_a = envConfig.uploadPath) !== null && _a !== void 0 ? _a : '/upload';
    }
    catch (e) {
        const logger = new common_1.Logger('ConfigModule');
        logger.error(e);
    }
    return envConfig;
};
//# sourceMappingURL=configuration.js.map