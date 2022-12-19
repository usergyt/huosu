"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const setup_swagger_1 = require("./setup-swagger");
const history = require("connect-history-api-fallback");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
    }));
    app.use(history({
        rewrites: [
            {
                from: /^\/swagger-ui\/.*$/,
                to: function (context) {
                    return context.parsedUrl.pathname;
                },
            },
        ],
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '../public'));
    if (process.env.uploadPath) {
        app.useStaticAssets(process.env.uploadPath, {
            prefix: '/upload',
        });
    }
    (0, setup_swagger_1.setupSwagger)(app);
    await app.listen(3000);
    console.log('http://127.0.0.1:3000/swagger-ui/');
}
bootstrap();
//# sourceMappingURL=main.js.map