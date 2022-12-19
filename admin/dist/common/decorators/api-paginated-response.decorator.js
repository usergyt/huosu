"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginatedResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const paginated_dto_1 = require("../dto/paginated.dto");
const ApiPaginatedResponse = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(paginated_dto_1.PaginatedDto), (0, swagger_1.ApiExtraModels)(model), (0, swagger_1.ApiOkResponse)({
        schema: {
            title: `PaginatedResponseOf${model.name}`,
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(paginated_dto_1.PaginatedDto) },
                {
                    properties: {
                        rows: {
                            type: 'array',
                            items: { $ref: (0, swagger_1.getSchemaPath)(model) },
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiPaginatedResponse = ApiPaginatedResponse;
//# sourceMappingURL=api-paginated-response.decorator.js.map