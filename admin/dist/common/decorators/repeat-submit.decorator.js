"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatSubmit = exports.RepeatSubmitOption = void 0;
const common_1 = require("@nestjs/common");
const decorator_contant_1 = require("../contants/decorator.contant");
class RepeatSubmitOption {
    constructor() {
        this.interval = 5;
        this.message = '请求过于频繁';
    }
}
exports.RepeatSubmitOption = RepeatSubmitOption;
const RepeatSubmit = (option) => {
    const repeatSubmitOption = Object.assign(new RepeatSubmitOption(), option);
    return (0, common_1.SetMetadata)(decorator_contant_1.REOEATSUBMIT_METADATA, repeatSubmitOption);
};
exports.RepeatSubmit = RepeatSubmit;
//# sourceMappingURL=repeat-submit.decorator.js.map