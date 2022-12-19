"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('huosu')
        .setDescription('Api文档')
        .setTermsOfService('https://docs.nestjs.cn/8/introduction')
        .setLicense('MIT', 'https://www.baidu.com')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(`swagger-ui`, app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map