"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDataResponse = exports.typeEnum = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
var typeEnum;
(function (typeEnum) {
    typeEnum["string"] = "string";
    typeEnum["number"] = "number";
    typeEnum["boolean"] = "boolean";
    typeEnum["object"] = "object";
    typeEnum["stringArr"] = "stringArr";
    typeEnum["numberArr"] = "numberArr";
    typeEnum["booleanArr"] = "booleanArr";
    typeEnum["objectArr"] = "objectArr";
})(typeEnum = exports.typeEnum || (exports.typeEnum = {}));
const ApiDataResponse = (type, model) => {
    const applyDecoratorArr = [];
    let data;
    switch (type) {
        case typeEnum.string:
        case typeEnum.number:
        case typeEnum.boolean:
            data = {
                type: type,
            };
            break;
        case typeEnum.stringArr:
        case typeEnum.numberArr:
        case typeEnum.booleanArr:
            data = {
                type: 'array',
                items: {
                    type: type.slice(0, -3),
                },
            };
            break;
        case typeEnum.object:
            if (!model)
                throw Error('返回值为typeEnum.object时请填写类型！');
            applyDecoratorArr.push((0, swagger_1.ApiExtraModels)(model));
            data = {
                $ref: (0, swagger_1.getSchemaPath)(model),
            };
            break;
        case typeEnum.objectArr:
            if (!model)
                throw Error('返回值为typeEnum.objectArr时请填写类型！');
            applyDecoratorArr.push((0, swagger_1.ApiExtraModels)(model));
            data = {
                type: 'array',
                items: { $ref: (0, swagger_1.getSchemaPath)(model) },
            };
        default:
            break;
    }
    applyDecoratorArr.push((0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                {
                    properties: {
                        data: data,
                    },
                },
            ],
        },
    }));
    return (0, common_1.applyDecorators)(...applyDecoratorArr);
};
exports.ApiDataResponse = ApiDataResponse;
//# sourceMappingURL=api-data-response.decorator.js.map