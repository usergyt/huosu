"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.LogOption = exports.BusinessTypeEnum = void 0;
const common_1 = require("@nestjs/common");
const decorator_contant_1 = require("../contants/decorator.contant");
var BusinessTypeEnum;
(function (BusinessTypeEnum) {
    BusinessTypeEnum["other"] = "1";
    BusinessTypeEnum["insert"] = "2";
    BusinessTypeEnum["update"] = "3";
    BusinessTypeEnum["delete"] = "4";
    BusinessTypeEnum["grant"] = "5";
    BusinessTypeEnum["export"] = "6";
    BusinessTypeEnum["import"] = "7";
    BusinessTypeEnum["force"] = "8";
    BusinessTypeEnum["clean"] = "9";
})(BusinessTypeEnum = exports.BusinessTypeEnum || (exports.BusinessTypeEnum = {}));
class LogOption {
    constructor() {
        this.businessType = BusinessTypeEnum.other;
        this.isSaveRequestData = true;
        this.isSaveResponseData = true;
    }
}
exports.LogOption = LogOption;
const Log = (logOption) => {
    const option = Object.assign(new LogOption(), logOption);
    return (0, common_1.SetMetadata)(decorator_contant_1.LOG_KEY_METADATA, option);
};
exports.Log = Log;
//# sourceMappingURL=log.decorator.js.map